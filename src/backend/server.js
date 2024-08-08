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

const db = mysql.createConnection({
    host: process.env.DB_SERVER,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: false
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the Azure MySQL Database:' + err.stack);
        return;
    }
    console.log('Connected to Azure MySQL Database successfully.');
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post('/login', (req, res) => {
    const { email, password, userType } = req.body;
    const query = 'SELECT users.id, userType, fullName, companyName, adminName FROM users LEFT JOIN students ON users.id = students.user_id LEFT JOIN employers ON users.id = employers.user_id LEFT JOIN admins ON users.id = admins.user_id WHERE email = ? AND password = ? AND userType = ?';

    db.execute(query, [email, password, userType], (err, results) => {
        if (err) {
            console.error('Error fetching data: ' + err.stack);
            res.status(500).send('Error logging in.');
            return;
        }
        if (results.length > 0) {
            const { id, userType, fullName, companyName, adminName } = results[0];
            const name = fullName || companyName || adminName;
            res.json({ userId: id, userType, name });
        } else {
            res.status(401).send('Invalid credentials or user type.');
        }
    });
});

app.post('/signup', (req, res) => {
    const { email, password, userType, fullName, studentNumber } = req.body;

    // First, check if the email already exists in the database
    const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';

    db.execute(checkEmailQuery, [email], (err, results) => {
        if (err) {
            console.error('Error checking email:', err.stack);
            return res.status(500).json({ message: 'Error checking email.' });
        }

        if (results.length > 0) {
            // Email already exists
            return res.status(400).json({ message: 'This email is already registered. Please sign in.' });
        }

        // If the email does not exist, proceed with sign-up
        const insertUserQuery = 'INSERT INTO users (email, password, userType) VALUES (?, ?, ?)';

        db.execute(insertUserQuery, [email, password, userType], (err, results) => {
            if (err) {
                console.error('Error inserting user data:', err.stack);
                return res.status(500).json({ message: 'Error signing up.' });
            }

            const userId = results.insertId;

            if (userType === 'student') {
                const insertStudentQuery = 'INSERT INTO students (user_id, fullName, studentNumber) VALUES (?, ?, ?)';
                db.execute(insertStudentQuery, [userId, fullName, studentNumber], (err) => {
                    if (err) {
                        console.error('Error inserting student data:', err.stack);
                        return res.status(500).json({ message: 'Error signing up.' });
                    }
                    res.json({ userId, userType, fullName });
                });
            }

            if (userType === 'employer') {
                const insertEmployerQuery = 'INSERT INTO employers (user_id, companyName, companyAddress) VALUES (?, ?, ?)';
                db.execute(insertEmployerQuery, [userId, companyName, companyAddress], (err) => {
                    if (err) {
                        console.error('Error inserting employer data:', err.stack);
                        return res.status(500).json({ message: 'Error signing up.' });
                    }
                    res.json({ userId, userType, companyName });
                });
            }
        });
    });
});


// Route to post a new job
app.post('/post-job', (req, res) => {
    const { jobTitle, numPeople, jobLocation, streetAddress, companyDescription, competitionId, internalClosingDate, externalClosingDate, payLevel, employmentType, travelFrequency, jobCategory, companyName, contactInformation, userId } = req.body;

    const query = `
        INSERT INTO jobs (jobTitle, numPeople, jobLocation, streetAddress, companyDescription, competitionId, internalClosingDate, externalClosingDate, payLevel, employmentType, travelFrequency, jobCategory, companyName, contactInformation, user_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.execute(query, [jobTitle, numPeople, jobLocation, streetAddress, companyDescription, competitionId, internalClosingDate, externalClosingDate, payLevel, employmentType, travelFrequency, jobCategory, companyName, contactInformation, userId], (err, results) => {
        if (err) {
            console.error('Error inserting job data:', err.stack);
            return res.status(500).json({ message: 'Error posting job.' });
        }

        const jobId = results.insertId;
        const selectQuery = 'SELECT * FROM jobs WHERE id = ?';
        db.execute(selectQuery, [jobId], (err, jobResults) => {
            if (err) {
                console.error('Error fetching job data:', err.stack);
                return res.status(500).json({ message: 'Error fetching job data.' });
            }
            res.json({ message: 'Job posted successfully!', job: jobResults[0] });
        });
    });
});

// Route to update a job by ID
app.put('/jobs/:jobId', (req, res) => {
    const { jobId } = req.params;
    const { jobTitle, numPeople, jobLocation, streetAddress, companyDescription, competitionId, internalClosingDate, externalClosingDate, payLevel, employmentType, travelFrequency, jobCategory, companyName, contactInformation } = req.body;

    const query = `
        UPDATE jobs 
        SET jobTitle = ?, numPeople = ?, jobLocation = ?, streetAddress = ?, companyDescription = ?, competitionId = ?, internalClosingDate = ?, externalClosingDate = ?, payLevel = ?, employmentType = ?, travelFrequency = ?, jobCategory = ?, companyName = ?, contactInformation = ? 
        WHERE id = ?
    `;

    db.execute(query, [jobTitle, numPeople, jobLocation, streetAddress, companyDescription, competitionId, internalClosingDate, externalClosingDate, payLevel, employmentType, travelFrequency, jobCategory, companyName, contactInformation, jobId], (err) => {
        if (err) {
            console.error('Error updating job:', err.stack);
            return res.status(500).json({ message: 'Error updating job.' });
        }
        res.json({ message: 'Job updated successfully!' });
    });
});

// Route to get all jobs posted by a specific employer (by userId)
app.get('/jobs/employer/:userId', (req, res) => {
    const userId = req.params.userId;

    const query = 'SELECT * FROM jobs WHERE user_id = ?';
    db.execute(query, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching jobs:', err.stack);
            return res.status(500).json({ message: 'Error fetching jobs.' });
        }
        res.json(results);
    });
});

// Route to get all jobs
app.get('/jobs', (req, res) => {
    const query = 'SELECT * FROM jobs';
    db.execute(query, (err, results) => {
        if (err) {
            console.error('Error fetching jobs:', err.stack);
            return res.status(500).json({ message: 'Error fetching jobs.' });
        }
        res.json(results);
    });
});

// Route to get a specific job by ID
app.get('/jobs/:jobId', (req, res) => {
    const { jobId } = req.params;

    const query = 'SELECT * FROM jobs WHERE id = ?';
    db.execute(query, [jobId], (err, results) => {
        if (err) {
            console.error('Error fetching job data:', err.stack);
            return res.status(500).json({ message: 'Error fetching job data.' });
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ message: 'Job not found.' });
        }
    });
});

// Route to delete a specific job by ID
app.delete('/jobs/:jobId', (req, res) => {
    const { jobId } = req.params;

    const query = 'DELETE FROM jobs WHERE id = ?';

    db.execute(query, [jobId], (err) => {
        if (err) {
            console.error('Error deleting job:', err.stack);
            return res.status(500).json({ message: 'Error deleting job.' });
        }
        res.json({ message: 'Job deleted successfully!' });
    });
});


// Route to handle job applications
app.post('/apply-job/:jobId', upload.fields([{ name: 'resume' }, { name: 'coverLetter' }]), async (req, res) => {
    try {
        // Capture jobId from the URL parameters
        const { jobId } = req.params;

        // Extract and parse the form data
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

        // Insert application data into the database, including jobId
        const query = `
            INSERT INTO applications 
            (jobId, firstName, lastName, email, phoneNumber, address, position, desiredCompensation, resumePath, coverLetterPath) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.execute(query, [
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
        ], (err, results) => {
            if (err) {
                console.error('Error inserting application data:', err.stack);
                return res.status(500).json({ message: 'Error applying for job.' });
            }
            res.json({ message: 'Application submitted successfully!' });
        });
    } catch (error) {
        console.error('Error processing job application:', error);
        res.status(500).json({ message: 'Error applying for job.' });
    }
});

