require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const contactRoute = require('./routes/contactRoute');
const orderRoute = require('./routes/orderRoute');
const errorHandler = require('./middleWare/errorMiddleware');
const swaggerUI = require('swagger-ui-express')
const cookieParser = require('cookie-parser');
const path = require('path');
const dbconnect = require('./config/dbConnect');
const openApiConfiguration = require('./docs/swagger');

const app = express();

const URL = process.env.FRONTEND_URL;
const NODE_ENV = process.env.NODE_ENV || 'development';

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOptions = {
    origin: [URL, 'https://inventorymaster.vercel.app', 'http://127.0.0.1:5173'],
    credentials: true,
};

app.use(cors(corsOptions));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Content-Security-Policy
app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
      },
    })
  );

//Routes Middlewares
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/contactus', contactRoute);
app.use('/api/orders', orderRoute);

//Routes
app.get('/', (req, res) => {
    res.send('Home page');
});

/**
 * Defined routes of documentation
 */
app.use('/documentation', 
    swaggerUI.serve, 
    swaggerUI.setup(openApiConfiguration)
)

//Error Middlewares
app.use(errorHandler);

//connect to DB and start server
const port = process.env.PORT || 5000;
dbconnect()

if(NODE_ENV !== 'test'){
  app.listen(port, () => {
    console.log(`Server Running on port ${port}`);
  });
};

module.exports = app;
