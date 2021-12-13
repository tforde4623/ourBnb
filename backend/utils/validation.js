const { check, validationResult } = require('express-validator');

// middlware to format and return validation errors "prettily"
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map(error => `${error.msg}`);
    
    const err = Error('Bad request.');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request.';
    next(err);
  }

  next();
};

// express validation arrays
const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

const validateLocation = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Valid title required')
    .isLength({ max: 30 })
    .withMessage('Title can only be up to 30 characters in length'),
  check('description')
    .exists({ checkFalsy: true  })
    .withMessage('Valid description required.')
    .custom((value) => {
      const str = value.replace(/\n/g, '');
      return str.length > 0;
    })
    .withMessage('Valid description required'),
  check('location')
    .exists({ checkFalsy: true })
    .withMessage('Location field required.')
    .isLength({ max: 256 })
    .withMessage('Location can be at max 256 characters in length.'),
  check('price')
    .exists({ checkFalsy: true })
    .withMessage('Price field required.')
    .isNumeric()
    .withMessage('Price must be a number!'),
  check('image')
    .exists({ checkFalsy: true })
    .withMessage('Valid url to an image descibing spot is required.'),
  handleValidationErrors
];

const validateReview = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Reviews must have titles to describe their content!')
    .isLength({ max: 30 }) 
    .withMessage('Title length must not exceed 30 characters.'),
  check('content')
    .custom((value) => {
      const str = value.replace(/\n/g, '');
      console.log(93, str)
      return str.length > 0;
    })
    .withMessage('Valid content required'),
  handleValidationErrors

]; 

module.exports = {
  handleValidationErrors,
  validateLogin,
  validateSignup,
  validateLocation,
  validateReview
};
