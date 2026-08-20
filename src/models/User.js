import { getDb } from '../config/db.js';

export const getUserCollection = () => {
  const db = getDb();
  return {
    findOne: async (query) => {
      // Try 'users' collection first (configured in Better Auth)
      let user = await db.collection('users').findOne(query);
      if (!user) {
        // Fallback to default 'user' collection just in case
        user = await db.collection('user').findOne(query);
      }
      return user;
    },
    find: (query) => {
      // Dynamic wrapper to array merge or search both
      return {
        toArray: async () => {
          const usersList = await db.collection('users').find(query).toArray();
          const userList = await db.collection('user').find(query).toArray();
          // Merge unique users by email to avoid duplicates
          const seen = new Set();
          const merged = [];
          for (const u of [...usersList, ...userList]) {
            if (!seen.has(u.email)) {
              seen.add(u.email);
              merged.push(u);
            }
          }
          return merged;
        }
      };
    },
    updateOne: async (filter, updateDoc) => {
      let res = await db.collection('users').updateOne(filter, updateDoc);
      if (res.matchedCount === 0) {
        res = await db.collection('user').updateOne(filter, updateDoc);
      }
      return res;
    },
    deleteOne: async (filter) => {
      let res = await db.collection('users').deleteOne(filter);
      if (res.deletedCount === 0) {
        res = await db.collection('user').deleteOne(filter);
      }
      return res;
    }
  };
};
