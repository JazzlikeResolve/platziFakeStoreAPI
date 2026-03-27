import { APIRequestContext, expect } from '@playwright/test';
import { ProductPayLoad } from '../types/product';

export class StoreController {
  constructor(private request: APIRequestContext) {}

/**
   * We define the return type as a Record of strings.
   * This ensures TypeScript knows that if a key exists, the value is definitely a string.
   */
  private getHeaders(token?: string): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  async createToken(email: string, password: string) {
    const response = await this.request.post('/api/v1/auth/login', {
      data: { email, password },
    });
    expect(response.status()).toBe(201);
    return await response.json(); // Returns the body with access_token
  }

  async createProduct(data: ProductPayLoad, token?: string) {
    return await this.request.post('/api/v1/products', {
      data,
      headers: this.getHeaders(token),
    });
  }

  async getAllProductInfo(token?: string) {
    return await this.request.get('/api/v1/products', {
      headers: this.getHeaders(token),
    });
  }

  async getOneId(id: number, token?: string) {
    return await this.request.get(`/api/v1/products/${id}`, {
      headers: this.getHeaders(token),
    });
  }

  async updateProduct(id: number, data: ProductPayLoad, token?: string) {
    return await this.request.put(`/api/v1/products/${id}`, {
      data: data,
      headers: this.getHeaders(token),
    });
  }

  async partialUpdate(id: number, data: Partial<ProductPayLoad>, token?: string) { 
    return await this.request.patch(`/api/v1/products/${id}`, {
      data: data,
      headers: this.getHeaders(token),
    });
  }

  async deleteProduct(id: number, token?: string) {
    return await this.request.delete(`/api/v1/products/${id}`, {
      headers: this.getHeaders(token),
    });
  }

  // This method typically doesn't need a token for public listings, 
  // but we kept the structure consistent.
  async getId(id: number, token?: string) {
    return await this.request.get(`/api/v1/products/${id}`, {
      headers: this.getHeaders(token),
    });
  }
}