const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { nanoid } = require('nanoid');

// Fungsi untuk membuat token JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Registrasi user baru
const registerUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: 'Email sudah terdaftar' });
        }
        const anonymousId = `anon-${nanoid(8)}`;
        const user = await User.create({ email, password, anonymousId });

        res.status(201).json({
            id: user.id,
            email: user.email,
            anonymousId: user.anonymousId,
            token: generateToken(user.id)
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (user && (await user.matchPassword(password))) {
            res.json({
                id: user.id,
                email: user.email,
                anonymousId: user.anonymousId,
                token: generateToken(user.id)
            });
        } else {
            res.status(401).json({ message: 'Email atau password salah' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { registerUser, loginUser };