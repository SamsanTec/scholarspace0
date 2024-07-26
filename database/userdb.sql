CREATE DATABASE  IF NOT EXISTS `userdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `userdb`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: userdb
-- ------------------------------------------------------
-- Server version	9.0.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `adminName` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `admins_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,15,'Pujanpreet Kaur'),(2,15,'Pujanpreet Kaur');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employers`
--

DROP TABLE IF EXISTS `employers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `companyName` varchar(255) NOT NULL,
  `companyAddress` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `employers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employers`
--

LOCK TABLES `employers` WRITE;
/*!40000 ALTER TABLE `employers` DISABLE KEYS */;
INSERT INTO `employers` VALUES (1,6,'A Bread Affair','Langley Bypass 20560 unit 310'),(2,7,'nine nine',''),(3,8,'INFO2413','9/495 Raymond street sale Victoria 3850'),(4,9,'Brooklyn','9999'),(5,11,'INFO1111','7499 144 Street'),(6,14,'r4t4gdfg','gdg'),(7,16,'Kwantlen Polytechnic University ','9/495 Raymond street sale Victoria 3850'),(8,17,'nk','k k'),(9,21,'nkk ','9/495 Raymond street sale Victoria 3850'),(10,24,'INFO2413','7499 144 Street'),(11,25,'INFO2413','7499 144 Street'),(12,26,'INFO2413','7499 144 Street'),(13,36,'lmcec ec','9/495 Raymond street sale Victoria 3850'),(14,38,'INFO2413','9/495 Raymond street sale Victoria 3850');
/*!40000 ALTER TABLE `employers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `jobTitle` varchar(255) NOT NULL,
  `numPeople` int NOT NULL,
  `jobLocation` enum('inPerson','remote','hybrid') NOT NULL,
  `streetAddress` varchar(255) NOT NULL,
  `companyDescription` text,
  `user_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `competitionId` int DEFAULT NULL,
  `internalClosingDate` varchar(255) DEFAULT NULL,
  `externalClosingDate` varchar(255) DEFAULT NULL,
  `payLevel` varchar(255) DEFAULT NULL,
  `employmentType` varchar(255) DEFAULT NULL,
  `travelFrequency` varchar(255) DEFAULT NULL,
  `employeeGroup` varchar(255) DEFAULT NULL,
  `companyName` varchar(255) DEFAULT NULL,
  `contactInformation` text,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `jobs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES (12,'IT HelpDesk',1,'inPerson','Kwantlen Polytechnic University','IT Helpdesk Technician Job Description\nPosition: IT Helpdesk Technician\nLocation: Surrey 72nd avenue\nDepartment: Information Technology\nReports to: IT Manager\nEmployment Type: Full-Time/Part-Time\nSalary: Competitive/Commensurate with experience\n\nJob Overview\nWe are seeking a highly skilled and motivated IT Helpdesk Technician to join our dynamic IT team. The ideal candidate will provide technical support and assistance to end-users, ensuring the smooth operation of our IT systems. This role requires excellent problem-solving skills, technical knowledge, and the ability to communicate effectively with users of varying technical proficiency.\n\nKey Responsibilities\nProvide Technical Support: Respond to and resolve user inquiries and issues related to hardware, software, network, and other IT systems.\nDiagnose and Troubleshoot Problems: Identify, diagnose, and resolve technical issues promptly. Escalate complex problems to senior IT staff or specialized support teams as needed.\nInstall and Configure Software: Install, configure, and update software applications and operating systems on user devices.\nManage User Accounts: Create, modify, and manage user accounts and permissions within various systems.\nMaintain IT Equipment: Ensure the proper functioning of IT equipment such as computers, printers, and peripheral devices. Perform regular maintenance and updates.\nDocument Solutions: Document and track issues, solutions, and work performed using the helpdesk ticketing system. Create and update technical documentation and user guides.\nProvide Training: Assist in training users on basic IT skills, software applications, and best practices for IT security.\nMonitor Systems: Monitor IT systems and networks to identify potential issues and ensure optimal performance.\nCollaborate with IT Team: Work closely with other IT staff to implement and support IT projects and initiatives.\nRequired Skills and Qualifications\nEducation: Bachelor\'s degree in Information Technology, Computer Science, or a related field, or equivalent work experience.\nExperience: Previous experience in an IT helpdesk or technical support role.\nTechnical Skills: Proficiency with operating systems (Windows, macOS, Linux), common software applications, networking fundamentals, and hardware troubleshooting.\nCommunication Skills: Excellent verbal and written communication skills. Ability to explain technical concepts to non-technical users.\nProblem-Solving Skills: Strong analytical and problem-solving abilities. Ability to work under pressure and handle multiple tasks simultaneously.\nCustomer Service: A customer-focused attitude with a commitment to providing high-quality service and support.\nCertifications: Relevant certifications (e.g., CompTIA A+, Network+, Microsoft Certified Professional) are a plus.\nAdditional Information\nWorking Conditions: This position may require occasional evening or weekend work to address urgent issues or perform system maintenance.\nPhysical Requirements: Ability to lift and carry IT equipment, and work in various physical environments, including server rooms.\n\nHow to Apply\nInterested candidates should submit their resume and cover letter outlining their qualifications and experience to pujanpreet@gmail.com.\n\nKPU is an equal opportunity employer. We celebrate diversity and are committed to creating an inclusive environment for all employees.',15,'2024-07-25 12:26:23',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(13,'IT HelpDesk',3,'remote','7499 144 Street','<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>IT Helpdesk Technician Job Description</title>\n    <style>\n        body {\n            font-family: Arial, sans-serif;\n            line-height: 1.6;\n            margin: 20px;\n        }\n        h1, h2, h3 {\n            color: #333;\n        }\n        .container {\n            max-width: 800px;\n            margin: auto;\n            padding: 20px;\n            border: 1px solid #ccc;\n            border-radius: 10px;\n            background-color: #f9f9f9;\n        }\n        .section {\n            margin-bottom: 20px;\n        }\n    </style>\n</head>\n<body>\n    <div class=\"container\">\n        <h1>IT Helpdesk Technician Job Description</h1>\n        <div class=\"section\">\n            <h2>Position</h2>\n            <p><strong>Title:</strong> IT Helpdesk Technician</p>\n            <p><strong>Location:</strong> [Your Company Name]</p>\n            <p><strong>Department:</strong> Information Technology</p>\n            <p><strong>Reports to:</strong> IT Manager</p>\n            <p><strong>Employment Type:</strong> Full-Time/Part-Time/Contract (Specify as applicable)</p>\n            <p><strong>Salary:</strong> Competitive/Commensurate with experience</p>\n        </div>\n        <div class=\"section\">\n            <h2>Job Overview</h2>\n            <p>We are seeking a highly skilled and motivated IT Helpdesk Technician to join our dynamic IT team. The ideal candidate will provide technical support and assistance to end-users, ensuring the smooth operation of our IT systems. This role requires excellent problem-solving skills, technical knowledge, and the ability to communicate effectively with users of varying technical proficiency.</p>\n        </div>\n        <div class=\"section\">\n            <h2>Key Responsibilities</h2>\n            <ul>\n                <li><strong>Provide Technical Support:</strong> Respond to and resolve user inquiries and issues related to hardware, software, network, and other IT systems.</li>\n                <li><strong>Diagnose and Troubleshoot Problems:</strong> Identify, diagnose, and resolve technical issues promptly. Escalate complex problems to senior IT staff or specialized support teams as needed.</li>\n                <li><strong>Install and Configure Software:</strong> Install, configure, and update software applications and operating systems on user devices.</li>\n                <li><strong>Manage User Accounts:</strong> Create, modify, and manage user accounts and permissions within various systems.</li>\n                <li><strong>Maintain IT Equipment:</strong> Ensure the proper functioning of IT equipment such as computers, printers, and peripheral devices. Perform regular maintenance and updates.</li>\n                <li><strong>Document Solutions:</strong> Document and track issues, solutions, and work performed using the helpdesk ticketing system. Create and update technical documentation and user guides.</li>\n                <li><strong>Provide Training:</strong> Assist in training users on basic IT skills, software applications, and best practices for IT security.</li>\n                <li><strong>Monitor Systems:</strong> Monitor IT systems and networks to identify potential issues and ensure optimal performance.</li>\n                <li><strong>Collaborate with IT Team:</strong> Work closely with other IT staff to implement and support IT projects and initiatives.</li>\n            </ul>\n        </div>\n        <div class=\"section\">\n            <h2>Required Skills and Qualifications</h2>\n            <ul>\n                <li><strong>Education:</strong> Bachelor\'s degree in Information Technology, Computer Science, or a related field, or equivalent work experience.</li>\n                <li><strong>Experience:</strong> Previous experience in an IT helpdesk or technical support role.</li>\n                <li><strong>Technical Skills:</strong> Proficiency with operating systems (Windows, macOS, Linux), common software applications, networking fundamentals, and hardware troubleshooting.</li>\n                <li><strong>Communication Skills:</strong> Excellent verbal and written communication skills. Ability to explain technical concepts to non-technical users.</li>\n                <li><strong>Problem-Solving Skills:</strong> Strong analytical and problem-solving abilities. Ability to work under pressure and handle multiple tasks simultaneously.</li>\n                <li><strong>Customer Service:</strong> A customer-focused attitude with a commitment to providing high-quality service and support.</li>\n                <li><strong>Certifications:</strong> Relevant certifications (e.g., CompTIA A+, Network+, Microsoft Certified Professional) are a plus.</li>\n            </ul>\n        </div>\n        <div class=\"section\">\n            <h2>Additional Information</h2>\n            <ul>\n                <li><strong>Working Conditions:</strong> This position may require occasional evening or weekend work to address urgent issues or perform system maintenance.</li>\n                <li><strong>Physical Requirements:</strong> Ability to lift and carry IT equipment, and work in various physical environments, including server rooms.</li>\n            </ul>\n        </div>\n        <div class=\"section\">\n            <h2>How to Apply</h2>\n            <p>Interested candidates should submit their resume and cover letter outlining their qualifications and experience to [email/contact information].</p>\n        </div>\n        <div class=\"section\">\n            <p><strong>[Your Company Name] is an equal opportunity employer. We celebrate diversity and are committed to creating an inclusive environment for all employees.</strong></p>\n        </div>\n    </div>\n</body>\n</html>\n',15,'2024-07-25 12:28:35',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(17,'khvbjhv',2,'inPerson','9/495 Raymond street sale Victoria 3850',',m ,m',6,'2024-07-26 07:06:08',6666,'2024-07-22','2024-07-23','88','h bn','kbkh','hbhbh','jbj','jhbjh');
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `studentNumber` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `students_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (1,1,'Akashdeep Singh','2873'),(2,4,'Romanjeet Kaur','10022'),(3,10,'Nanakpreet Singh','A01331021'),(4,31,'Akashdeep Singh','A01331021'),(5,33,'Akashdeep Singh','A01331021'),(6,35,'Amarpreet Singh','1002222');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `userType` enum('student','employer','admin') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Bhanguakash36@gmail.com','Akash2232','student'),(4,'bhanguakash35@gmail.com','jdebfe','student'),(6,'bhanguakash37@gmail.com','Tanya','employer'),(7,'jakeperalta@gmail.com','Amy','employer'),(8,'Akasj@gmail.com','dknk','employer'),(9,'bhanh@gmsil.com','Rosa','employer'),(10,'bhangu@gmail.com','ddgdgdgdg','student'),(11,'bhangud@gmail.com','ddgdgdgdg','employer'),(14,'bhanguakash3@gmail.com','Akash2232','employer'),(15,'pujanpreet@gmail.com','password123','admin'),(16,'deepbhangu@gmail.com','password','employer'),(17,'bhanguakash7@gmail.com','Tanya','employer'),(21,'bhanguaka@gmail.com','hhhh','employer'),(24,'Akas@gmail.com','error','employer'),(25,'bha@gmail.com','bha','employer'),(26,'bhabb@gmail.com','bha','employer'),(31,'bhanguakash@gmail.com','Tanya','student'),(33,'bhanguah@gmail.com','password','student'),(35,'amar@gmail.com','amarpreet','student'),(36,'bhan@gmail.com','pass','employer'),(38,'hhh@gmail.com','hi','employer');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-26  0:29:43
