const { validationResult, body } = require('express-validator')

const firstNameValidator = body('firstName').isString()
                                            .withMessage('firstName should be string')
                                            .isLength({ min: 1})
                                            .withMessage('firstName length will be greater than 1')
const lastNameValidator = body('lastName').isString()
                                          .withMessage('lastName should be string')
                                          .isLength({ min: 1})
                                          .withMessage('lastName will be greater than 1')
const emailValidator = body('email').isEmail()
                                    .withMessage('Email is not valid')
const passwordValidator = body('password').isLength({ min: 5 })
                                          .withMessage('must be at least 5 chars long')
                                          
exports.validateRegisterBody = [ firstNameValidator, lastNameValidator, emailValidator, passwordValidator ,
    (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()}).end()
      next()
    },
  ]
