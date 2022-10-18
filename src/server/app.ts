import express, { Express } from 'express';
import mongoose from 'mongoose';
import { Server } from 'http';
import { ExeptionFilter } from './errors/exeption.filter';
import { ILogger } from './logger/logger.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import 'reflect-metadata';
import { IUserController } from './users/users.controller.interface';
import { ICollectionController } from './deck/deck.controller.interface';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.IUserController) private userController: IUserController,
    @inject(TYPES.ExeptionFilter) private exeptionFilter: ExeptionFilter,
    @inject(TYPES.ICollectionController) private collectionController: ICollectionController,
    ) {
		this.app = express();
		this.port = 5000;
	}

	useRoutes() {
		this.app.use('/users', this.userController.router);
    this.app.use('/collection', this.collectionController.router);
	}

  useExeptionFilters() {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }

	public async init() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
		this.useRoutes();
    this.useExeptionFilters();
    try {
      await mongoose.connect('mongodb+srv://Chebok:202Seldon@cluster0.h58165t.mongodb.net/mongo-node-app');
    } catch (e) {
      console.log(e);
    }
		this.server = this.app.listen(this.port);
		this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
	}
}