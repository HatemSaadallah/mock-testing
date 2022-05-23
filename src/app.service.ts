import { Inject, Injectable } from '@nestjs/common';
import { Apps } from './app.model';
import { REPOSITORIES } from './common/constants';
import { GetUsersDto } from './dto/get-users.dto';

@Injectable()
export class AppService {
  // Add repository
  constructor(
    @Inject(REPOSITORIES.APP_REPOSITORY)
    private readonly appRepository: typeof Apps,
  ) {}
  getUsers(): Promise<GetUsersDto[]> {
    return this.appRepository.findAll({
      attributes: ['name', 'age'],
    });
  }

  createUser(body: any): Promise<any> {
    return this.appRepository.create({
      name: body.name,
      age: body.age,
    });
  }
}
