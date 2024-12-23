# Employee Tracker

  ## Description

  This is a command-line application, created to allow a business owner to view and edit the names of their departments, as well as employees and their corresponding roles and incomes. This will help the business to remain organized, particularly as the business and staff  numbers grow and shift.

  ## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

  ## Installation

  1. Open the application in your code editor, such as VS Code. 2. In the terminal, type the command “npm i” in order to install the dependencies for the application. 

  ## Usage

  Log into Postgres by typing “psql -U postgres” in the terminal and entering your password when prompted. Then, type “\i db/schema.sql” to create the database. Next, type “\i db/seeds.sql” to add the initial “seeds” to the database. Now you can exit Postgres by typing “\q” in the terminal. You can now build and run the command-line application by typing “npm run build” in the terminal, followed by “npm start”. You will be presented with a list of options for interacting with the database, including both views and edits. When you have finished interacting with the data, you can exit the application by simply selecting “Exit” from the list of options. 
