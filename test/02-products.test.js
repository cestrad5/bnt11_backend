const request = require('supertest');
const app = require('../server');
const { createProduct, updateProduct } = require('../test/productsHelper.js')

describe('Product Routes', () => {

  describe("First route of /api/products", () => {
    test('should create with error a new product', async () => {
      const res = await request(app)
        .post('/products')
        .send();
      expect(res.statusCode).toBe(404);
    });

  })

  describe("/products", () => {
    test('should create a new product', async () => {
      const res = await request(app)
        .post('/products')
        .send();
      expect(res.statusCode).toBe(404);
    });

    // Falta status code 200 organizar el body y token user del producto
    
  })

  describe("/products", () => {
    test('should get all products', async () => {
      const res = await request(app)
      .get('/products')
      .send();
      expect(res.statusCode).toEqual(404);
    });

   // Falta status code 200 obtener producto el token del producto
    
  })

  describe("/products/:id", () => {
    it('should get a product by ID', async () => {
      const res = await request(app)
      .get('/products/:id')
      .send();
      expect(res.statusCode).toEqual(404);
    });

    // Falta status code 200 obtener producto el token y id del producto
    
    
  })

  describe("/products/:id", () => {
    it('should update a product', async () => {
      const res = await request(app)
        .patch('/products/:id')
        .send();
      expect(res.statusCode).toEqual(404);
    });

    // Falta status code 200 actualizar producto se necesita token y id
    
    
  })

  describe("/products/:id", () => {
    it('should delete a product by ID', async () => {
      const res = await request(app)
      .delete('/products/:id')
      .send();
      expect(res.statusCode).toEqual(404);
    });
    
    // Falta status code 200 eliminar producto se necesita token y id


  })
});
