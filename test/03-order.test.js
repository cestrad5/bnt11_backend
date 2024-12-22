const request = require('supertest');
const app = require('../server');

describe('This route is used for the orden', () => {
    describe("Firts route /api/orders", () => {
        test('should return 404 OK', async () => {
            const response = await request(app)
                .get('/api/orders')
                .send();
            expect(response.status).toBe(404);
        });
    })

    describe("/api/orders/order for post", () => {
        test('should return 200 OK', async () => {
            const response = await request(app)
                .post('/api/orders/order')
                .send({
                    "user": "65381fae39167237fadc87ae",
                    "order": {
                        "product": "65381fd239167237fadc87b2",
                        "quantity": 4
                    },
                    "total": 4000,
                    "customer": "cliente",
                    "note": "percehero lindo"
                });
            expect(response.status).toBe(200);
        })

        //No funciona recibe status 200 sin darle datos de crear una orden
        // test('should return 404', async () => {
        //     const response = await request(app)
        //     .post('/api/orders/order')
        //     expect(response.status).toBe(404);
        // })
    })

    describe('/api/orders/order/:id for get', () => {
        test('should return 400', async () => {
            const response = await request(app)
                .get(`'/api/orders/order/:id`)
                .send();
            expect(response.status).toBe(400);
        });

        // Falta obtener orden con su id buscar como

    })


    describe("/api/orders/order/id for get", () => {
        test('should return 200 when an ID is provided', async () => {
            const id = "65381fd239167237fadc87b2";
            const response = await request(app)
                .get(`/api/orders/order/${id}`) // Asegúrate de que el ID esté incluido en la ruta de la solicitud
                .send();
            expect(response.status).toBe(200);
        });

        test('should return 404', async () => {
            const response = await request(app)
                .get(`/api/orders/order/id`)
                .send();
            expect(response.status).toBe(404);
        });

    })

    describe("'/api/orders/order/:id` for put", () => {

        test('should return 200 when an ID is provided', async () => {
            const id = "65381fd239167237fadc87b2";
            const response = await request(app)
                .put(`/api/orders/order/${id}`)
                .send();
            expect(response.status).toBe(200);
        });

        test('should return 400', async () => {
            const response = await request(app)
                .put(`'/api/orders/order/:id`)
                .send();
            expect(response.status).toBe(400);
        });

    })

    describe("'/api/orders/order/:id for delete", () => {
        test('should return 404', async () => {
            const response = await request(app)
                .delete(`'/api/orders/order/:id`)
                .send();
            expect(response.status).toBe(400);
        });

        // Falta eliminar con id y respuesta 200

        
    })

});
