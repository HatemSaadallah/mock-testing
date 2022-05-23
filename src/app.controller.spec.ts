import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './db/database.module';
import { GetUsersDto } from './dto/get-users.dto';

describe('AppController', () => {
  let controller: AppController;
  let service: AppService;

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
    controller = module.get<AppController>(AppController);
    service = module.get<AppService>(AppService);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('createUser', () => {
    it('should return an array of usernames', async () => {
      const body = {
        name: 'ma',
        age: 20,
      };
      const result = await controller.createUser(body);

      expect(result).toEqual([
        {
          name: body.name,
          age: body.age,
        },
      ]);
    });
  });

  describe('getUsers', () => {
    it('should return an array of usernames', async () => {
      const body = {
        name: 'ma',
        age: 20,
      };

      await expect(controller.getUsers()).resolves.toEqual([body]);
    });
  });
});
