const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

let sequelize;

function getSequelize() {
  if (!sequelize) {
    sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: false,
        dialectOptions: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      }
    );
  }

  return sequelize;
}

module.exports = getSequelize();
