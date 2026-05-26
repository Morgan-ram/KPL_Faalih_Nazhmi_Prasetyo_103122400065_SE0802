const express = require('express');
const router = express.Router();

// Data menu
const menuData = {
    bakmi: {
        "bakmi ayam spesial": 25000,
        "bakmi rica-rica": 28000,
        "bakmi komplit (bakso pangsit)": 35000
    },
    rames: {
        "nasi rames biasa": 15000,
        "nasi rames rendang": 25000,
        "nasi rames telur balado": 18000
    }
};

/**
 * @openapi
 * /menu:
 *   get:
 *     summary: Mendapatkan semua kategori menu
 *     description: Endpoint ini mengembalikan daftar semua kategori menu yang tersedia
 *     responses:
 *       200:
 *         description: Sukses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 kategori_tersedia:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["bakmi", "rames"]
 */
router.get('/menu', (req, res) => {
    const categories = Object.keys(menuData);
    res.json({ kategori_tersedia: categories });
});

/**
 * @openapi
 * /menu/{category}:
 *   get:
 *     summary: Mendapatkan menu berdasarkan kategori
 *     description: Endpoint ini mengembalikan daftar menu dan harga sesuai kategori
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: Kategori menu (bakmi atau rames)
 *     responses:
 *       200:
 *         description: Sukses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Kategori tidak ditemukan
 */
router.get('/menu/:category', (req, res) => {
    const category = req.params.category;
    const menu = menuData[category];

    if (menu) {
        res.json(menu);
    } else {
        res.status(404).json({ error: "Menu tidak ditemukan" });
    }
});

module.exports = router;