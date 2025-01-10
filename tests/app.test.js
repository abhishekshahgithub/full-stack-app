const request = require('supertest');
const app = require('../app');

describe('GET /data', () => {
    it('responds with status 200 and loads data', async () => {
        const response = await request(app).get('/data');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
    });

    it('responds with status 500 when data loading fails', async () => {
        jest.spyOn(require('axios'), 'get').mockRejectedValue(new Error('Load Failed!'));
        
        const response = await request(app).get('/data');
        expect(response.status).toBe(500);
    });
});
