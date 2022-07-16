const express = require('express')
const { getCompany } = require('../../controller/adminController/companyDetails')
const { validateCompanyListQuery } = require('../../validator/companyListQueryValidator')

const router = express.Router()

router.route('/company').get(validateCompanyListQuery, getCompany)

module.exports = router