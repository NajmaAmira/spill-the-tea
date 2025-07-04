const Post = require('../models/Post');

// Membuat postingan baru
const createPost = async (req, res) => {
    try {
        const { content } = req.body;
        const newPost = await Post.create({
            content,
            author: req.user.anonymousId, // Diambil dari middleware
            UserId: req.user.id // Menyimpan foreign key ke tabel User
        });
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: 'Gagal membuat postingan', error: error.message });
    }
};

// Mendapatkan semua postingan
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({ order: [['createdAt', 'DESC']] });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Gagal mendapatkan data', error: error.message });
    }
};

// Mendapatkan satu postingan berdasarkan ID
const getPostById = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'Postingan tidak ditemukan' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Gagal mendapatkan data', error: error.message });
    }
};

// Memperbarui postingan
const updatePost = async (req, res) => {
    try {
        const { content } = req.body;
        const post = await Post.findByPk(req.params.id);

        // --- BLOK DEBUGGING DIMULAI ---
        if (!post) {
            console.log("DEBUG: Postingan dengan ID", req.params.id, "tidak ditemukan.");
            return res.status(404).json({ message: 'Postingan tidak ditemukan' });
        }
        if (!req.user) {
            console.log("DEBUG: req.user tidak ada. Middleware 'protect' mungkin bermasalah.");
            return res.status(401).json({ message: 'Tidak terotorisasi' });
        }
        
        console.log("===================================");
        console.log("DEBUG: Membandingkan ID untuk otorisasi edit");
        console.log("ID Pengirim di Postingan (post.author):", post.author);
        console.log("ID Anonim User yang Login (req.user.anonymousId):", req.user.anonymousId);
        console.log("Apakah keduanya sama persis? (===):", post.author === req.user.anonymousId);
        console.log("===================================");
        // --- BLOK DEBUGGING SELESAI ---

        if (post && post.author === req.user.anonymousId) {
            post.content = content;
            await post.save();
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'Postingan tidak ditemukan atau Anda tidak berhak' });
        }
    } catch (error) {
        console.error("Error di updatePost:", error);
        res.status(500).json({ message: 'Gagal memperbarui postingan', error: error.message });
    }
};

// Menghapus postingan
const deletePost = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (post && post.author === req.user.anonymousId) {
            await post.destroy();
            res.status(200).json({ message: 'Postingan berhasil dihapus' });
        } else {
            res.status(404).json({ message: 'Postingan tidak ditemukan atau Anda tidak berhak' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Gagal menghapus postingan', error: error.message });
    }
};

module.exports = { createPost, getAllPosts, getPostById, updatePost, deletePost };