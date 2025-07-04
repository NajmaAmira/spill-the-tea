import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function EditForm({ post, onPostUpdated, onCancel }) {
  // HAPUS: State 'title' tidak lagi diperlukan
  const [content, setContent] = useState('');
  const { user } = useAuth();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    if (post) {
      setContent(post.content);
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.token) {
      alert("Silakan login untuk mengedit curhatan.");
      return;
    }

    try {
      const updatedData = { content };
      
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      // PERBAIKI: Gunakan 'post.id' bukan 'post._id'
      const response = await axios.put(`${API_URL}/posts/${post.id}`, updatedData, config);
      onPostUpdated(response.data);
    } catch (error) {
      console.error('Gagal mengupdate postingan:', error);
      alert('Gagal mengupdate postingan. Silakan coba lagi.');
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          {/* Anda bisa mengubah judul form jika mau */}
          <h3>Edit your Words</h3>
          <div>
            {/* Input untuk Judul sudah dihapus */}
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tulis ulang curhatanmu di sini..."
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditForm;