require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const { v1: uuidv1 } = require('uuid');
const { uploadFileToAzure } = require('./azureStorage');
const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.DB_SERVER,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10, // Adjust the pool size based on your needs
    queueLimit: 0,
    ssl: false
});

// Test the connection pool
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the Azure MySQL Database:', err.stack);
        return;
    }
    console.log('Connected to Azure MySQL Database successfully using connection pool.');
    connection.release(); // Release the connection back to the pool
});

const storage = multer.memoryStorage();
const upload = multer({ storage });


app.post('/signup', upload.single('profilePicture'), async (req, res) => {
    const { email, password, userType, fullName, companyName, address, phone } = req.body;
    const profilePicture = req.file; // Get the uploaded file from multer

    let connection;

    try {
        // Get a connection from the pool
        connection = await pool.promise().getConnection();

        // Check if the email already exists in the database
        const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
        const [existingUser] = await connection.execute(checkEmailQuery, [email]);

        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'This email is already registered. Please sign in.' });
        }

        let profilePictureUrl = null;

        if (profilePicture) {
            // Upload the profile picture to Azure Blob Storage
            profilePictureUrl = await uploadFileToAzure(profilePicture.buffer, profilePicture.originalname);
        }

        // Insert user data into the users table with plain text password
        const insertUserQuery = `
            INSERT INTO users (email, password, userType, address, phone, profilePicture) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [userResult] = await connection.execute(insertUserQuery, [email, password, userType, address, phone, profilePictureUrl]);
        const userId = userResult.insertId;

        let responseData = { userId, userType, profilePictureUrl };

        if (userType === 'student') {
            const insertStudentQuery = 'INSERT INTO students (user_id, fullName) VALUES (?, ?)';
            await connection.execute(insertStudentQuery, [userId, fullName]);
            responseData.fullName = fullName;
        } else if (userType === 'employer') {
            const insertEmployerQuery = 'INSERT INTO employers (user_id, companyName) VALUES (?, ?)';
            await connection.execute(insertEmployerQuery, [userId, companyName]);
            responseData.companyName = companyName;
        } else if (userType === 'admin') {
            const insertAdminQuery = 'INSERT INTO admins (user_id, adminName) VALUES (?, ?)';
            await connection.execute(insertAdminQuery, [userId, fullName]);
            responseData.adminName = fullName;
        } else {
            return res.status(400).json({ message: 'Invalid user type.' });
        }

        res.json(responseData);
    } catch (error) {
        console.error('Error during signup:', error.stack);
        res.status(500).json({ message: 'Error during signup.' });
    } finally {
        // Release the connection back to the pool
        if (connection) connection.release();
    }
});

// Login Route
app.post('/login', async (req, res) => {
    const { email, password, userType } = req.body;

    let connection;

    try {
        // Get a connection from the pool
        connection = await pool.promise().getConnection();

        // Query to get user data based on email, password, and userType
        const query = `
            SELECT users.id, users.userType, students.fullName, employers.companyName, admins.adminName 
            FROM users 
            LEFT JOIN students ON users.id = students.user_id 
            LEFT JOIN employers ON users.id = employers.user_id 
            LEFT JOIN admins ON users.id = admins.user_id 
            WHERE email = ? AND password = ? AND userType = ?
        `;

        const [results] = await connection.execute(query, [email, password, userType]);

        if (results.length > 0) {
            const { id, userType, fullName, companyName, adminName } = results[0];
            const name = fullName || companyName || adminName;
            res.json({ userId: id, userType, name });
        } else {
            res.status(401).send('Invalid credentials or user type.');
        }
    } catch (error) {
        console.error('Error logging in:', error.stack);
        res.status(500).json({ message: 'Error logging in.' });
    } finally {
        // Release the connection back to the pool
        if (connection) connection.release();
    }
});


// Fetch user profile by ID
app.get('/profile/:userId', async (req, res) => {
    const userId = req.params.userId;
    let connection;

    try {
        // Get a connection from the pool
        connection = await pool.promise().getConnection();

        const query = `
            SELECT u.id as userId, u.email, u.userType, u.address, u.phone, u.profilePicture, 
                COALESCE(s.fullName, e.companyName, a.adminName) as name
            FROM users u
            LEFT JOIN students s ON u.id = s.user_id
            LEFT JOIN employers e ON u.id = e.user_id
            LEFT JOIN admins a ON u.id = a.user_id
            WHERE u.id = ?
        `;

        const [results] = await connection.execute(query, [userId]);

        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.json(results[0]);
    } catch (err) {
        console.error('Error fetching profile data:', err.stack);
        res.status(500).json({ message: 'Error fetching profile data.' });
    } finally {
        // Release the connection back to the pool
        if (connection) connection.release();
    }
});

// Update user profile
app.put('/profile/:userId', async (req, res) => {
    const userId = req.params.userId;
    const { name, address, phone, userType } = req.body;
    let connection;

    try {
        // Get a connection from the pool
        connection = await pool.promise().getConnection();

        // Update the users table
        const updateUserQuery = `
            UPDATE users SET address = ?, phone = ?
            WHERE id = ?
        `;
        const userValues = [address, phone, userId];
        await connection.execute(updateUserQuery, userValues);

        // Update the relevant profile table based on user type
        let updateProfileQuery;
        let profileValues;

        if (userType === 'student') {
            updateProfileQuery = `
                UPDATE students SET fullName = ?
                WHERE user_id = ?
            `;
            profileValues = [name, userId];
        } else if (userType === 'employer') {
            updateProfileQuery = `
                UPDATE employers SET companyName = ?
                WHERE user_id = ?
            `;
            profileValues = [name, userId];
        } else if (userType === 'admin') {
            updateProfileQuery = `
                UPDATE admins SET adminName = ?
                WHERE user_id = ?
            `;
            profileValues = [name, userId];
        }

        await connection.execute(updateProfileQuery, profileValues);

        res.json({
            message: 'Profile updated successfully',
        });
    } catch (error) {
        console.error('Error updating profile data:', error.stack);
        res.status(500).json({ message: 'Error updating profile data.' });
    } finally {
        // Release the connection back to the pool
        if (connection) connection.release();
    }
});

app.post('/post-job', async (req, res) => {
    const { 
        jobTitle, 
        numPeople, 
        jobLocation, 
        streetAddress, 
        jobDescription, 
        competitionId = null, // Optional
        internalClosingDate = null, // Optional
        externalClosingDate = null, // Optional
        payLevel, 
        employmentType, 
        travelFrequency, 
        jobCategory, 
        companyName, 
        contactInformation, 
        userId 
    } = req.body;

    // Validate the required fields
    if (!jobTitle || !numPeople || !jobLocation || !streetAddress || !jobDescription || 
        !payLevel || !employmentType || !travelFrequency || !jobCategory || 
        !companyName || !contactInformation || !userId) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    let connection;

    try {
        // Get a connection from the pool
        connection = await pool.promise().getConnection();

        const insertQuery = `
            INSERT INTO jobs (
                jobTitle, 
                numPeople, 
                jobLocation, 
                streetAddress, 
                jobDescription, 
                competitionId, 
                internalClosingDate, 
                externalClosingDate, 
                payLevel, 
                employmentType, 
                travelFrequency, 
                jobCategory, 
                companyName, 
                contactInformation, 
                user_id
            ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        // Insert the job into the database
        const [results] = await connection.execute(insertQuery, [
            jobTitle, 
            numPeople, 
            jobLocation, 
            streetAddress, 
            jobDescription, 
            competitionId, 
            internalClosingDate, 
            externalClosingDate, 
            payLevel, 
            employmentType, 
            travelFrequency, 
            jobCategory, 
            companyName, 
            contactInformation, 
            userId
        ]);

        const jobId = results.insertId;

        // Fetch the newly inserted job
        const selectQuery = 'SELECT * FROM jobs WHERE id = ?';
        const [jobResults] = await connection.execute(selectQuery, [jobId]);

        res.json({ message: 'Job posted successfully!', job: jobResults[0] });

    } catch (err) {
        console.error('Error posting job:', err);
        res.status(500).json({ message: 'Error posting job.', error: err.message });
    } finally {
        // Release the connection back to the pool
        if (connection) connection.release();
    }
});



