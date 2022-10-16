import { injectable, inject } from 'inversify';
import bcrypt from 'bcryptjs';
import 'reflect-metadata';
import { TYPES } from '../types';
import { CreateUserDto } from './dto/create-user.dto';
import { IUsersRepository } from './users.repo.interface';

@injectable()
export class UsersService {

    constructor (@inject(TYPES.UsersRepository) private userRepository: IUsersRepository) { }

    async createUser(dto: CreateUserDto) {
      const { username, password } = dto;
      // const candidate = await this.userRepository.findOne({ username });
      const hashPassword = bcrypt.hashSync(password, 7);
      const user = await this.userRepository.create({ username, password, roles: ['USER'] });
      console.log(user);
      const user2 = await this.userRepository.save(user);
      console.log(user2);
      return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    }

    async getUserByName(name: string) {
        const user = await this.userRepository.findOne({where: {name}, include: {all: true}});
        return user;
    }
}