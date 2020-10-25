#!/bin/bash
# This script is used to build a production-ready version of the server application

read -r -d '' NPM_SCRIPT << EOM
{
  "name": "app",
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

cp -r public/ dist/

echo $NPM_SCRIPT >> dist/package.json