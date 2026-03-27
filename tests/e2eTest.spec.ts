import { test, expect } from '@playwright/test';
import { StoreController } from '../controllers/StoreController';
import { ProductResponse } from '../types/product';
import { createProductData } from '../testdata/productData';

test.describe.serial('E2E Product Lifecycle', () => {
  let controller: StoreController;
  const testData = createProductData();
  let createdProductId: number;

  test.beforeEach(async ({ request }) => {
    controller = new StoreController(request);
  });

  test('Step 1: Create Product', async () => {
    const response = await controller.createProduct(testData);
    expect(response.status()).toBe(201);

    const product = (await response.json()) as ProductResponse;
    createdProductId = product.id;

    expect(product.title).toBe(testData.title);
  });

  test('Step 2: Update Product (Full)', async () => {
    const updatedData = { 
      ...testData, 
      title: `Updated ${Date.now()}`, 
      price: 99 
    };

    const response = await controller.updateProduct(createdProductId, updatedData);
    expect(response.status()).toBe(200);

    const body = (await response.json()) as ProductResponse;
    expect(body.title).toBe(updatedData.title);
  });

  test('Step 3: Delete and Verify', async () => {
    // Delete
    const deleteRes = await controller.deleteProduct(createdProductId);
    expect([200, 204]).toContain(deleteRes.status());

    // Verify 404
    const getRes = await controller.getId(createdProductId);
    expect(getRes.status()).toBe(400);
  });
});