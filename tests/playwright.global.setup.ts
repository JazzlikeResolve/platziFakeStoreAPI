import { test as setup, expect } from '@playwright/test';
import { request } from 'node:http';
import { StoreController } from '../controllers/StoreController';
import { AuthResponse } from '../types/product';

const authFile = 'playwright/.auth/user.json';

  setup('authenticate', async ({ request }) => { 
  const controller = new StoreController(request); 
  
  // 1. Get the body directly from the controller
  const body = await controller.createToken(
    process.env.API_EMAIL!,
    process.env.API_PASSWORD!
  ) as AuthResponse;

  // 2. Access the token directly from the object
  const authtoken = body.access_token;

  expect(authtoken).toBeDefined();

  // 3. Save the state
  await request.storageState({ path: authFile });
});