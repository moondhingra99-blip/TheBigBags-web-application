import { Product, BlogPost } from '../types';
import data from './initialData.json';

export const INITIAL_PRODUCTS: Product[] = data.products as Product[];
export const INITIAL_BLOGS: BlogPost[] = data.blogs as BlogPost[];
export const FAQS = data.faqs;
