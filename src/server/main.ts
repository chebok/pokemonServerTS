import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { CollectionController } from './deck/deck.controller';
import { ICollectionController } from './deck/deck.controller.interface';
import { CollectionRepository } from './deck/deck.repo';
import { ICollectionRepository } from './deck/deck.repo.interface';
import { CollectionService } from './deck/deck.service';
import { ExeptionFilter } from './errors/exeption.filter';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { RolesRepository } from './roles/roles.repo';
import { IRolesRepository } from './roles/roles.repo.interface';
import { RolesService } from './roles/roles.service';
import { TYPES } from './types';
import { UserController } from './users/users.controller';
import { IUserController } from './users/users.controller.interface';
import { UsersRepository } from './users/users.repo';
import { UsersService } from './users/users.service';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService);
  bind<IUserController>(TYPES.IUserController).to(UserController);
  bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
  bind<App>(TYPES.Application).to(App);
  bind<UsersRepository>(TYPES.UsersRepository).to(UsersRepository);
  bind<UsersService>(TYPES.UsersService).to(UsersService);
  bind<IRolesRepository>(TYPES.IRolesRepository).to(RolesRepository);
  bind<RolesService>(TYPES.RolesService).to(RolesService);
  bind<ICollectionController>(TYPES.ICollectionController).to(CollectionController);
  bind<ICollectionRepository>(TYPES.ICollectionRepository).to(CollectionRepository);
  bind<CollectionService>(TYPES.CollectionService).to(CollectionService);
});

function bootstrap() {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.Application)
  app.init();
  return { app, appContainer };
};

export const { app, appContainer } = bootstrap();