app.delete('/jobs/:jobId', async (req, res) => {
    const { jobId } = req.params;
    let connection;

    try {
        // Get a connection from the pool
        connection = await pool.promise().getConnection();

        const query = 'DELETE FROM jobs WHERE id = ?';

        // Execute the delete query
        await connection.execute(query, [jobId]);

        res.json({ message: 'Job deleted successfully!' });
    } catch (err) {
        console.error('Error deleting job:', err.stack);
        res.status(500).json({ message: 'Error deleting job.', error: err.message });
    } finally {
        // Release the connection back to the pool
        if (connection) connection.release();
    }
});

app.get('/jobs/employer/:userId', async (req, res) => {
    const userId = req.params.userId;
    let connection;

    try {
        // Get a connection from the pool
        connection = await pool.promise().getConnection();

        const query = 'SELECT * FROM jobs WHERE user_id = ?';

        // Execute the select query
        const [results] = await connection.execute(query, [userId]);

        res.json(results);
    } catch (err) {
        console.error('Error fetching jobs:', err.stack);
        res.status(500).json({ message: 'Error fetching jobs.', error: err.message });
    } finally {
        // Release the connection back to the pool
        if (connection) connection.release();
    }
});

app.get('/jobs', async (req, res) => {
    let connection;

    try {
        // Get a connection from the pool
        connection = await pool.promise().getConnection();

        const query = 'SELECT * FROM jobs';

        // Execute the select query
        const [results] = await connection.execute(query);

        res.json(results);
    } catch (err) {
        console.error('Error fetching jobs:', err.stack);
        res.status(500).json({ message: 'Error fetching jobs.', error: err.message });
    } finally {
        // Release the connection back to the pool
        if (connection) connection.release();
    }
});

