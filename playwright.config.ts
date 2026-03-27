import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv'; 
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const STORAGE_STATE = path.join(__dirname, 'playwright/.auth/user.json');

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'always' }]],
  
  use: {
    headless: false,
    baseURL: process.env.API_URL || 'https://api.escuelajs.co/',
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, 
    trace: 'on-first-retry',
  },

  projects: [
    // 1. Setup Project: Does NOT use storageState
    {
      name: 'setup',
      testMatch: /.*\.global\.setup\.ts/,
    },

    // 2. Browser Projects: DO use storageState and depend on 'setup'
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        storageState: STORAGE_STATE, 
      },
      dependencies: ['setup'],
    },
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        storageState: STORAGE_STATE,
      },
      dependencies: ['setup'],
    },
  ],
});