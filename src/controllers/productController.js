import { ObjectId } from 'mongodb';
import { 
  findProducts, 
  countProducts, 
  findProductById, 
  insertProduct, 
  updateProductById, 
  deleteProductById 
} from '../services/productService.js';

export const getProducts = async (req, res, next) => {
  try {
    const { search, category, condition, sellerId, status, sort, page = 1, limit = 6 } = req.query;
    
    const query = {};
    
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    if (category) {
      query.category = { $regex: `^${category}$`, $options: 'i' };
    }
    if (condition) {
      query.condition = condition;
    }
    if (sellerId) {
      query.sellerId = sellerId;
    }
    if (status) {
      query.status = status;
    } else {
      if (!sellerId && !req.query.all) {
        query.status = 'available';
      }
    }
    
    let sortOption = { createdAt: -1 };
    if (sort === 'price-asc') {
      sortOption = { price: 1 };
    } else if (sort === 'price-desc') {
      sortOption = { price: -1 };
    } else if (sort === 'oldest') {
      sortOption = { createdAt: 1 };
    }
    
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    
    const total = await countProducts(query);
    const products = await findProducts(query, sortOption, skip, limitNum);
      
    res.json({
      success: true,
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
      products
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await findProductById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { title, category, condition, price, images, description, sellerId, sellerInfo } = req.body;
    
    const newProduct = {
      title,
      category,
      condition,
      price: parseFloat(price),
      images: images || [],
      description,
      sellerId,
      sellerInfo,
      status: 'available',
      createdAt: new Date()
    };
    
    const result = await insertProduct(newProduct);
    res.status(201).json({ success: true, insertedId: result.insertedId, product: newProduct });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    if (updates.price !== undefined) {
      updates.price = parseFloat(updates.price);
    }
    
    delete updates._id;
    
    await updateProductById(id, updates);
    res.json({ success: true, message: "Product updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteProductById(id);
    res.json({ success: true, deletedCount: result.deletedCount });
  } catch (error) {
    next(error);
  }
};
