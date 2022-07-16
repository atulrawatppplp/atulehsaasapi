const { validationResult, query } = require('express-validator')

exports.validateCompanyListQuery = [
    query('limit').isNumeric().withMessage('limit in query is mandatory and should be integer'),
    query('page').isNumeric().withMessage('page in query is mandatory and should be integer'),
    (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()}).end()
      next()
    },
  ]
