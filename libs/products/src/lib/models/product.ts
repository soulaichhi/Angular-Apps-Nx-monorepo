import { Category } from './category';

export class Product {
  id?: string;
  image?: string;
  brand?: string;
  price?: number;
  rating?: number;
  numReviews?: number;
  isFeatured?: boolean;
  name?: string;
  description?: string;
  category?: Category;
  reviews?: string[];
  countInStock?: number;
  richDescription?: string;
  images?: string[];
  dateCreated?: Date;
}