app.get('/jobs/:jobId', async (req, res) => {
    const { jobId } = req.params;
    let connection;

    try {
        // Get a connection from the pool
        connection = await pool.promise().getConnection();

        const query = 'SELECT * FROM jobs WHERE id = ?';

        // Execute the select query
        const [results] = await connection.execute(query, [jobId]);

        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ message: 'Job not found.' });
        }
    } catch (err) {
        console.error('Error fetching job data:', err.stack);
        res.status(500).json({ message: 'Error fetching job data.', error: err.message });
    } finally {
        // Release the connection back to the pool
        if (connection) connection.release();
    }
});


app.post('/apply-job/:jobId', upload.fields([{ name: 'resume' }, { name: 'coverLetter' }]), async (req, res) => {
    const { jobId } = req.params;
    let connection;

    try {
        // Capture and parse form data
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            address,
            position,
            desiredCompensation
        } = JSON.parse(req.body.formData);

        // Validate inputs
        if (!firstName || !lastName || !email || !phoneNumber || !address || !position || !desiredCompensation) {
            return res.status(400).json({ message: 'Missing required fields.' });
        }

        const resume = req.files['resume'] ? req.files['resume'][0] : null;
        const coverLetter = req.files['coverLetter'] ? req.files['coverLetter'][0] : null;

        // Upload the resume to Azure Blob Storage
        const resumePath = resume ? await uploadFileToAzure(resume.buffer, resume.originalname) : null;

        // Upload the cover letter to Azure Blob Storage, if provided
        const coverLetterPath = coverLetter ? await uploadFileToAzure(coverLetter.buffer, coverLetter.originalname) : null;

        // Get a connection from the pool
        connection = await pool.promise().getConnection();

        // Insert application data into the database
        const query = `
            INSERT INTO applications 
            (jobId, firstName, lastName, email, phoneNumber, address, position, desiredCompensation, resumePath, coverLetterPath) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        await connection.execute(query, [
            jobId,
            firstName,
            lastName,
            email,
            phoneNumber,
            address,
            position,
            desiredCompensation,
            resumePath,
            coverLetterPath
        ]);

        res.json({ message: 'Application submitted successfully!' });
    } catch (error) {
        console.error('Error processing job application:', error);
        res.status(500).json({ message: 'Error applying for job.', error: error.message });
    } finally {
        // Release the connection back to the pool
        if (connection) connection.release();
    }
});


app.get('/applications/job/:jobId', async (req, res) => {
    const { jobId } = req.params;
    const { userId } = req.query; // Get userId from query parameters

    if (!jobId || !userId) {
        return res.status(400).json({ message: 'Job ID and User ID are required.' });
    }

    let connection;
    try {
        // Get a connection from the pool
        connection = await pool.promise().getConnection();

        // Query to ensure that the applications are fetched only for jobs posted by the user
        const query = `
            SELECT a.* FROM applications a
            JOIN jobs j ON a.jobId = j.id
            WHERE a.jobId = ? AND j.user_id = ?
        `;

        const [results] = await connection.execute(query, [jobId, userId]);

        if (results.length === 0) {
            return res.status(404).json({ message: 'No applications found for this job.' });
        }

        res.json(results);
    } catch (error) {
        console.error('Error fetching applications:', error.stack);
        res.status(500).json({ message: 'Internal server error while fetching applications.' });
    } finally {
        // Release the connection back to the pool
        if (connection) connection.release();
    }
});

app.get('/applications/:applicationId', async (req, res) => {
    const { applicationId } = req.params;
    const { userId } = req.query; // Optional: Get userId from query parameters for security

    if (!applicationId) {
        return res.status(400).json({ message: 'Application ID is required.' });
    }

    let connection;
    try {
        // Get a connection from the pool
        connection = await pool.promise().getConnection();

        const query = `
            SELECT a.* FROM applications a
            JOIN jobs j ON a.jobId = j.id
            WHERE a.id = ? ${userId ? 'AND j.user_id = ?' : ''}
        `;

        const params = userId ? [applicationId, userId] : [applicationId];
        const [results] = await connection.execute(query, params);

        if (results.length === 0) {
            return res.status(404).json({ message: 'Application not found.' });
        }

        res.json(results[0]);
    } catch (error) {
        console.error('Error fetching application details:', error.stack);
        res.status(500).json({ message: 'Internal server error while fetching application details.' });
    } finally {
        // Release the connection back to the pool
        if (connection) connection.release();
    }
});

app.patch('/applications/:applicationId/status', async (req, res) => {
    const { applicationId } = req.params;
    const { status } = req.body;

    // Ensure the status is one of the allowed values
    if (!['Pending', 'Accepted', 'Rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status value.' });
    }

    let connection;
    try {
        // Get a connection from the pool
        connection = await pool.promise().getConnection();

        const query = 'UPDATE applications SET status = ? WHERE id = ?';
        const [result] = await connection.execute(query, [status, applicationId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Application not found.' });
        }

        res.json({ message: 'Application status updated successfully!' });
    } catch (error) {
        console.error('Error updating application status:', error.stack);
        res.status(500).json({ message: 'Error updating application status.' });
    } finally {
        // Release the connection back to the pool
        if (connection) connection.release();
    }
});

app.post('/admin/courses', async (req, res) => {
    const { title, description, category, external_url } = req.body;

    // Validate the required fields
    if (!title || !description || !category) {
        return res.status(400).json({ message: 'Title, description, and category are required.' });
    }

    let connection;
    try {
        // Get a connection from the pool
        connection = await pool.promise().getConnection();

        const query = 'INSERT INTO courses (title, description, category, external_url) VALUES (?, ?, ?, ?)';
        const values = [title, description, category, external_url || null]; // Handle optional external_url

        const [results] = await connection.execute(query, values);

        res.status(201).json({ message: 'Course added successfully!', courseId: results.insertId });
    } catch (error) {
        console.error('Error inserting course:', error.stack);
        res.status(500).json({ message: 'Error adding course.' });
    } finally {
        // Release the connection back to the pool
        if (connection) connection.release();
    }
});

app.get('/courses', async (req, res) => {
    let connection;
    try {
        // Get a connection from the pool
        connection = await pool.promise().getConnection();

        const query = 'SELECT * FROM courses';
        const [results] = await connection.execute(query);

        res.json(results);
    } catch (error) {
        console.error('Error fetching courses:', error.stack);
        res.status(500).json({ message: 'Error fetching courses.' });
    } finally {
        // Release the connection back to the pool
        if (connection) connection.release();
    }
});

app.delete('/courses/:courseId', async (req, res) => {
    const { courseId } = req.params;

    let connection;
    try {
        // Get a connection from the pool
        connection = await pool.promise().getConnection();

        const query = 'DELETE FROM courses WHERE id = ?';
        const [result] = await connection.execute(query, [courseId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Course not found.' });
        }
        res.json({ message: 'Course deleted successfully!' });
    } catch (error) {
        console.error('Error deleting course:', error.stack);
        res.status(500).json({ message: 'Error deleting course.' });
    } finally {
        // Release the connection back to the pool
        if (connection) connection.release();
    }
});

app.get('/admin/user-stats', async (req, res) => {
    let connection;
    try {
        // Get a connection from the pool
        connection = await pool.promise().getConnection();

        const query = `
            SELECT 
                SUM(CASE WHEN userType = 'student' THEN 1 ELSE 0 END) as students,
                SUM(CASE WHEN userType = 'employer' THEN 1 ELSE 0 END) as employers,
                SUM(CASE WHEN userType = 'admin' THEN 1 ELSE 0 END) as admins
            FROM users
        `;

        const [results] = await connection.execute(query);

        res.json(results[0]);
    } catch (error) {
        console.error('Error fetching user stats:', error.stack);
        res.status(500).json({ message: 'Error fetching user stats.' });
    } finally {
        // Release the connection back to the pool
        if (connection) connection.release();
    }
});



app.get('/users', async (req, res) => {
    let connection;
    try {
        // Get a connection from the pool
        connection = await pool.promise().getConnection();

        const query = `
            SELECT 
                users.id, 
                users.email, 
                users.userType, 
                students.fullName, 
                employers.companyName, 
                admins.adminName 
            FROM users 
            LEFT JOIN students ON users.id = students.user_id 
            LEFT JOIN employers ON users.id = employers.user_id 
            LEFT JOIN admins ON users.id = admins.user_id
        `;

        const [results] = await connection.execute(query);
        res.json(results);
    } catch (err) {
        console.error('Error fetching users:', err.stack);
        res.status(500).json({ message: 'Error fetching users.' });
    } finally {
        // Release the connection back to the pool
        if (connection) connection.release();
    }
});

app.delete('/users/:userId', async (req, res) => {
    const { userId } = req.params;

    let connection;
    try {
        // Get a connection from the pool
        connection = await pool.promise().getConnection();

        // Check the user's type before deleting
        const getUserTypeQuery = 'SELECT userType FROM users WHERE id = ?';
        const [userTypeResults] = await connection.execute(getUserTypeQuery, [userId]);

        if (userTypeResults.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const userType = userTypeResults[0].userType;

        if (userType === 'Admin') {
            return res.status(403).json({ message: 'You cannot delete an admin.' });
        }

        // Handle related records before deleting the user
        let deleteRelatedQuery = '';

        if (userType === 'student') {
            deleteRelatedQuery = 'DELETE FROM students WHERE user_id = ?';
        } else if (userType === 'employer') {
            deleteRelatedQuery = 'DELETE FROM employers WHERE user_id = ?';
        }

        await connection.execute(deleteRelatedQuery, [userId]);

        // Then, delete the user
        const deleteUserQuery = 'DELETE FROM users WHERE id = ?';
        await connection.execute(deleteUserQuery, [userId]);

        res.json({ message: 'User deleted successfully.' });
    } catch (err) {
        console.error('Error deleting user:', err.stack);
        res.status(500).json({ message: 'Error deleting user.', error: err.message });
    } finally {
        // Release the connection back to the pool
        if (connection) connection.release();
    }
});

app.post('/admin/add-user', async (req, res) => {
    const { email, userType, fullName, companyName, address, phone } = req.body;

    // Set a general password for new users
    const defaultPassword = 'Password123'; // This should be changed or generated securely

    let connection;
    try {
        // Get a connection from the pool
        connection = await pool.promise().getConnection();

        // Check if the email already exists in the database
        const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
        const [existingUser] = await connection.execute(checkEmailQuery, [email]);

        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'This email is already registered.' });
        }

        // Insert the new user into the users table
        const insertUserQuery = 'INSERT INTO users (email, password, userType, address, phone) VALUES (?, ?, ?, ?, ?)';
        const [userResult] = await connection.execute(insertUserQuery, [email, defaultPassword, userType, address, phone]);

        const userId = userResult.insertId;

        // Insert into the specific table based on userType
        if (userType === 'student') {
            const insertStudentQuery = 'INSERT INTO students (user_id, fullName) VALUES (?, ?)';
            await connection.execute(insertStudentQuery, [userId, fullName]);
        } else if (userType === 'employer') {
            const insertEmployerQuery = 'INSERT INTO employers (user_id, companyName) VALUES (?, ?)';
            await connection.execute(insertEmployerQuery, [userId, companyName]);
        }

        res.status(201).json({ message: 'User added successfully', userId });
    } catch (err) {
        console.error('Error adding user:', err.stack);
        res.status(500).json({ message: 'Error adding user.' });
    } finally {
        // Release the connection back to the pool
        if (connection) connection.release();
    }
});

app.get('/admin/recent-activities', async (req, res) => {
    let connection;
    try {
        // Get a connection from the pool
        connection = await pool.promise().getConnection();

        const query = `
            SELECT 
                activity_type, 
                email, 
                CONVERT_TZ(timestamp, '+00:00', '-07:00') AS timestamp 
            FROM user_activities
            JOIN users ON user_activities.user_id = users.id
            ORDER BY timestamp DESC 
            LIMIT 10
        `;

        const [results] = await connection.execute(query);
        res.json(results);
    } catch (err) {
        console.error('Error fetching recent activities:', err.stack);
        res.status(500).json({ message: 'Error fetching recent activities.' });
    } finally {
        // Release the connection back to the pool
        if (connection) connection.release();
    }
});

app.get('/admin/total-courses', async (req, res) => {
    let connection;
    try {
        // Get a connection from the pool
        connection = await pool.promise().getConnection();

        const query = 'SELECT COUNT(*) as totalCourses FROM courses';
        const [results] = await connection.execute(query);

        res.json(results[0]);
    } catch (err) {
        console.error('Error fetching total courses:', err.stack);
        res.status(500).json({ message: 'Error fetching total courses.' });
    } finally {
        // Release the connection back to the pool
        if (connection) connection.release();
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

