# gemini-chatbot-api
# RasaLokal - Chatbot Rekomendasi Kuliner Lokal

RasaLokal adalah aplikasi chatbot sederhana berbasis **Node.js**, **Express**, **Google Gemini API**, dan **vanilla JavaScript**. Aplikasi ini membantu pengguna mendapatkan rekomendasi kuliner lokal berdasarkan lokasi, budget, selera, waktu makan, dan kebutuhan khusus.

## Fitur

* Chatbot rekomendasi kuliner lokal Indonesia.
* Menggunakan Gemini API sebagai model AI.
* Tampilan web sederhana dengan HTML, CSS, dan vanilla JavaScript.
* Mendukung conversation history agar chatbot dapat memahami konteks percakapan.
* Quick prompt untuk contoh pertanyaan cepat.
* Cocok untuk rekomendasi makanan khas daerah, hidden gem, jajanan lokal, warung, kafe, dan rute wisata kuliner.

## Teknologi yang Digunakan

* Node.js
* Express.js
* Google Gemini API
* HTML
* CSS
* Vanilla JavaScript

## Struktur Project

```txt
project-folder/
├── index.js
├── package.json
├── package-lock.json
├── .env
├── .gitignore
└── public/
    ├── index.html
    ├── script.js
    └── style.css
```

## Persiapan Project

Pastikan sudah menginstall:

* Node.js
* npm
* Git

Clone atau download project ini, lalu masuk ke folder project:

```bash
cd nama-folder-project
```

Install dependency:

```bash
npm install
```

## Konfigurasi Environment

Buat file `.env` di root folder project:

```env
GEMINI_API_KEY=isi_api_key_gemini_kamu
```

Jangan upload file `.env` ke GitHub karena berisi API key.

Pastikan file `.gitignore` memiliki isi seperti berikut:

```gitignore
node_modules/
.env
.DS_Store
```

## Menjalankan Project

Jalankan aplikasi dengan perintah:

```bash
npm start
```

Lalu buka browser:

```txt
http://localhost:3000
```

## Contoh Prompt

Beberapa contoh prompt yang bisa dicoba:

```txt
Rekomendasikan kuliner lokal di Bandung yang murah, enak, dan cocok untuk makan siang.
```

```txt
Saya di Surabaya, mau makanan berkuah, pedas, budget 40 ribu.
```

```txt
Cari tempat makan malam lokal dengan budget maksimal 50 ribu.
```

```txt
Rekomendasikan hidden gem kuliner lokal di Jakarta Selatan yang cocok untuk nongkrong.
```

```txt
Buatkan rute wisata kuliner 1 hari di Jogja dari pagi sampai malam.
```

## Panduan Update ke GitHub

### 1. Cek Status Perubahan

Sebelum melakukan update ke GitHub, cek file yang berubah:

```bash
git status
```

Jika ada file yang berubah, Git akan menampilkan daftar file tersebut.

### 2. Tambahkan File ke Staging Area

Untuk menambahkan semua perubahan:

```bash
git add .
```

Atau jika hanya ingin menambahkan file tertentu:

```bash
git add public/index.html
git add public/script.js
git add public/style.css
git add index.js
git add README.md
```

### 3. Buat Commit

Buat commit dengan pesan yang jelas:

```bash
git commit -m "Update chatbot menjadi rekomendasi kuliner lokal"
```

Contoh pesan commit lain:

```bash
git commit -m "Update UI RasaLokal"
```

```bash
git commit -m "Add README usage and GitHub update instructions"
```

```bash
git commit -m "Improve Gemini system instruction for local culinary chatbot"
```

### 4. Push ke GitHub

Jika branch utama menggunakan `main`:

```bash
git push origin main
```

Jika branch utama menggunakan `master`:

```bash
git push origin master
```

Untuk mengecek branch yang sedang digunakan:

```bash
git branch
```

Branch aktif ditandai dengan simbol `*`.

### 5. Jika Project Belum Terhubung ke Repository GitHub

Inisialisasi Git terlebih dahulu:

```bash
git init
```

Tambahkan semua file:

```bash
git add .
```

Buat commit pertama:

```bash
git commit -m "Initial commit"
```

Tambahkan remote repository GitHub:

```bash
git remote add origin https://github.com/username/nama-repository.git
```

Ganti `username` dan `nama-repository` sesuai repository GitHub kamu.

Set branch utama menjadi `main`:

```bash
git branch -M main
```

Push ke GitHub:

```bash
git push -u origin main
```

## Update Project Setelah Ada Perubahan

Setiap kali melakukan perubahan file, gunakan alur berikut:

```bash
git status
git add .
git commit -m "Deskripsi perubahan"
git push origin main
```

Contoh:

```bash
git status
git add .
git commit -m "Update tampilan dan prompt RasaLokal"
git push origin main
```

## Mengambil Update Terbaru dari GitHub

Jika repository dikerjakan di lebih dari satu komputer, ambil update terbaru dengan:

```bash
git pull origin main
```

Jika branch yang digunakan adalah `master`:

```bash
git pull origin master
```

## Catatan Penting

* Jangan upload file `.env` ke GitHub.
* Jangan upload folder `node_modules`.
* Simpan API key hanya di file `.env`.
* Jika API key tidak sengaja ter-upload, segera hapus dari repository dan generate API key baru.
* Gunakan commit message yang jelas agar riwayat perubahan mudah dibaca.
* Pastikan aplikasi berjalan normal sebelum melakukan push ke GitHub.

## Troubleshooting

### Error: GEMINI_API_KEY belum diatur

Pastikan file `.env` sudah dibuat dan berisi:

```env
GEMINI_API_KEY=isi_api_key_gemini_kamu
```

Lalu restart server:

```bash
npm start
```

### Error: node_modules tidak ditemukan

Jalankan:

```bash
npm install
```

### Error saat push ke GitHub

Pastikan remote repository sudah benar:

```bash
git remote -v
```

Jika belum ada remote, tambahkan dengan:

```bash
git remote add origin https://github.com/username/nama-repository.git
```

### Error karena branch berbeda

Cek branch aktif:

```bash
git branch
```

Jika branch aktif adalah `main`, gunakan:

```bash
git push origin main
```

Jika branch aktif adalah `master`, gunakan:

```bash
git push origin master
```
