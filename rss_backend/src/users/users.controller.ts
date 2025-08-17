import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserInterface } from '../dtos/user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUser(): { message: string } {
    return { message: 'user works' };
  }

  @Post('create-user')
  async createUser(
    @Body() createUserObject: UserInterface,
  ): Promise<UserInterface> {
    return await this.userService.createUser(createUserObject);
    //const response_object:UserInterface =
      //await this.userService.createUser(createUserObject);
    //return response_object;
  }
}
