import Category from '../../types/category/category.js';
import Card from '../../types/cards/card.js';
import { BadRequest, ConflictError, NotFound } from '../../middleware/generalMiddleware/errorMessage.js';

export function categoryValidate(
  data: unknown,
  messeg: string,
): asserts data is unknown[] {
  if (!Array.isArray(data)) {
    console.error(`Некоректный формат данных: ${data}`);
    throw new BadRequest(messeg);
  }
}

export function checkDataEmpty(data: unknown, messeg: string): void {
  if (!data) {
    throw new NotFound(messeg);
  }
}
