import { body, param, validationResult } from 'express-validator';

// Middleware to check for validation errors
export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      message: "Validation failed",
      errors: errors.array() 
    });
  }
  next();
};

// Validation rules for registration
export const registerValidation = [
  // Email validation
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail() // Normalize email (lowercase, remove dots in Gmail)
    .trim()
    .escape() // Prevent XSS attacks
    .custom(value => {
      // Additional custom validation if needed
      if (value.endsWith('.test')) {
        throw new Error('This email domain is not supported');
      }
      return true;
    }),
  
  // Password validation
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/\d/)
    .withMessage('Password must contain at least one number')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage('Password must contain at least one special character')
    .not()
    .contains('password')
    .withMessage('Password cannot contain the word "password"'),
  
  // Apply validation
  validateRequest
];

// Validation rules for login
export const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail()
    .trim()
    .escape(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .trim(),
  
  validateRequest
];

// validation for admin form (cars)
// Validation for MongoDB ObjectId
export const validateObjectId = [
    param('id')
      .isMongoId()
      .withMessage('Invalid ID format'),
    validateRequest
  ];
  
  // Validation rules for creating a car
  export const createCarValidation = [
    body('title')
      .optional()
      .isString()
      .withMessage('Title must be a string')
      .trim(),
    
    body('make')
      .notEmpty()
      .withMessage('Make is required')
      .isString()
      .withMessage('Make must be a string')
      .trim(),
    
    body('model')
      .notEmpty()
      .withMessage('Model is required')
      .isString()
      .withMessage('Model must be a string')
      .trim(),
    
    body('year')
      .notEmpty()
      .withMessage('Year is required')
      .isString()
      .withMessage('Year must be a string')
      .matches(/^\d{4}$/)
      .withMessage('Year must be a 4-digit number')
      .trim(),
    
    body('price')
      .notEmpty()
      .withMessage('Price is required')
      .isString()
      .withMessage('Price must be a string')
      .trim(),
    
    body('description')
      .optional()
      .isString()
      .withMessage('Description must be a string')
      .trim(),
    
    body('color')
      .optional()
      .isString()
      .withMessage('Color must be a string')
      .trim(),
    
    body('rating')
      .optional()
      .isNumeric()
      .withMessage('Rating must be a number')
      .isFloat({ min: 0, max: 5 })
      .withMessage('Rating must be between 0 and 5'),
    
    body('category')
      .optional()
      .isString()
      .withMessage('Category must be a string')
      .trim(),
    
    body('totalPrice')
      .optional()
      .isString()
      .withMessage('Total price must be a string')
      .trim(),
    
    body('available')
      .optional()
      .isBoolean()
      .withMessage('Available must be a boolean'),
    
    body('img')
      .optional()
      .isString()
      .withMessage('Image URL must be a string')
      .trim(),
    
    validateRequest
  ];
  
  
  // Validation rules for updating a car (similar to create but all fields optional)
  export const updateCarValidation = [
    body('title')
      .optional()
      .isString()
      .withMessage('Title must be a string')
      .trim(),
    
    body('make')
      .optional()
      .isString()
      .withMessage('Make must be a string')
      .trim(),
    
    body('model')
      .optional()
      .isString()
      .withMessage('Model must be a string')
      .trim(),
    
    body('year')
      .optional()
      .isString()
      .withMessage('Year must be a string')
      .matches(/^\d{4}$/)
      .withMessage('Year must be a 4-digit number')
      .trim(),
    
    body('price')
      .optional()
      .isString()
      .withMessage('Price must be a string')
      .trim(),
    
    body('description')
      .optional()
      .isString()
      .withMessage('Description must be a string')
      .trim(),
    
    body('color')
      .optional()
      .isString()
      .withMessage('Color must be a string')
      .trim(),
    
    body('rating')
      .optional()
      .isNumeric()
      .withMessage('Rating must be a number')
      .isFloat({ min: 0, max: 5 })
      .withMessage('Rating must be between 0 and 5'),
    
    body('category')
      .optional()
      .isString()
      .withMessage('Category must be a string')
      .trim(),
    
    body('totalPrice')
      .optional()
      .isString()
      .withMessage('Total price must be a string')
      .trim(),
    
    body('available')
      .optional()
      .isBoolean()
      .withMessage('Available must be a boolean'),
    
    body('img')
      .optional()
      .isString()
      .withMessage('Image URL must be a string')
      .trim(),
    
    validateRequest

];

