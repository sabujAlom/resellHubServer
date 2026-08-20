import { getDb } from '../config/db.js';

export const getProductCollection = () => getDb().collection('products');
