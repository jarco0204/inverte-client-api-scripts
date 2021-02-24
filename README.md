### This project uses ES modules; the type in package.json contains "type": "module".

## This project follows a mono-repo strcture.

• The root directory contains a node package that installs eslint and prettier.
• API and Client directories are their own npm package.

 <!--- Comment here: 
 If you already configure and added your require package for this project in package.json (which in this case already did, check package.json and you will see eslint and prettier is in the devDependencies). 
 Then you can inform the developers to run "npm install" in README.md. "npm install" will install all the requirement stated in package.json. So in this case, when I run "npm install", eslint and prettier will be installed, and I do not have to run 'npm i -D eslint'
  'npm i prettier' one by one, npm install do all of it for me  --->
