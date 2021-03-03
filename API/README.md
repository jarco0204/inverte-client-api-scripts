### This is the server API package that runs express using MVC paradigm.

• index.js: main entry file for the package.
• \_\_ test \_\_ : contains the Mocha tests.
• src/App.js : contains the express server.
• src/Controllers : contains the files that communicate with the Models.
• src/Models : contains the Class that interacts with Mongodb.
• src/Routers : contains the files that handle the routes.
• src/Utils : contains the database file.

## Installed packages

• Express: API server
• Nodemon: Facilitates running the experimental server
• Mongodb: database used for this project
• Mocha: Testing
• Axios: Sending data in Mocha tests

## Design Decisions and Assumptions

# For iteration 2, only one user is assumed to exists. Consequently, only one collection.

# ES modules are used instead of require.

# Each user is its own db collection.

• In order to help querying for Machine Learning purposes, we have decided that each user will a separate db collection. In order for a user to be a user, they NEED to buy at least one InVerte's weighing scale. Thus, it is not the case that the collection will have only few documents.

# Document with \_id=0 inside a user's collection will contain objects that handle information about the weighing scales——number of scales bought, ingredient name, correct portion weight.

• Some operations inside src/Models/Ingredient.js have a 'hardcoded' \_id=0 because it is a lot cleaner to have the most important data inside a specific document

## MongoDb information

# inverte-api-server is the name of the database.

# Each user is its own collection (refer to Design Decisions section)

## Routes and HTTP operations handled by the API

# /ingredient/

¶ Needs userID and ingredientID
• POST: adds an ingredientID to document inside user's collection with \_id=0
• DELETE: deletes the ingredientID

# /ingredient/info

# /ingredient/real-time

# /ingredients/

# How to run this package (assumes you are at root directory)

1. Cd API
2. npm run dev
