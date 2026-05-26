
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// 1. SETTING KONFIGURASI SWAGGER (Taruh di atas rute)
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "film yang di tonton",
            version: "1.0.0",
            description: "Latihan API Design menggunakan Swagger",
        },
        servers: [{ url: `http://${HOST}:${PORT}` }],
    },
    apis: ["app.js"], 
};
const specs = swaggerJSDoc(swaggerOptions);
export{
    specs,
    swaggerUi,
}