// Validation for payment creation
export const createPaymentValidation = [
  // User ID validation
  body('userId')
    .notEmpty()
    .withMessage('User ID is required')
    .isMongoId()
    .withMessage('Invalid user ID format'),
  
  // Booking validation
  body('booking')
    .notEmpty()
    .withMessage('Booking information is required')
    .isObject()
    .withMessage('Booking must be an object'),
  
  body('booking.carName')
    .optional()
    .isString()
    .withMessage('Car name must be a string')
    .trim(),
  
  body('booking.carCategory')
    .optional()
    .isString()
    .withMessage('Car category must be a string')
    .trim(),
  
  body('booking.carImage')
    .optional()
    .isString()
    .withMessage('Car image URL must be a string')
    .trim(),
  
  body('booking.totalPrice')
    .optional()
    .isNumeric()
    .withMessage('Total price must be a number')
    .isFloat({ min: 0 })
    .withMessage('Total price must be a positive number'),
  
  // Payment method validation
  body('method')
    .notEmpty()
    .withMessage('Payment method is required')
    .isString()
    .withMessage('Payment method must be a string')
    .isIn(['credit-card', 'cash'])
    .withMessage('Payment method must be either credit-card or cash'),
  
  // Payment details validation (optional)
  body('paymentDetails')
    .optional()
    .isObject()
    .withMessage('Payment details must be an object'),
  
  // Credit card validation (if method is credit-card)
  body('paymentDetails.cardNumber')
    .if(body('method').equals('credit-card'))
    .notEmpty()
    .withMessage('Card number is required for credit card payments')
    .isString()
    .withMessage('Card number must be a string')
    .matches(/^\d{16}$/)
    .withMessage('Card number must be 16 digits')
    .trim(),
  
  body('paymentDetails.cardholderName')
    .if(body('method').equals('credit-card'))
    .notEmpty()
    .withMessage('Cardholder name is required for credit card payments')
    .isString()
    .withMessage('Cardholder name must be a string')
    .trim(),
  
  body('paymentDetails.expiryDate')
    .if(body('method').equals('credit-card'))
    .notEmpty()
    .withMessage('Expiry date is required for credit card payments')
    .isString()
    .withMessage('Expiry date must be a string')
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/)
    .withMessage('Expiry date must be in MM/YY format')
    .trim(),
  
  body('paymentDetails.cvv')
    .if(body('method').equals('credit-card'))
    .notEmpty()
    .withMessage('CVV is required for credit card payments')
    .isString()
    .withMessage('CVV must be a string')
    .matches(/^\d{3,4}$/)
    .withMessage('CVV must be 3 or 4 digits')
    .trim(),
  
  validateRequest
];

// Validation for getting payments by user ID
export const getUserPaymentsValidation = [
  param('userId')
    .notEmpty()
    .withMessage('User ID is required')
    .isMongoId()
    .withMessage('Invalid user ID format'),
  
  validateRequest
]
// Add these new validation rules to your existing validation.js file

// Validation for creating a review
export const createReviewValidation = [
    // Name validation
    body('name')
      .notEmpty()
      .withMessage('Name is required')
      .isString()
      .withMessage('Name must be a string')
      .isLength({ min: 2, max: 50 })
      .withMessage('Name must be between 2 and 50 characters')
      .trim()
      .escape(), // Prevent XSS attacks
    
    // Email validation
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Please provide a valid email address')
      .normalizeEmail() // Normalize email (lowercase, remove dots in Gmail)
      .trim()
      .escape(),
    
    // Comment validation
    body('comment')
      .notEmpty()
      .withMessage('Comment is required')
      .isString()
      .withMessage('Comment must be a string')
      .isLength({ min: 10, max: 1000 })
      .withMessage('Comment must be between 10 and 1000 characters')
      .trim()
      .escape(),
    
    // Rating validation
    body('rating')
      .notEmpty()
      .withMessage('Rating is required')
      .isNumeric()
      .withMessage('Rating must be a number')
      .isFloat({ min: 1, max: 5 })
      .withMessage('Rating must be between 1 and 5')
      .toFloat(), // Convert to float
    
    validateRequest
  ];
  
  // Validation for getting a specific review by ID (if needed)
  export const getReviewByIdValidation = [
    param('id')
      .isMongoId()
      .withMessage('Invalid review ID format'),
    validateRequest
  ];

  // Add these new validation rules to your existing validation.js file

// Validation for contact form submission
export const contactFormValidation = [
    // First name validation
    body('firstName')
      .notEmpty()
      .withMessage('First name is required')
      .isString()
      .withMessage('First name must be a string')
      .isLength({ min: 2, max: 50 })
      .withMessage('First name must be between 2 and 50 characters')
      .trim()
      .escape(), // Prevent XSS attacks
    
    // Last name validation
    body('lastName')
      .notEmpty()
      .withMessage('Last name is required')
      .isString()
      .withMessage('Last name must be a string')
      .isLength({ min: 2, max: 50 })
      .withMessage('Last name must be between 2 and 50 characters')
      .trim()
      .escape(),
    
    // Email validation
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Please provide a valid email address')
      .normalizeEmail() // Normalize email (lowercase, remove dots in Gmail)
      .trim(),
    
    // Query type validation
    body('queryType')
      .notEmpty()
      .withMessage('Query type is required')
      .isString()
      .withMessage('Query type must be a string')
      .isIn(['General Enquiry', 'Support Request'])
      .withMessage('Query type must be either "General Enquiry" or "Support Request"'),
    
    // Message validation
    body('message')
      .notEmpty()
      .withMessage('Message is required')
      .isString()
      .withMessage('Message must be a string')
      .isLength({ min: 10, max: 1000 })
      .withMessage('Message must be between 10 and 1000 characters')
      .trim()
      .escape(),
    
    // Consent validation
    body('consent')
      .notEmpty()
      .withMessage('Consent is required')
      .isBoolean()
      .withMessage('Consent must be a boolean')
      .custom((value) => {
        if (value !== true) {
          throw new Error('You must consent to our terms');
        }
        return true;
      }),
    
    validateRequest
  ];
  
  // Validation for getting a specific contact by ID (if needed)
  export const getContactByIdValidation = [
    param('id')
      .isMongoId()
      .withMessage('Invalid contact ID format'),
    validateRequest
  ];
// Admin login validation (same as login)
export const adminLoginValidation = loginValidation;