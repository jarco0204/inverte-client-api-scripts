### This project uses a monorepo strcture.

## The API is an express server that handles operations to the database. The Client is a react app that communicates with the mentioned API.

• The root directory contains a node package that installs eslint and prettier.
• API and Client directories are their own npm package.
• Scripts directory contains the generated test data for this iterations

## Root directory packages

• ESLint for preventing compile errors.
• Prettier to format our code.
• Axios for script data to API

## The Scripts directory

# Creates and sends the artificial data that will be used by the API

# Mimicks the expected data generated at restaurants when using InVerte's weighing scale

# To run any of the scripts:

1. cd Scripts
2. node "nameOfScript".js or node --experimental-modules app.js

# Help setting eslintrc

https://joelmasters.medium.com/setting-up-eslint-for-nextjs-37163d4cabaa
