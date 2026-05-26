import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();
const PORT = 8000;
const HOST = "localhost";

// Middleware untuk membaca JSON dari body request
app.use(express.json());

// --- 1. KONFIGURASI SWAGGER ---
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Dokumentasi Film - KPL",
            version: "1.0.0",
            description: "Latihan API Design & Construction menggunakan Express dan Swagger JSDoc",
        },
        servers: [
            {
                url: `http://${HOST}:${PORT}`,
            },
        ],
    },
    // File yang akan discan oleh Swagger untuk mencari komentar JSDoc
    apis: ["./app.js"], 
};

const specs = swaggerJSDoc(swaggerOptions);

// Route untuk tampilan dokumentasi Swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

// --- 2. DATA STORAGE (Temporary di RAM) ---
let daftarFilm = [];

// --- 3. DAFTAR ENDPOINT (ROUTES) ---

/**
 * @swagger
 * /:
 *   get:
 *     summary: Halaman utama API
 *     responses:
 *       200:
 *         description: Berhasil mengakses root
 */
app.get('/', (req, res) => {
    res.send("<h1>Selamat Datang di API Film</h1><p>Akses dokumentasi di: <a href='/docs'>/docs</a></p>");
});

/**
 * @swagger
 * /film:
 *   get:
 *     summary: Mendapatkan semua daftar film
 *     responses:
 *       200:
 *         description: Berhasil mengambil semua data film
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
app.get('/film', (req, res) => {
    return res.status(200).json(daftarFilm);
});

/**
 * @swagger
 * /film:
 *   post:
 *     summary: Menambahkan film baru ke daftar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Inception"
 *               genre:
 *                 type: string
 *                 example: "Sci-Fi"
 *               year:
 *                 type: integer
 *                 example: 2010
 *     responses:
 *       201:
 *         description: Film berhasil ditambahkan
 */
app.post('/film', (req, res) => {
    const film = {
        id: daftarFilm.length + 1,
        title: req.body.title,
        genre: req.body.genre,
        year: req.body.year
    };
    daftarFilm.push(film);
    return res.status(201).json(film);
});

/**
 * @swagger
 * /film/{id}:
 *   get:
 *     summary: Mendapatkan detail film berdasarkan ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID film
 *     responses:
 *       200:
 *         description: Data film ditemukan
 *       404:
 *         description: Film tidak ditemukan
 */
app.get('/film/:id', (req, res) => {
    const film = daftarFilm.find(m => m.id === parseInt(req.params.id));
    if (!film) {
        return res.status(404).json({ message: "Film tidak ditemukan" });
    }
    return res.status(200).json(film);
});

/**
 * @swagger
 * /film/{id}:
 *   delete:
 *     summary: Menghapus film berdasarkan ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID film yang akan dihapus
 *     responses:
 *       200:
 *         description: Berhasil menghapus film
 *       404:
 *         description: Film tidak ditemukan
 */
app.delete('/film/:id', (req, res) => {
    const indexFilm = daftarFilm.findIndex(f => f.id === Number(req.params.id));
    
    if (indexFilm === -1) {
        return res.status(404).json({ message: "Film tidak ditemukan" });
    }
    
    const filmDihapus = daftarFilm.splice(indexFilm, 1)[0]; 
    
    return res.status(200).json({
        message: "Berhasil menghapus film",
        data: filmDihapus
    });
});

// --- 4. MENJALANKAN SERVER ---
app.listen(PORT, HOST, () => {
    console.log(` Server running on http://${HOST}:${PORT}`);
    console.log(` Swagger Docs: http://${HOST}:${PORT}/docs\n`);
});