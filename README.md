# Project Spill the Tea

Aplikasi web full-stack yang memungkinkan pengguna untuk membuat, melihat, mengedit, dan menghapus postingan mereka.

## Fitur

*   **Autentikasi Pengguna:** Pengguna dapat mendaftar dan masuk untuk mengakses postingan mereka.
*   **Manajemen Catatan:** Pengguna dapat membuat, membaca, memperbarui, dan menghapus (CRUD) postingan mereka.
*   **Antarmuka Responsif:** Dibuat dengan React dan CSS untuk pengalaman pengguna yang mulus di berbagai perangkat.

## Teknologi yang Digunakan

### Backend

*   **Node.js:** Lingkungan runtime JavaScript.
*   **Express:** Kerangka kerja web untuk Node.js.
*   **MongoDB:** Database NoSQL untuk menyimpan data pengguna dan catatan.
*   **Mongoose:** Pustaka pemodelan data objek (ODM) untuk MongoDB dan Node.js.
*   **JSON Web Tokens (JWT):** Untuk autentikasi yang aman.
*   **bcryptjs:** Untuk hashing kata sandi.
*   **CORS:** Untuk mengaktifkan Cross-Origin Resource Sharing.
*   **dotenv:** Untuk mengelola variabel lingkungan.

### Frontend

*   **React:** Pustaka JavaScript untuk membangun antarmuka pengguna.
*   **Vite:** Alat build untuk pengembangan frontend modern.
*   **React Router:** Untuk perutean sisi klien.
*   **Axios:** Klien HTTP berbasis janji untuk membuat permintaan ke backend.
*   **CSS:** Untuk menata komponen.

## Instalasi

1.  **Clone repositori:**

    ```bash
    git clone <URL_REPOSITORI_ANDA>
    cd private-notes
    ```

2.  **Install dependensi backend:**

    ```bash
    cd backend
    npm install
    ```

3.  **Install dependensi frontend:**

    ```bash
    cd ../frontend
    npm install
    ```

4.  **Konfigurasi Variabel Lingkungan:**

    *   Buat file `.env` di direktori `backend`.
    *   Tambahkan variabel lingkungan berikut:

        ```
        PORT=5000
        MONGO_URI=<URI_KONEKSI_MONGODB_ANDA>
        JWT_SECRET=<RAHASIA_JWT_ANDA>
        ```

## Menjalankan Aplikasi

1.  **Jalankan server backend:**

    ```bash
    cd backend
    npm run dev
    ```

    Server akan berjalan di `http://localhost:5000`.

2.  **Jalankan aplikasi frontend:**

    ```bash
    cd frontend
    npm run dev
    ```

    Aplikasi akan berjalan di `http://localhost:5173`.

## Endpoint API

### Rute Pengguna (`/api/users`)

*   `POST /register`: Mendaftarkan pengguna baru.
*   `POST /login`: Masuk pengguna.
*   `GET /me`: Mendapatkan detail pengguna yang saat ini masuk.

### Rute Postingan (`/api/posts`)

*   `POST /`: Membuat postingan baru (memerlukan autentikasi).
*   `GET /`: Mendapatkan semua postingan (memerlukan autentikasi).
*   `GET /:id`: Mendapatkan satu postingan berdasarkan ID (memerlukan autentikasi).
*   `PUT /:id`: Memperbarui postingan (memerlukan autentikasi).
*   `DELETE /:id`: Menghapus postingan (memerlukan autentikasi).
#
