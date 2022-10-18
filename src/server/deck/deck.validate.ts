import { ICollectionModel } from "./deck.model";

const collectionValidate = (collection: ICollectionModel, cardsToAdd: number[]) => {
  const existing = cardsToAdd.every((card) => card >= 1 && card <= 151);
  if (!existing) {
    return 'Покемонов под такими номерами нет';
  }
  collection.cards = [...new Set([...collection.cards, ...cardsToAdd])]
    .sort((a, b) => a - b);
};

export default collectionValidate;
