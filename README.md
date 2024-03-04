# Social-Media-API

## Description

This project is a social platform where users can create accounts, post their thoughts, and react to others' thoughts. It leverages a Node.js backend with Express for server management, MongoDB for data persistence, Mongoose for MongoDB object modeling, bcrypt for password hashing, and `date-fns` for handling date and time operations. The platform is designed to be simple, intuitive, and secure, providing users with a seamless experience in sharing and interacting with the community.

## Features

- **User Authentication**: Secure signup and login functionality, with password hashing for data protection.
- **Thought Posting**: Users can post their thoughts, with support for character limits to ensure content quality.
- **Reactions**: Users can react to thoughts, enabling interactive and engaging discussions.
- **Date Formatting**: Utilizes `date-fns` for human-friendly date and time display.
- **Real-Time Interaction**: Users can see reactions to their thoughts in real-time, fostering a dynamic community environment.

## Usage

1. **clone the repostiory**

2. **Install dependencies**
Navigate to the directory and `npm i` to install required dependencies

3. **Environmental variables**
Setup your environmental variables with a `.env` file in the root of the directory and include the following

DB_URI=mongodb://localhost:27017/yourDatabaseName
SECRET_KEY=yourSecretKey

4. **Start the server**

After starting the server, you can use the platform through the provided API endpoints.

This project is licensed under the [MIT License](LICENSE).