const { default: mongoose } = require('mongoose');
const swaggerJsdoc = require('swagger-jsdoc');
const Schema = mongoose.Schema;

/**
 * Defines the configuration information for the API.
 */
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Bonetto documentation",
        version: "1.0.1",
    },
    servers: [
        {
            url: "http://localhost:5000/api"
        },
        {
            url: "http://localhost:5001/api"
        }
    ],
    components: {
        securitySchemes: {
            userAuth: {
                type: "http",
                scheme: "bearer"
            },
        },
        schemas: {
            userRegister: {
                // ... (schema information remains unchanged)
                type: "object",
                required: ["name", "email", "password"],
                properties: {
                    name: {
                        type: "string",
                    },
                    email: {
                        type: "string",
                    },
                    password: {
                        type: "string",
                    },
                },
            },
            userLogin: {
                // ... (schema information remains unchanged)
                type: "object",
                required: ["email", "password"],
                properties: {
                    email: {
                        type: "string",
                    },
                    password: {
                        type: "string",
                    },
                },
            },
            userUpdate: {
                // ... (schema information remains unchanged)
                type: "object",
                required: ["name", "email", "password", "phone"],
                properties: {
                    name: {
                        type: "string",
                    },
                    email: {
                        type: "string",
                    },
                    password: {
                        type: "string",
                    },
                }
            },
            changePassword: {
                type: "object",
                required: [""],
                properties: {
                    oldPassword: {
                        type: "string",
                    },
                    newPassword: {
                        type: "string",
                    }
                },
            },
            changePassword: {
                // ... (schema information remains unchanged)
                type: "object",
                required: ["oldPassword", "newPassword"],
                properties: {
                    oldPassword: {
                        type: "string",
                    },
                    newPassword: {
                        type: "string",
                    },
                },
            },
            forgotPassword: {
                // ... (schema information remains unchanged)
                type: "object",
                required: ["email"],
                properties: {
                    email: {
                        type: "string",
                    },
                },
            },
            Products: {
                // ... (schema information remains unchanged)
                type: "object",
                required: ["user", "name", "sku", "price", "category", "quantity"],
                properties: {
                    user: {
                        type: "string",
                    },
                    name: {
                        type: "string",
                    },
                    sku: {
                        type: "string",
                    },
                    category: {
                        type: "string",
                    },
                    quantity: {
                        type: "string",
                    },
                    price: {
                        type: "string",
                    },
                    description: {
                        type: "string",
                    },
                },
            },
            Order: {
                // ... (schema information remains unchanged)
                type: "object",
                required: ["user", "order", "quantity", "total"],
                properties: {
                    user: {
                        type: Schema.ObjectId,
                    },
                    order: {
                        type: "object",
                        properties: {
                            productId: {
                                type: "string",
                                ref: "string",
                            },
                            quantity: {
                                type: "integer",
                            },
                        }
                    },
                    total: {
                        type: "integer",
                    },
                    custom: {
                        type: "string",
                    },
                    note: {
                        type: "string",
                    }
                },
            },
            contacUS: {
                // ... (schema information remains unchanged)
                type: "object",
                required: ["name", "email", "phone"],
                properties: {
                    name: {
                        type: "string",
                    },
                    email: {
                        type: "string",
                    },
                    phone: {
                        type: "integer",
                    }
                },
            },
        },
    },
}

/**
 * Configures the options for Swagger.
 */
const options = {
    swaggerDefinition,
    apis: [
        "./routes/*.js"
    ]
}

/**
 * Represents the OpenAPI configuration for the application.
 */
const openApiConfiguration = swaggerJsdoc(options);
module.exports = openApiConfiguration;
