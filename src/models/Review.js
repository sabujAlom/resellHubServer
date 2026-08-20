import { getDb } from '../config/db.js';

export const getReviewCollection = () => getDb().collection('reviews');
