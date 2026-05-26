const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
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
    },
    apis: ['./index.js'], // Baca dari index.js langsung
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };