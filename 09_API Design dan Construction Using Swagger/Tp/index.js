const express = require('express');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = 3000;

// Swagger document manual dengan response detail
const swaggerDocument = {
    openapi: '3.0.0',
    info: {
        title: 'API Menu Makanan',
        version: '1.0.0',
        description: 'Dokumentasi API untuk menu makanan',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Local server',
        },
    ],
    paths: {
        '/': {
            get: {
                summary: 'Halaman utama API',
                description: 'Menampilkan pesan selamat datang dan daftar endpoint yang tersedia',
                responses: {
                    '200': {
                        description: 'Berhasil menampilkan halaman utama',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        pesan: {
                                            type: 'string',
                                            example: 'Cek /docs untuk melihat rincian API'
                                        },
                                        endpoint_tersedia: {
                                            type: 'object',
                                            properties: {
                                                'GET /menu': {
                                                    type: 'string',
                                                    example: 'Lihat semua kategori'
                                                },
                                                'GET /menu/:category': {
                                                    type: 'string',
                                                    example: 'Lihat menu berdasarkan kategori (bakmi/rames)'
                                                },
                                                'GET /docs': {
                                                    type: 'string',
                                                    example: 'Dokumentasi API'
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/menu': {
            get: {
                summary: 'Menampilkan semua kategori menu',
                description: 'Endpoint ini mengembalikan daftar kategori menu yang tersedia',
                responses: {
                    '200': {
                        description: 'Berhasil menampilkan kategori',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        kategori_tersedia: {
                                            type: 'array',
                                            items: {
                                                type: 'string'
                                            },
                                            example: ['bakmi', 'rames']
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/menu/{category}': {
            get: {
                summary: 'Menampilkan menu berdasarkan kategori',
                description: 'Endpoint ini mengembalikan daftar menu dan harga sesuai kategori yang dipilih',
                parameters: [
                    {
                        in: 'path',
                        name: 'category',
                        required: true,
                        schema: {
                            type: 'string',
                            enum: ['bakmi', 'rames']
                        },
                        description: 'Kategori menu (bakmi atau rames)',
                        example: 'bakmi'
                    }
                ],
                responses: {
                    '200': {
                        description: 'Berhasil menampilkan menu',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    additionalProperties: {
                                        type: 'integer',
                                        description: 'Harga dalam Rupiah'
                                    },
                                    example: {
                                        'bakmi ayam spesial': 25000,
                                        'bakmi rica-rica': 28000,
                                        'bakmi komplit (bakso pangsit)': 35000
                                    }
                                }
                            }
                        }
                    },
                    '404': {
                        description: 'Kategori tidak ditemukan',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        error: {
                                            type: 'string',
                                            example: 'Menu tidak ditemukan'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

// ============ MIDDLEWARE ============
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
});

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// ============ DATA ============
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

// ============ ENDPOINTS ============

// Endpoint root
app.get('/', (req, res) => {
    res.json({
        pesan: "Cek /docs untuk melihat rincian API",
        endpoint_tersedia: {
            "GET /menu": "Lihat semua kategori",
            "GET /menu/:category": "Lihat menu berdasarkan kategori (bakmi/rames)",
            "GET /docs": "Dokumentasi API"
        }
    });
});

// Endpoint GET /menu - menampilkan semua kategori
app.get('/menu', (req, res) => {
    const categories = Object.keys(menuData);
    res.json({ kategori_tersedia: categories });
});

// Endpoint GET /menu/:category - menampilkan menu berdasarkan kategori
app.get('/menu/:category', (req, res) => {
    const category = req.params.category;
    const menu = menuData[category];

    if (menu) {
        res.json(menu);
    } else {
        res.status(404).json({ error: "Menu tidak ditemukan" });
    }
});

// ============ SWAGGER DOCUMENTATION ============
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ============ ERROR HANDLER ============
app.use((err, req, res, next) => {
    console.error(`Error: ${err.message}`);
    res.status(500).json({ 
        error: "Terjadi kesalahan pada server",
        message: err.message 
    });
});

// ============ START SERVER ============
app.listen(PORT, () => {
    console.log(`=================================`);
    console.log(` Server berjalan di http://localhost:${PORT}`);
    console.log(` Dokumentasi API: http://localhost:${PORT}/docs`);
    console.log(`=================================`);
});