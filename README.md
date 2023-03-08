# Online Survey Tool Project

This is an online survey tool website that allows users to create, edit, and share surveys. The website is built using React, Node, Express and TypeORM.

## Features

    - Create, save and edit surveys with a user-friednly interface
    - Choose from a range of question types, such as multiple choice, checkbox, dropdown, boolean and text input
    - Share surveys with participants via a unique URL
    - Monitor survey responses in real-time

## Installation

To run this project locally, you will need to have Node.js and npm installed on your machine.

    1. Clone the repository to your local machine:
    `git clone https://github.com/your-username/online-survey-tool.git`

    2. Install the dependencies:
    ```cd frontend/
    npm install
    cd ..
    cd backend/
    npm install```

    3. Set up the express configuration:
    - `PORT_NO`: The port number of the express server
    - `DB_PORT`: The port number of the database server
    - `DB_DATABASE`: The name of the database
    - `DB_ROLE`: The username for connecting to the database
    - `DB_PASSWORD`: The password for connecting to the database
    - `JWT_SECRET`: The secret used to sign JWT tokens
    - `REACT_URL: The URL of local React for allowing cross-origin communication

    4. Start the servers:
    ```cd frontend/
    npm start
    cd ..
    cd backend/
    npm start```
