const Joi = require('joi');

// Validate request body
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map(detail => detail.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }

    next();
  };
};

// Validation schemas
const schemas = {
  // Auth
  register: Joi.object({
    name: Joi.string().required().max(50),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('admin', 'editor')
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),

  // Blog Post
  blogPost: Joi.object({
    title: Joi.string().required().max(200),
    content: Joi.string().required(),
    excerpt: Joi.string().max(300),
    featuredImage: Joi.string().uri().allow(''),
    categories: Joi.array().items(Joi.string()),
    status: Joi.string().valid('draft', 'published'),
    metaTitle: Joi.string().max(70),
    metaDescription: Joi.string().max(160)
  }),

  // Devotional
  devotional: Joi.object({
    title: Joi.string().required().max(200),
    content: Joi.string().required(),
    scripture: Joi.object({
      reference: Joi.string().required(),
      text: Joi.string()
    }).required(),
    authorName: Joi.string(),
    categories: Joi.array().items(Joi.string()),
    devotionalDate: Joi.date().required(),
    status: Joi.string().valid('draft', 'published'),
    featuredImage: Joi.string().uri().allow(''),
    metaTitle: Joi.string().max(70),
    metaDescription: Joi.string().max(160)
  }),

  // Category
  category: Joi.object({
    name: Joi.string().required().max(50),
    type: Joi.string().valid('blog', 'devotional').required(),
    description: Joi.string().max(200)
  })
};

module.exports = { validate, schemas };
