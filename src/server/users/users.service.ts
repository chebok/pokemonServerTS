import { injectable, inject } from 'inversify';
import bcrypt from 'bcryptjs';
import 'reflect-metadata';
import { TYPES } from '../types';
import { CreateUserDto } from './dto/create-user.dto';
import { IUsersRepository } from './users.repo.interface';
import { RolesService } from '../roles/roles.service';

@injectable()
export class UsersService {

    constructor (
      @inject(TYPES.UsersRepository) private usersRepository: IUsersRepository,
      @inject(TYPES.RolesService) private rolesService: RolesService,
    ) { }

    async createUser(dto: CreateUserDto) {
      const { username, password } = dto;
      // const candidate = await this.userRepository.findOne({ username });
      const hashPassword = bcrypt.hashSync(password, 7);
      const { value: role } = await this.rolesService.getByValue('USER');
      const user = await this.usersRepository.create({ username, password, roles: [role] });
      console.log(user);
      return user;
    }

    async getAllUsers() {
        const users = await this.usersRepository.findAll({include: {all: true}});
        return users;
    }

    async getUserByName(name: string) {
        const user = await this.usersRepository.findOne({where: {name}, include: {all: true}});
        return user;
    }
}