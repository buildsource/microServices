import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  create(@Body() user: User) {
    return this.userService.create(user);
  }

  @Get()
  findAll(): Observable<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Observable<User> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() { name, email, phone, password }: User,
  ) {
    const payload: User = {
      id,
      name,
      email,
      phone,
      password,
    };

    return this.userService.update(payload);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }

  @Patch(':id/activate')
  activate(@Param('id') id: number) {
    return this.userService.activate(id);
  }

  @Patch(':id/inactivate')
  inactivate(@Param('id') id: number) {
    return this.userService.inactivate(id);
  }
}
