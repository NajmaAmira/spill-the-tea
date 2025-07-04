const { Sequelize } = require('sequelize');

// Konfigurasi koneksi ke database MySQL
const sequelize = new Sequelize(
  process.env.DB_NAME,      // Nama database
  process.env.DB_USER,      // User database
  process.env.DB_PASSWORD,  // Password database
  {
    host: process.env.DB_HOST, // Host database
    dialect: 'mysql'           // Memberitahu Sequelize bahwa kita menggunakan MySQL
  }
);

module.exports = sequelize;