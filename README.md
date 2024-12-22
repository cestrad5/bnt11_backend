# API BONETTO

This project is a backend system developed using Node.js and Express to manage and handle various business operations including user management, product management, order processing, and contact management.

## Project Structure
The project is structured into different folders and files:

- Middleware Folder: Contains files for handling authorization, error handling, and data validation.
- Models Folder: Contains data models for users, orders, products, and tokens.
- Routes Folder: Contains files for defining routes and controllers for the different entities in the system.
- Utils Folder: Contains utility files such as file upload management and email sending.
- server.js File: Configures and runs the application server.

## Technologies Used
- Node.js
- Express
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- Nodemailer
- Multer
- Swagger UI
- Others

## Installation
1. Clone the repository.
2. Make sure you have Node.js and MongoDB installed on your system.
3. Run `npm install` to install all the necessary dependencies.
4. Make sure to have all the required environment variables configured.

### Database Configuration
The dbConnect.js file in the config folder is used to establish the connection with the MongoDB database. Below is the relevant code:

#### Example
```
const dbconnect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
    });
    const url = `${connection.connection.host}:${connection.connection.port}`;

  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
     }
};
```

### Controllers
#### Contact Controller
The `contactController.js` file in the controllers folder is responsible for handling the contact functionality. It includes the logic for sending emails when a user submits the contact form. It also performs validation of the user and message before sending the email.

#### Order Controller
The `orderController.js` file in the controllers folder is responsible for managing orders. It includes the logic for creating new orders, retrieving all orders, retrieving a specific order, updating an order, and deleting an order.

#### Product Controller
The `productController.js` file in the controllers folder is responsible for managing products. It includes the logic for creating new products, retrieving all products, retrieving a specific product, updating a product, and deleting a product.

#### User Controller
The `userController.js` file in the controllers folder is responsible for managing users. It includes the logic for registering new users, logging in, logging out, getting user data, checking login status, updating user information, changing the password, requesting password reset, and resetting the password.

### Documentation
To run the swagger documentation you have to run the backend and put the following in the browser
```
http://localhost:5000/documentation
```

### Middlewares
The middleware is a directory to strengthen the security of your API, they are help functions but they go with security.

### Examples
errorMiddleware
```
const errorHandler = (err, req, res, next) => {
    // ... (code of middleware error handling)
};

module.exports = errorHandler;

```

userMiddlewareValidators
```
const userRegisterValidator = (req, res, next) => {
    // ... (rest code)
};

const userLoginValidator = (req, res, next) => {
    // ... (rest code)
};

module.exports = {
    userRegisterValidator,
    userLoginValidator,
};

```

### Models

Models are the structure of the database

#### Example
```
const tokenSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user',
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
});

const Token = mongoose.model('Token', tokenSchema);
module.exports = Token;
```

### Routes

The routes are those responsible for giving the values ​​or http requests that the user is requesting when entering said route, with their respective methods.

- POST
- GET
- PUT
- DELETE

Example one route

```
router.post('/', protect, contactUS);
```

### Test
The tests are those that are used to know if the program works well. Both good and bad tests are done to see the functionality of both sides.

example

```
describe("/api/users/register", () => {
        test("should return 200", async () => {
            const response = await request(app)
            .post('/api/users/register')
            .send(userRegister);
            expect(response.statusCode).toEqual(200);
        }, 10000);
    
        test("should return 404", async () => {
            const response = await request(app)
            .post('/api/users/register')
            .send();
            expect(response.statusCode).toEqual(404);
        }, 10000); 
    })
```

### Uploads
The uploads folder is only storage, here the respective images of the products will be stored
<hr>

### Utils
This utilities folder is for adding functions that can be useful to us in the future or that are being used at that moment to do such a thing. In addition, the separation is done so that the code is cleaner and more readable.

### Server
It is the main file where our server is and where the entire API structure will work.

```
const app = express();

app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/contactus', contactRoute);
app.use('/api/orders', orderRoute);

app.listen(port, () => {
    console.log(`Server Running on port ${port}`);
});

module.exports = app;
```

For run this api is necesary add the next command

`npm run dev`

## AUTHORS

- Carlos Alfredo Montoya 
  
    alfredomontoyacorreo2@gmail.com

- Kevin Muñoz

    kevinmunozb04@gmail.com