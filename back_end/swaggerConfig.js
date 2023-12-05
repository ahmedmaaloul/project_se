const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'ToutVente API',
            version: '1.0.0',
            description: 'API documentation for ToutVente e-commerce platform',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Development server',
            },
        ],
    },
    apis: ['./routes/*.js'], // Path to your API files
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
