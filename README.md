# SynCal API Server

This is the back-end API server for project SynCal.
The project is still under heavy development, but it will be later used as a teaching tool for full-stack application development.

## Usage

The API keys and the default port number should be stored on the `.env` file.

```env
NODE_ENV=development
PORT=3000
```

```bash
# install dependencies
yarn

# start server
yarn start

# build production application
yarn build

# run the sandbox script. This is generally for testing or running machine-specific cron jobs
yarn sandbox
```
