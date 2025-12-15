import request from 'supertest';
import app from "../src/app";
import db from "../src/drizzle/db"
import { userTable } from '../src/drizzle/schema'
import { eq } from 'drizzle-orm/pg-core/expressions'

describe('Users API Integration test', ()=>{
    let token:string

    const testAdminUser = {
        email:'',
        password:'password3'
    };
    it('should login a user and return a jwt', async()=>{
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: testAdminUser.email,
                password: testAdminUser.password
            });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');
        expect(res.body).toHaveProperty('userId');

        token = res.body.token

    })

    it('should access protected route with JWT and return users array', async()=>{
       const res =  await request(app
       ).get('/api/users').set('Authorization', `${token}`)

       expect(res.status).toBe(200);
       expect(Array.isArray(res.body)).toBe(true);
       expect(res.body.length).toBeGreaterThan(0)
    })

    afterAll(async()=>{
        await db.$client.end()
    })
})
