const { validationResult, body } = require('express-validator')

exports.validateLoginBody = [
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
    (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()}).end()
      next()
    },
  ]
