import { getReviewCollection } from '../models/Review.js';

export const getReviews = async (req, res, next) => {
  try {
    const { productId } = req.query;
    const query = {};
    if (productId) {
      query.productId = productId;
    }
    const reviews = await getReviewCollection().find(query).toArray();
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

export const createReview = async (req, res, next) => {
  try {
    const { reviewerId, reviewerName, reviewerPhoto, productId, rating, comment } = req.body;
    
    const newReview = {
      reviewerId,
      reviewerName,
      reviewerPhoto,
      productId,
      rating: parseFloat(rating),
      comment,
      createdAt: new Date()
    };
    
    const result = await getReviewCollection().insertOne(newReview);
    res.status(201).json({ success: true, insertedId: result.insertedId, review: newReview });
  } catch (error) {
    next(error);
  }
};
