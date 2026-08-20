import { getDb } from '../config/db.js';

export const getOrderCollection = () => getDb().collection('orders');