// Route to get all applications for a specific job
app.get('/applications/job/:jobId', async (req, res) => {
    const { jobId } = req.params;

    if (!jobId) {
        return res.status(400).json({ message: 'Job ID is required.' });
    }

    try {
        const query = 'SELECT * FROM applications WHERE jobId = ?';

        db.execute(query, [jobId], (err, results) => {
            if (err) {
                console.error('Error fetching applications:', err.stack);
                return res.status(500).json({ message: 'Internal server error while fetching applications.' });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: 'No applications found for this job.' });
            }

            res.json(results);
        });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Route to get details of a specific application
app.get('/applications/:applicationId', async (req, res) => {
    const { applicationId } = req.params;

    if (!applicationId) {
        return res.status(400).json({ message: 'Application ID is required.' });
    }

    try {
        const query = 'SELECT * FROM applications WHERE id = ?';

        db.execute(query, [applicationId], (err, results) => {
            if (err) {
                console.error('Error fetching application details:', err.stack);
                return res.status(500).json({ message: 'Internal server error while fetching application details.' });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: 'Application not found.' });
            }

            res.json(results[0]);
        });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});



// Route to fetch all employers
app.get('/employers', (req, res) => {
    const query = `
        SELECT employers.*, users.email 
        FROM employers 
        JOIN users ON employers.user_id = users.id
    `;

    db.execute(query, (err, results) => {
        if (err) {
            console.error('Error fetching employers:', err.stack);
            return res.status(500).json({ message: 'Error fetching employers.' });
        }
        res.json(results);
    });
});

