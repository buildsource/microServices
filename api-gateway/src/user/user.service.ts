import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly http: HttpService) {}

  async create(auth: string, createUserDto: CreateUserDto) {
    try {
      this.http.axiosRef.defaults.headers.common['Authorization'] = auth;

      return await lastValueFrom(
        this.http.post(
          `${process.env.KEY_CLOAK_URI}/auth/admin/realms/microservices/users`,
          createUserDto,
        ),
      );
    } catch (err) {
      return err;
    }
  }

  async findAll(auth: string): Promise<UserDto[]> {
    try {
      this.http.axiosRef.defaults.headers.common['Authorization'] = auth;

      const response = await lastValueFrom(
        this.http.get(
          `${process.env.KEY_CLOAK_URI}/auth/admin/realms/microservices/users`,
        ),
      );

      const users: UserDto[] = response.data;

      return users;
    } catch (err) {
      return err;
    }
  }

  async findOne(auth: string, id: string): Promise<UserDto> {
    try {
      this.http.axiosRef.defaults.headers.common['Authorization'] = auth;

      const response = await lastValueFrom(
        this.http.get(
          `${process.env.KEY_CLOAK_URI}/auth/admin/realms/microservices/users/${id}`,
        ),
      );

      const user: UserDto = response.data;

      return user;
    } catch (err) {
      return err;
    }
  }

  async update(
    auth: string,
    id: string,
    updateUserDto: Partial<UpdateUserDto>,
  ) {
    try {
      this.http.axiosRef.defaults.headers.common['Authorization'] = auth;

      const response = await lastValueFrom(
        this.http.put(
          `${process.env.KEY_CLOAK_URI}/auth/admin/realms/microservices/users/${id}`,
          updateUserDto,
        ),
      );

      return response.data;
    } catch (err) {
      return err;
    }
  }

  async remove(auth: string, id: string) {
    try {
      this.http.axiosRef.defaults.headers.common['Authorization'] = auth;

      const response = await lastValueFrom(
        this.http.delete(
          `${process.env.KEY_CLOAK_URI}/auth/admin/realms/microservices/users/${id}`,
        ),
      );

      return response.data;
    } catch (err) {
      return err;
    }
  }
}
