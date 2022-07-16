// import { saveCompanyDetails } from "../controller/companyDetails"

const { saveCompanyDetails, getCompanyDetails, updateCompanyDetails } = require('../../controller/webController/companyDetails')
const auth = require("../../middleware/auth");

const express = require('express')
const router = express.Router()

router.post('', auth, saveCompanyDetails)
router.get('', auth, getCompanyDetails)
router.put('', auth, updateCompanyDetails)


module.exports = router