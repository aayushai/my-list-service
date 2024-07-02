import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('MyListController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/my-list/add (POST)', () => {
    return request(app.getHttpServer())
      .post('/my-list/add')
      .send({ userId: 'user1', itemId: 'movie1' })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('userId', 'user1');
        expect(res.body).toHaveProperty('itemId', 'movie1');
      });
  });

  it('/my-list/remove (POST)', async () => {
    await request(app.getHttpServer())
      .post('/my-list/add')
      .send({ userId: 'user1', itemId: 'movie1' })
      .expect(201);

    return request(app.getHttpServer())
      .post('/my-list/remove')
      .send({ userId: 'user1', itemId: 'movie1' })
      .expect(200);
  });

  it('/my-list/list (GET)', () => {
    return request(app.getHttpServer())
      .get('/my-list/list')
      .query({ userId: 'user1', page: '0', limit: '10' })
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Array);
      });
  });

  it('/my-list/add (POST) should not allow duplicates', async () => {
    await request(app.getHttpServer())
      .post('/my-list/add')
      .send({ userId: 'user1', itemId: 'movie1' })
      .expect(201);

    return request(app.getHttpServer())
      .post('/my-list/add')
      .send({ userId: 'user1', itemId: 'movie1' })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toBe('Item already in list');
      });
  });

  it('/my-list/list (GET) should paginate results', async () => {
    await request(app.getHttpServer())
      .post('/my-list/add')
      .send({ userId: 'user1', itemId: 'movie1' })
      .expect(201);

    await request(app.getHttpServer())
      .post('/my-list/add')
      .send({ userId: 'user1', itemId: 'movie2' })
      .expect(201);

    return request(app.getHttpServer())
      .get('/my-list/list')
      .query({ userId: 'user1', page: '0', limit: '1' })
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toBe(1);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
