require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const path = require('path');
const swaggerUI = require('swagger-ui-express');

// Rutas
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const contactRoute = require('./routes/contactRoute');
const orderRoute = require('./routes/orderRoute');

// Middlewares personalizados
const errorHandler = require('./middleWare/errorMiddleware');
const dbconnect = require('./config/dbConnect');
const openApiConfiguration = require('./docs/swagger');

const app = express();

const URL = process.env.FRONTEND_URL;
const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 5000;

// ** Middlewares **

// Configuración de CORS
const corsOptions = {
  origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    exposedHeaders: ['set-cookie']
};
app.use(cors(corsOptions));

// Logs para depuración
app.use((req, res, next) => {
    console.log('Origin:', req.headers.origin);
    console.log('Method:', req.method);
    console.log('Path:', req.path);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

// Helmet para seguridad
app.use(
  helmet.contentSecurityPolicy({
      directives: {
          defaultSrc: ["'self'"],
          connectSrc: ["'self'", URL, 'https://bnt11-frontend.vercel.app'],  // Add the new domain
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:'],
          objectSrc: ["'none'"],
      },
  })
);

// Otros middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ** Rutas principales **
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/contactus', contactRoute);
app.use('/api/orders', orderRoute);

// Ruta base
app.get('/', (req, res) => {
    res.send('Home page');
});

// Documentación Swagger
app.use(
    '/documentation',
    swaggerUI.serve,
    swaggerUI.setup(openApiConfiguration)
);

// Middleware de manejo de errores
app.use(errorHandler);

// ** Conexión a la base de datos y servidor **
dbconnect();

if (NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server Running on port ${PORT}`);
    });
}

module.exports = app;
