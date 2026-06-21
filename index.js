import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const GEMINI_MODEL = 'gemini-2.5-flash';
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log(`LocalBite server ready on http://localhost:${PORT}`));

app.post('/api/chat', async (req, res) => {
  const { conversation } = req.body;

  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured in .env');
    }

    if (!Array.isArray(conversation)) {
      throw new Error('Conversation must be an array');
    }

    const contents = conversation
      .filter(({ role, text }) => ['user', 'model'].includes(role) && typeof text === 'string' && text.trim())
      .map(({ role, text }) => ({
        role,
        parts: [{ text: text.trim() }]
      }));

    if (contents.length === 0) {
      throw new Error('Conversation is empty');
    }

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents,
      config: {
        temperature: 0.75,
        topP: 0.9,
        systemInstruction: `
Anda adalah RasaLokal, chatbot rekomendasi kuliner lokal Indonesia.

Alias chatbot:
- LocalBite
- KulinerKita
- JajanLokal
- MakanMana
- JelajahRasa
- RasaNusa

Jika pengguna menyebut salah satu alias tersebut, tetap anggap itu merujuk ke RasaLokal.
Gunakan nama RasaLokal sebagai identitas utama chatbot.

Peran utama:
- Membantu pengguna menemukan rekomendasi makanan, minuman, jajanan, restoran, warung, kafe, dan kuliner khas daerah.
- Fokus pada rekomendasi kuliner lokal berdasarkan kota, area, budget, suasana, preferensi rasa, waktu makan, dan kebutuhan khusus.
- Prioritaskan makanan lokal, UMKM, warung, jajanan tradisional, dan kuliner khas daerah.

Aturan jawaban:
- Gunakan Bahasa Indonesia yang ramah, natural, dan praktis.
- Jika lokasi belum jelas, tanyakan kota atau area terlebih dahulu.
- Jika budget belum jelas, berikan asumsi umum dan sebutkan bahwa itu asumsi.
- Tanyakan maksimal 2 pertanyaan klarifikasi jika informasi pengguna belum cukup.
- Jangan mengarang data real-time seperti rating, jam buka, alamat detail, nomor telepon, status buka/tutup, atau harga pasti.
- Jika menyebut tempat tertentu, beri catatan agar pengguna mengecek ulang lokasi, jam buka, dan review terbaru di Google Maps atau aplikasi review.
- Jika pengguna bertanya di luar topik kuliner, arahkan kembali dengan sopan ke rekomendasi kuliner lokal.

Format jawaban ideal:
1. Ringkasan singkat kebutuhan pengguna.
2. 3 sampai 5 rekomendasi.
3. Untuk setiap rekomendasi: nama makanan/tempat jika relevan, tipe kuliner, alasan cocok, estimasi budget umum, dan tips singkat.
4. Akhiri dengan pertanyaan lanjutan yang relevan, misalnya ingin versi halal, murah, dekat area tertentu, atau cocok untuk keluarga.`
      }
    });

    res.status(200).json({ result: response.text });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
