import request from 'supertest'
import app from "../src/app"
import db from "../src/drizzle/db"
import { userTable } from '../src/drizzle/schema'
import { eq } from 'drizzle-orm/pg-core/expressions'


describe('Auth API Integretion test', ()=>{

    const testUser = {
        fullName: 'testUser',
        email:'testuser@gmail.com',
        password:'password123'
    }

    it('Should register a user', async()=>{
      const res = await request(app).post('/api/auth/register').send(testUser);

      expect(res.status).toBe(201)
      expect(res.body).toHaveProperty('message')
      expect(res.body.message).toBe("User created successfully😎😎")
    })

    it('should login a user and return a jwt', async()=>{
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: testUser.email,
                password: testUser.password
            });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');
        expect(res.body).toHaveProperty('userId');

    })

    afterAll(async()=>{
        await db.delete(userTable).where(eq(userTable.email,testUser.email));
        await db.$client.end()
    })

})