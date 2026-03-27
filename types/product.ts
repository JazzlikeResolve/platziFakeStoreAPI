export interface ProductPayLoad {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

// 1. Additional Data Returned after POST Call

export interface Category {
  id: number;
  name: string;
  image: string;
  slug?: string;
}

export interface ProductResponse {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
  creationAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
}
