import Card from '../cards/card.js';

export type oneCategoryFromBd = {
  categoryId: string;
  categoryTitle: string;
  type: string;
  cardId: string | null;
  cardTitle: string | null;
  imageSrc: string | null;
  description: string | null;
  link: string | null;
  event_date: string | null;
  refCategoryId: string | null;
};

export type oneCategoryFromBd2 = oneCategoryFromBd[]


export type oneCategoryResponse = {
  categoryId: string;
  categoryTitle: string;
  type: string;
  cards: Card[];
};


