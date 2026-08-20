import { getDb } from '../config/db.js';

export const getWishlistCollection = () => getDb().collection('wishlist');
