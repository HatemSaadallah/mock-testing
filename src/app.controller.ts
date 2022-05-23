import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { GetUsersDto } from './dto/get-users.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getUsers(): Promise<GetUsersDto[]> {
    return this.appService.getUsers();
  }

  @Post()
  createUser(@Body() body: any): Promise<any> {
    return this.appService.createUser(body);
  }
}
