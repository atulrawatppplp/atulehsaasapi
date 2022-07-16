const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  port: process.env.PORT||8055,
  dbName: process.env.DB_NAME,
  dbPassword: process.env.DB_PASSWORD,
  dbUser: process.env.DB_USER,
  dbHost: process.env.DB_HOST,
  tokenKey: process.env.TOKEN_KEY
};