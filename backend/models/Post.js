// models/Post.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Post = sequelize.define('Post', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // TAMBAHKAN BLOK OPSI INI
  timestamps: true // Ini akan otomatis membuat kolom createdAt dan updatedAt
});

// Relasi tidak berubah
User.hasMany(Post);
Post.belongsTo(User);

module.exports = Post;