const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    // Cek jika header authorization ada dan dimulai dengan 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 1. Ambil token dari header (setelah 'Bearer ')
            token = req.headers.authorization.split(' ')[1];

            // 2. Verifikasi keaslian token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. Cari user di database berdasarkan ID dari token, kecualikan password
            req.user = await User.findByPk(decoded.id, {
                attributes: { exclude: ['password'] }
            });
            
            // Lanjutkan ke fungsi controller berikutnya
            next();

        } catch (error) {
            // Jika token tidak valid atau ada error lain
            console.error('ERROR DI MIDDLEWARE:', error); // <-- Log error agar kita tahu
            return res.status(401).json({ message: 'Tidak terotorisasi, token tidak valid' });
        }
    }

    // Jika tidak ada token sama sekali di header
    if (!token) {
        return res.status(401).json({ message: 'Tidak terotorisasi, tidak ada token' });
    }
};

module.exports = { protect };