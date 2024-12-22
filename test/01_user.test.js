const request = require('supertest');
const app = require('../server');
const { userRegister, 
        userLogin, 
        userUpdate, 
        userChangePassword,
        userForgotPassword } = require('../test/userHelpers.js');


describe("User this test of the /api/users", () => {

    describe("Fisrts route for api/users", () => {
        test("should return 404", async () => {
            const response = await request(app)
            .get('/api/users')
            .send();
            expect(response.statusCode).toEqual(404);
        });
    })
    
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
    
    describe('/api/users/login', () => {
        test("Should return 200 Ok", async () => {
            const response = await request(app)
            .post('/api/users/login')
            .send(userLogin);
            expect(response.statusCode).toEqual(200);
        });

        test("Should return 404", async () => {
            const response = await request(app)
            .post('/api/users/login')
            .send();
            expect(response.statusCode).toEqual(404);
        });
    })

    describe('/api/users/logout', () => {
        test('/api/users/logout', async () => {
            const response = await request(app)
            .get('/api/users/logout')
            .send();
            expect(response.statusCode).toEqual(200);
        });
    })
    
    describe('/api/users/getuser', () => {
        test("Should return 401", async () => {
            const response = await request(app)
            .get('/api/users/getuser')
            .send();
            expect(response.statusCode).toEqual(401);
        });

        // Falta el test de get user con status 200 falla por la autenticacion
        

    })

    describe("/api/users/loggedin", () => {
        test("Should return 200", async () => {
            const response = await request(app)
            .get('/api/users/loggedin')
            .send();
            expect(response.statusCode).toEqual(200);
        });
    })

    describe("/api/users/updateuser", () => {
        test("Should return 401", async () => {
            const response = await request(app)
            .patch("/api/users/updateuser")
            .send();
            expect(response.statusCode).toEqual(401);
        });

        // Faltar updateUser con status 200 falla debido al token

    })

    describe("/api/users/changepassword", () => {
        test("Should return 401", async () => {
            const response = await request(app)
            .patch("/api/users/changepassword")
            .send();
            expect(response.statusCode).toBe(401);
        });

         // Faltar changePassword con status 200 falla debido al token


    })

    describe("/api/users/forgotpassword", () => {
        test("Should return 404", async () => {
            const response = await request(app)
            .patch("/api/users/forgotpassword")
            .send();
            expect(response.statusCode).toBe(404);
        });

         // Faltar forgotPassword con status 200 falla debido al token


    })

    describe("/api/users/resetpassword", () => {
        test("Should return 404", async () => {
            const response = await request(app)
            .patch("/api/users/resetpassword")
            .send();
            expect(response.statusCode).toBe(404);

             // Faltar resetPassword con status 200 falla debido al token

        });
    })
});
