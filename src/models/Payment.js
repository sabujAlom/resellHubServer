import { getDb } from '../config/db.js';

export const getPaymentCollection = () => getDb().collection('payments');
