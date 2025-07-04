// routes/postRoutes.js

const express = require('express');
const router = express.Router();
const {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
} = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

// === RUTE PUBLIK (Siapa saja bisa akses) ===
router.route('/').get(getAllPosts);
router.route('/:id').get(getPostById);


// === RUTE TERLINDUNGI (Hanya user yang sudah login bisa akses) ===
router.route('/').post(protect, createPost);

// GABUNGKAN .put() dan .delete() DALAM SATU BARIS INI
router.route('/:id')
    .put(protect, updatePost)
    .delete(protect, deletePost);


module.exports = router;