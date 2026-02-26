const request = require('supertest');
const app = require('../src/app'); // Importa tu app de Express
const mongoose = require('mongoose');

describe('Pruebas Unitarias - CRUD de Productos', () => {
    
    // Prueba para el punto F.1: Verificar funcionamiento de rutas
    test('Debe obtener todos los productos (GET /api/products)', async () => {
        const res = await request(app).get('/api/products');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    // Prueba para el punto D: Verificar protección de rutas
    test('Debe denegar acceso a creación sin token JWT', async () => {
        const res = await request(app)
            .post('/api/products')
            .send({ nombre: "Producto Test", precio: 100 });
        
        // Esperamos un 401 (No autorizado) porque no enviamos token
        expect(res.statusCode).toBe(401);
    });
});

// Cerramos la conexión para que Jest termine correctamente
afterAll(async () => {
    await mongoose.connection.close();
});