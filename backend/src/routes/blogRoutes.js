const express = require('express');
const {
  getBlogPosts,
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost
} = require('../controllers/blogController');
const { protect } = require('../middlewares/auth');
const { validate, schemas } = require('../middlewares/validation');

const router = express.Router();

router
  .route('/')
  .get(getBlogPosts)
  .post(protect, validate(schemas.blogPost), createBlogPost);

router
  .route('/:slug')
  .get(getBlogPost);

router
  .route('/id/:id')
  .put(protect, updateBlogPost)
  .delete(protect, deleteBlogPost);

module.exports = router;
