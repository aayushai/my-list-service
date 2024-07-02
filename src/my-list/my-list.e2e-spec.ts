import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MyListModule } from './my-list.module';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Model } from 'mongoose';
import { MyList, MyListSchema } from '../schemas/mylist.schema';
import { User, UserSchema } from '../schemas/user.schema';
import { Movie, MovieSchema } from '../schemas/movie.schema';
import { TVShow, TVShowSchema } from '../schemas/tvshow.schema';

describe('MyListController (e2e)', () => {
  let app: INestApplication;
  let mongod: MongoMemoryServer;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        MongooseModule.forRoot(uri),
        MyListModule,
        MongooseModule.forFeature([{ name: MyList.name, schema: MyListSchema }]),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
        MongooseModule.forFeature([{ name: TVShow.name, schema: TVShowSchema }]),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Seed initial data
    const userModel = moduleFixture.get<Model<User>>('UserModel');
    const movieModel = moduleFixture.get<Model<Movie>>('MovieModel');
    const tvShowModel = moduleFixture.get<Model<TVShow>>('TVShowModel');
    const myListModel = moduleFixture.get<Model<MyList>>('MyListModel');

    await userModel.insertMany([
      { id: 'user1', username: 'user1', preferences: { favoriteGenres: ['Action', 'Comedy'], dislikedGenres: ['Horror'] }, watchHistory: [] },
      { id: 'user2', username: 'user2', preferences: { favoriteGenres: ['Drama', 'Romance'], dislikedGenres: ['SciFi'] }, watchHistory: [] },
      { id: 'user3', username: 'user3', preferences: { favoriteGenres: ['Fantasy', 'Horror'], dislikedGenres: ['Comedy'] }, watchHistory: [] },
    ]);

    await movieModel.insertMany([
      { id: 'movie1', title: 'Action Movie', description: 'An action-packed movie', genres: ['Action'], releaseDate: new Date('2024-01-01'), director: 'Director A', actors: ['Actor A', 'Actor B'] },
      { id: 'movie2', title: 'Romantic Drama', description: 'A touching romantic drama', genres: ['Romance', 'Drama'], releaseDate: new Date('2024-02-01'), director: 'Director B', actors: ['Actor C', 'Actor D'] },
      { id: 'movie3', title: 'Sci-Fi Adventure', description: 'An adventurous sci-fi movie', genres: ['SciFi', 'Adventure'], releaseDate: new Date('2024-03-01'), director: 'Director C', actors: ['Actor E', 'Actor F'] },
    ]);

    await tvShowModel.insertMany([
      { id: 'tvshow1', title: 'Comedy Show', description: 'A hilarious TV show', genres: ['Comedy'], episodes: [{ episodeNumber: 1, seasonNumber: 1, releaseDate: new Date('2024-01-01'), director: 'Director B', actors: ['Actor C', 'Actor D'] }, { episodeNumber: 2, seasonNumber: 1, releaseDate: new Date('2024-02-01'), director: 'Director B', actors: ['Actor C', 'Actor D'] }] },
      { id: 'tvshow2', title: 'Fantasy Series', description: 'A magical fantasy series', genres: ['Fantasy'], episodes: [{ episodeNumber: 1, seasonNumber: 1, releaseDate: new Date('2024-01-01'), director: 'Director E', actors: ['Actor G', 'Actor H'] }] },
      { id: 'tvshow3', title: 'Horror Anthology', description: 'A chilling horror anthology', genres: ['Horror'], episodes: [{ episodeNumber: 1, seasonNumber: 1, releaseDate: new Date('2024-01-01'), director: 'Director F', actors: ['Actor I', 'Actor J'] }] },
    ]);

    await myListModel.insertMany([
      { userId: 'user1', itemId: 'movie1' },
      { userId: 'user1', itemId: 'tvshow1' },
      { userId: 'user2', itemId: 'movie2' },
      { userId: 'user3', itemId: 'tvshow3' },
    ]);
  });

  afterAll(async () => {
    await app.close();
    await mongod.stop();
  });

  it('/my-list/add (POST)', () => {
    return request(app.getHttpServer())
      .post('/my-list/add')
      .send({ userId: 'user1', itemId: 'movie2' })
      .expect(201)
      .expect((res) => {
        expect(res.body.userId).toBe('user1');
        expect(res.body.itemId).toBe('movie2');
      });
  });

  it('/my-list/remove (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/my-list/remove')
      .query({ userId: 'user1', itemId: 'movie1' })
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeTruthy();
      });
  });

  it('/my-list/list (GET)', () => {
    return request(app.getHttpServer())
      .get('/my-list/list')
      .query({ userId: 'user1', page: 1, limit: 10 })
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Array);
      });
  });

  it('/my-list/add (POST) should not allow duplicates', () => {
    return request(app.getHttpServer())
      .post('/my-list/add')
      .send({ userId: 'user1', itemId: 'movie1' })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toBe('Item already in list');
      });
  });

  it('/my-list/list (GET) should paginate results', () => {
    return request(app.getHttpServer())
      .get('/my-list/list')
      .query({ userId: 'user1', page: 1, limit: 1 })
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toBe(1);
      });
  });
});
