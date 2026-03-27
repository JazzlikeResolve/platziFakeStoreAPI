import { ProductPayLoad } from '../types/product';
import { faker } from '@faker-js/faker';

export const createProductData = (): ProductPayLoad => {
  // Valid category IDs in Platzi Fake Store API are usually 1–5
  const validCategoryIds = [1, 2, 3, 4, 5, 6];
  const categoryId = faker.helpers.arrayElement(validCategoryIds);

  return {
    title: faker.commerce.productName(),
    price: faker.number.int({ min: 10, max: 100 }),
    description: faker.commerce.productDescription(),
    categoryId, // ✅ use the random valid categoryId
    images: [`https://picsum.photos/640/480?r=${faker.number.int(1000)}`],
  };
};
