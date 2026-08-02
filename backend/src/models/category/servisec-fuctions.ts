import Category from '../../types/category/category.js';
import { oneCategoryFromBd,oneCategoryResponse } from '../../types/category/oneCateryResponse.js';
import Card from '../../types/cards/card.js';
import { isCard } from '../cards/servisec-fuctions.js';

export const isCategory = (data: unknown): data is Category => {
  const category = data as Category;
  return Boolean(
    category &&
    typeof category === 'object' &&
    category.categoryId &&
    category.type &&
    category.categoryTitle,
  );
};

export const isCategoryWithCards = (
  data: unknown,
): data is oneCategoryFromBd => {
  const category = data as oneCategoryFromBd;

  return Boolean(
    category &&
    category.categoryId &&
    category.type &&
    category.categoryTitle &&
    (category.refCategoryId || category.refCategoryId === null) &&
    (category.cardId || category.cardId === null) &&
    (category.cardTitle || category.cardTitle === null) &&
    (category.description || category.description === null) &&
    (category.imageSrc || category.imageSrc === null) &&
    (category.event_date || category.event_date === null) &&
    (category.link || category.link === null),
  );
};

export const filterByCategory = (date: unknown[]) => {
  return date
    .map((category) => {
      if (isCategory(category)) {
        return category;
      }
      return undefined;
    })
    .filter((category): category is Category => category !== undefined);
};

export const filterByCategorySpecial = (
  date: unknown[],
): oneCategoryFromBd[] => {
  return date
    .map((category) => {
      if (isCategoryWithCards(category)) {
        return category;
      }

      return undefined;
    })
    .filter(
      (category): category is oneCategoryFromBd => category !== undefined,
    );
};

export const mapingOneCategory = (
  category: oneCategoryFromBd[],
): oneCategoryResponse => {
  console.log("ddsdsd")
  let oneCategoryWithCards: oneCategoryResponse = {
    categoryId: category[0]!.categoryId,
    categoryTitle: category[0]!.categoryTitle,
    type: category[0]!.type,
    cards: [],
  };
  
  for (let oneObject of category) {
    const { categoryId, categoryTitle, type, ...oneCard } = oneObject;
    if (isCard(oneCard)) {
      oneCategoryWithCards.cards.push(oneCard);
    }
  }
    
    return oneCategoryWithCards;
};
