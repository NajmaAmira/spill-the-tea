// src/components/PostForm.jsx

import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function PostForm({ onPostCreated }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { user } = useAuth();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const handleSubmit = async (e) => {
    e.preventDefault();

    // --- LOG UNTUK DEBUGGING ---
    console.log("Mencoba mengirim post. State 'user' saat ini:", user);

    if (!user || !user.token) {
      alert("Silakan login untuk membuat curhatan.");
      console.log("Proses dihentikan: User tidak ada atau tidak memiliki token.");
      return;
    }

    try {
      const newPost = { title, content };
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      // --- LOG KEDUA UNTUK DEBUGGING ---
      console.log("Mengirim request ke API dengan config:", config);

      await axios.post(`${API_URL}/posts`, newPost, config);
      
      setTitle('');
      setContent('');
      onPostCreated();
    } catch (error) {
      // --- LOG KETIGA JIKA AXIOS GAGAL ---
      console.error("Axios Error di PostForm:", error.response || error.message);
      alert('Gagal membuat postingan. Silakan coba lagi.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <h3>Spill Here</h3>
      <div>
        <textarea 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          required 
        />
      </div>
      <button type="submit">Send</button>
    </form>
  );
}

export default PostForm;