#!/bin/bash
# This script is used to build a production-ready version of the server application
# It fimply create a simple package.json file for execution and copies the public folder for static resources

# define a basic npm package option file
read -r -d '' NPM_SCRIPT << EOM
{
  "name": "server-app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
        "node": "^15.0.1"
    }
}
EOM

# copy the pulic file. You can also copy any static resource files as well
cp -r public dist/

# create the npm script
echo $NPM_SCRIPT >> dist/package.json