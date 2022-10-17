import { NextFunction, Request, Response } from "express";
import { ICollectionController } from "./coll.controller.interface";
import { inject, injectable } from "inversify";
import { BaseController } from "../common/base.controller";
import { HTTPError } from "../errors/http-error.class";
import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../types";
import 'reflect-metadata';
import { CollectionService } from "./coll.service";

@injectable()
export class CollectionController extends BaseController implements ICollectionController {
  constructor(@inject(TYPES.ILogger) private loggerService: ILogger, @inject(TYPES.CollectionService) private collectionService: CollectionService) {
    super(loggerService);
    this.bindRoutes([
      {path: '/:userId', func: this.updateCollection, method: 'post' },
      {path: '/:userId', func: this.getCollection, method: 'get' }
    ])
  }

  async updateCollection(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;
    const { cardsToAdd } = req.body;
    const coll = await this.collectionService.updateCollectionByUserId(userId, cardsToAdd);
    this.ok(res, coll);
  }

  async getCollection(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;
    const coll = await this.collectionService.getCollectionByUserId(userId);
    this.ok(res, coll);
  }
}