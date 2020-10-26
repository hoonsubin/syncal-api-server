#!/bin/bash
echo "Deploying build to Glitch.com..."

if [ -f .env ]; then
    # load environment variables within the .env file
    export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
    
fi

# pass the required variables and publish it to glitch
DEBUG=sync-glitch* yarn run sync-glitch
