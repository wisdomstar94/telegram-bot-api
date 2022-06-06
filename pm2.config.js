require('dotenv').config();

module.exports = {
  apps: [{
    name: process.env.PROJECT_NAME,
    script: './app.js',
    env: {
      "NODE_ENV": "production",
    },
    exec_mode: 'fork',
    listen_timeout: 50000,
    kill_timeout: 5000
  }]
}