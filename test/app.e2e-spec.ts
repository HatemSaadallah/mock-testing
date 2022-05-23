import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Module } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AppService } from '../src/app.service';
import { DatabaseModule } from '../src/db/database.module';
import { expect, describe, it, jest, afterAll } from '@jest/globals';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '../src/app.controller';
import { GetUsersDto } from 'src/dto/get-users.dto';

describe('AppController (e2e)', () => {
  // Mock Database Connection
  let app: INestApplication;
  let service: AppService;
  let connection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, ConfigModule.forRoot({ isGlobal: true })],
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getUsers: jest.fn().mockImplementation(() =>
              Promise.resolve([
                {
                  name: 'ma',
                  age: 20,
                },
              ]),
            ),
            createUser: jest.fn().mockImplementation((body: GetUsersDto) =>
              Promise.resolve([
                {
                  name: body.name,
                  age: body.age,
                },
              ]),
            ),
          },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  // Post
  it('/ (POST)', async () => {
    const body = {
      name: 'ma',
      age: 20,
    };
    const result = await request(app.getHttpServer()).post('/').send(body);

    expect(result.status).toBe(201);
    expect(result.body).toEqual([
      {
        name: body.name,
        age: body.age,
      },
    ]);
  });

  // Get
  it('/ (GET)', async () => {
    const result = await request(app.getHttpServer()).get('/');

    expect(result.status).toBe(200);
    expect(result.body).toEqual([
      {
        name: 'ma',
        age: 20,
      },
    ]);
  });
});