// Route to fetch employer details including email from users table
app.get('/employers/:employerId', (req, res) => {
    const { employerId } = req.params;
    const query = `
        SELECT employers.*, users.email 
        FROM employers 
        JOIN users ON employers.user_id = users.id 
        WHERE employers.user_id = ?
    `;

    db.execute(query, [employerId], (err, results) => {
        if (err) {
            console.error('Error fetching employer details:', err.stack);
            return res.status(500).json({ message: 'Error fetching employer details.' });
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ message: 'Employer not found.' });
        }
    });
});

// Route to fetch jobs posted by a specific employer
app.get('/employers/:employerId/jobs', (req, res) => {
    const { employerId } = req.params;
    const query = 'SELECT * FROM jobs WHERE user_id = ?';

    db.execute(query, [employerId], (err, results) => {
        if (err) {
            console.error('Error fetching jobs:', err.stack);
            return res.status(500).json({ message: 'Error fetching jobs.' });
        }
        res.json(results);
    });
});

app.get('/profile/:userId', (req, res) => {
    const { userId } = req.params;
    const query = 'SELECT users.id, users.userType, students.fullName, employers.companyName, admins.adminName FROM users LEFT JOIN students ON users.id = students.user_id LEFT JOIN employers ON users.id = employers.user_id LEFT JOIN admins ON users.id = admins.user_id WHERE users.id = ?';

    db.execute(query, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching profile data: ' + err.stack);
            res.status(500).send('Error fetching profile data.');
            return;
        }
        if (results.length > 0) {
            const { id, userType, fullName, companyName, adminName } = results[0];
            const name = fullName || companyName || adminName;
            res.json({ userId: id, userType, name });
        } else {
            res.status(404).send('User not found.');
        }
    });
});

// Fetch user statistics
app.get('/admin/user-stats', (req, res) => {
    const query = `
        SELECT 
            SUM(CASE WHEN userType = 'student' THEN 1 ELSE 0 END) as students,
            SUM(CASE WHEN userType = 'employer' THEN 1 ELSE 0 END) as employers,
            SUM(CASE WHEN userType = 'admin' THEN 1 ELSE 0 END) as admins
        FROM users
    `;

    db.execute(query, (err, results) => {
        if (err) {
            console.error('Error fetching user stats:', err.stack);
            return res.status(500).json({ message: 'Error fetching user stats.' });
        }
        res.json(results[0]);
    });
});

