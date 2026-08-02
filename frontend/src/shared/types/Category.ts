import { Card } from "./Card";

export interface Category {
  categoryId: string;
  categoryTitle: string;
  type: string;
}

export interface CategoryWithCards extends Category {
  cards: Card[];
}
