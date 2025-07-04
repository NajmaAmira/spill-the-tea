require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db'); // Impor sequelize
const cors = require('cors');

// Impor model untuk sinkronisasi
require('./models/User');
require('./models/Post');

const app = express();
app.use(cors());
app.use(express.json());

// Rute
app.get('/', (req, res) => {
    res.send('API berjalan...');
});
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));

const PORT = process.env.PORT || 5000;

// Sinkronkan database dan jalankan server
sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
}).catch(err => console.log('Error: ' + err));