# ScholarSpace Project

ScholarSpace is a full-stack web application designed for university students, employers, and administrators to interact on a platform that supports job postings, course enrollments, and more. This project utilizes React for the front end, Express.js for the back end, and a MySQL database hosted on Azure.

## Table of Contents

- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Database Setup](#database-setup)
- [Connecting to Azure MySQL Database](#connecting-to-azure-mysql-database)
- [User Accounts](#user-accounts)
- [Technologies Used](#technologies-used)
- [License](#license)
- [Learn More](#learn-more)

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Prerequisites

- Node.js and npm installed on your machine.
- MySQL Workbench installed to interact with the database.
- An Azure account to manage the MySQL database.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SamsanTec/scholarspace0.git
   cd scholarspace0

2. Install the required dependencies:
   ```bash
   npm install

3. Create a .env file in the root      directory and add the following environment variables:
   ```bash
   DB_HOST=your_azure_mysql_host
   DB_USER=your_azure_mysql_user
   DB_PASSWORD=your_azure_mysql_password
   DB_NAME=your_database_name

4. Start the development server:
   ```bash
   npm run server
   npm start

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.  
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.  
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.  
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can eject at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc.) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point, you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However, we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Database Setup

The ScholarSpace project uses a MySQL database hosted on Azure. Ensure that your database is correctly set up by following the instructions below.

## Connecting to Azure MySQL Database

To connect to the MySQL database hosted on Azure using MySQL Workbench, follow these steps:

1. **Open MySQL Workbench**.

2. **Create a New Connection**:
   - Click on the `+` icon next to `MySQL Connections` to create a new connection.

3. **Connection Details**:
   - **Connection Name**: Name your connection (e.g., ScholarSpaceDB).
   - **Hostname**: Enter the Azure MySQL host name (which is, `scholarspace.mysql.database.azure.com`).
   - **Port**: The default MySQL port is `3306`.
   - **Username**: Enter your MySQL username (`akash`).
   - **Password**: Enter your MySQL password. (`Bhangu_2232`).

4. **Test the Connection**:
   - Click `Test Connection` to verify that the connection is successful.

5. **Connect**:
   - Once the connection is successful, click `OK` to save the connection and then double-click on it to connect.

## User Accounts

The following user accounts are available for testing:

- **Student User**:
  - **Email**: bhanguakash36@gmail.com
  - **Password**: Password123

- **Employer User**:
  - **Email**: bhanguakash27@gmail.com
  - **Password**: Password123

- **Admin User**:
  - **Email**: pujanpreet@gmail.com
  - **Password**: password123

## Technologies Used

- **Frontend**: React.js, CSS
- **Backend**: Express.js, Node.js
- **Database**: MySQL hosted on Azure
- **Other Tools**: Axios,  MySQL Workbench

## License

This project is licensed under the MIT License.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
