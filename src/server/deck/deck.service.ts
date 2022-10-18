import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../types';
import { CreateDeckDto } from './dto/create-deck.dto';
import { IDeckRepository } from './deck.repo.interface';
import { ICollectionModel } from './deck.model';
import findCards from '../../cards/findCards';
import collectionValidate from './deck.validate';

@injectable()
export class CollectionService {

    constructor (
      @inject(TYPES.ICollectionRepository) private collectionRepository: ICollectionRepository,
    ) { }

    async createCollection(dto: CreateCollectionDto) {
      const { userId, cards } = dto;
      const collection = await this.collectionRepository.create({ userId, cards });
      return collection;
    }

    async updateCollectionByUserId(userId: string, cardsToAdd: number[]) {
      const collection: ICollectionModel = await this.collectionRepository.findOne({ userId });
      const errors = collectionValidate(collection, cardsToAdd);
      if (errors) {
        return [errors];
      }
      await collection.save();
      return [null, collection];
    }

    async getCollectionByUserId(userId: string) {
      const collection: ICollectionModel = await this.collectionRepository.findOne({ userId });
      const cardsToSend = await findCards(collection.cards);
      return  cardsToSend; 
    }
}