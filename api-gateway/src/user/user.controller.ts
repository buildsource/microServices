import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Headers,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createUserDto: CreateUserDto,
    @Headers('Authorization') auth: string,
  ) {
    return this.userService.create(auth, createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Headers('Authorization') auth: string) {
    return this.userService.findAll(auth);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Headers('Authorization') auth: string, @Param('id') id: string) {
    return this.userService.findOne(auth, id);
  }

  @Put(':id')
  update(
    @Headers('Authorization') auth: string,
    @Param('id') id: string,
    @Body() updateUserDto: Partial<UpdateUserDto>,
  ) {
    return this.userService.update(auth, id, updateUserDto);
  }

  @Delete(':id')
  remove(@Headers('Authorization') auth: string, @Param('id') id: string) {
    return this.userService.remove(auth, id);
  }
}
