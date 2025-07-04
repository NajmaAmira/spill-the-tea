import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

// Impor komponen lain
import PostForm from '../components/PostForm';
import EditForm from '../components/EditForm';

function HomePage() {
  // State untuk menyimpan daftar postingan dan status mode edit
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  
  // Ambil status user dari context global
  const { user } = useAuth();

  // Ambil URL API dari environment variable
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Fungsi untuk mengambil semua data postingan dari API
  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API_URL}/posts`);
      // Urutkan postingan dari yang terbaru berdasarkan tanggal pembuatan
      setPosts(response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (error) {
      console.error('Gagal mengambil data postingan:', error);
    }
  };

  // Jalankan fetchPosts() saat komponen pertama kali dimuat
  useEffect(() => {
    fetchPosts();
  }, []);

  // Fungsi untuk menghapus postingan
  const handleDelete = async (id) => {
    if (!user || !user.token) {
      alert("Anda harus login untuk menghapus curhatan.");
      return;
    }
    
    if (window.confirm("Apakah Anda yakin ingin menghapus curhatan ini?")) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        await axios.delete(`${API_URL}/posts/${id}`, config);
        
        // --- TAMBAHKAN BARIS DI BAWAH INI ---
        // Update state untuk menghapus post dari tampilan secara real-time
        setPosts(posts.filter(post => post.id !== id));

      } catch (error) {
        console.error('Gagal menghapus postingan:', error);
        alert('Gagal menghapus postingan. Anda mungkin bukan pemiliknya.');
      }
    }
  };
  
  // Fungsi untuk menangani data setelah di-update dari EditForm
  const handlePostUpdated = () => {
    fetchPosts(); // Cukup panggil ulang fungsi untuk mengambil semua post
    setEditingPost(null); // Keluar dari mode edit dan tutup modal
  };

  return (
    <div className="page-container">
      {/* Kita akan membuat layout langsung di dalam page-container */}
      <div className="home-layout">
        
        {/* === KOLOM KIRI (STICKY) === */}
        <div className="form-column">
          {/* Header dipindahkan ke sini */}
          <header>
            <h1>Anon Spill Zone</h1>
            <p>Let it all out — no names, no worries.</p>
          </header>

          {/* Form tambah hanya tampil jika user login */}
          {user && <PostForm onPostCreated={fetchPosts} />}
        </div>

        {/* === KOLOM KANAN (SCROLLABLE) === */}
        <div className="posts-column">
          <h2>Latest</h2>
          <div className="post-list">
            {posts.map(post => (
              <article key={post.id} className="post-item">
                <p>{post.content}</p>
                <div className="post-footer">
                  <span><strong>{post.author}</strong></span>
                  
                  {user && user.anonymousId === post.author && (
                    <div className="post-actions">
                      <button onClick={() => setEditingPost(post)} className="edit-button">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(post.id)} className="delete-button">
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Edit tetap di luar layout utama */}
      {editingPost && (
        <EditForm 
          post={editingPost}
          onPostUpdated={handlePostUpdated}
          onCancel={() => setEditingPost(null)}
        />
      )}
    </div>
  );
}

export default HomePage;