// Fetch active courses count
app.get('/admin/active-courses', (req, res) => {
    const query = 'SELECT COUNT(*) as activeCourses FROM courses WHERE isActive = 1';

    db.execute(query, (err, results) => {
        if (err) {
            console.error('Error fetching active courses:', err.stack);
            return res.status(500).json({ message: 'Error fetching active courses.' });
        }
        res.json(results[0]);
    });
});

// Fetch recent activities
app.get('/admin/recent-activities', (req, res) => {
    const query = `
        SELECT 
            activityType as description, 
            users.email as userEmail, 
            activityTimestamp as timestamp 
        FROM activities 
        JOIN users ON activities.userId = users.id 
        ORDER BY activityTimestamp DESC 
        LIMIT 10
    `;

    db.execute(query, (err, results) => {
        if (err) {
            console.error('Error fetching recent activities:', err.stack);
            return res.status(500).json({ message: 'Error fetching recent activities.' });
        }
        res.json({ activities: results });
    });
});

// Route to fetch all users
app.get('/users', (req, res) => {
    const query = `
        SELECT 
            users.id, users.email, users.userType, 
            students.fullName, students.studentNumber,
            employers.companyName,
            admins.adminName
        FROM users
        LEFT JOIN students ON users.id = students.user_id
        LEFT JOIN employers ON users.id = employers.user_id
        LEFT JOIN admins ON users.id = admins.user_id
    `;

    db.execute(query, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err.stack);
            return res.status(500).json({ message: 'Error fetching users.' });
        }
        res.json(results);
    });
});

// Route for fetching user profile
app.get('/profile/:userId', (req, res) => {
    const { userId } = req.params;
    const query = `
        SELECT users.id, users.userType, students.fullName, employers.companyName, admins.adminName 
        FROM users 
        LEFT JOIN students ON users.id = students.user_id 
        LEFT JOIN employers ON users.id = employers.user_id 
        LEFT JOIN admins ON users.id = admins.user_id 
        WHERE users.id = ?
    `;

    db.execute(query, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching profile data: ' + err.stack);
            res.status(500).send('Error fetching profile data.');
            return;
        }
        if (results.length > 0) {
            const { id, userType, fullName, companyName, adminName } = results[0];
            const name = fullName || companyName || adminName;
            res.json({ userId: id, userType, name });
        } else {
            res.status(404).send('User not found.');
        }
    });
});

// Handling resume upload
app.put('/profile/:userId', upload.fields([{ name: 'profilePicture' }, { name: 'resume' }]), async (req, res) => {
    const { userId } = req.params;
    const { address, phone } = req.body;
    let profilePictureUrl = null;
    let resumeUrl = null;

    console.log('Received data:', { userId, address, phone }); // Debugging line

    // Upload profile picture to Azure if provided
    if (req.files['profilePicture']) {
        try {
            const file = req.files['profilePicture'][0];
            profilePictureUrl = await uploadFileToAzure(file.buffer, file.originalname);
            console.log('Profile picture uploaded to:', profilePictureUrl);
        } catch (error) {
            console.error('Error uploading profile picture:', error);
            return res.status(500).send('Error uploading profile picture.');
        }
    }

    // Upload resume to Azure if provided
    if (req.files['resume']) {
        try {
            const file = req.files['resume'][0];
            resumeUrl = await uploadFileToAzure(file.buffer, file.originalname);
            console.log('Resume uploaded to:', resumeUrl);
        } catch (error) {
            console.error('Error uploading resume:', error);
            return res.status(500).send('Error uploading resume.');
        }
    }

    const query = `
        UPDATE users 
        SET address = ?, phone = ?, profilePicture = ?, resume = ? 
        WHERE id = ?
    `;

    db.execute(query, [address, phone, profilePictureUrl, resumeUrl, userId], (err) => {
        if (err) {
            console.error('Error updating profile:', err.stack);
            return res.status(500).send('Error updating profile.');
        }
        res.json({ message: 'Profile updated successfully!' });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
