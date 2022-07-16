const {saveBrandDetail, getBrandDetail, updateBrandDetail} = require('../../controller/adminController/brandDetail')
const auth = require("../../middleware/auth");

const express = require('express')
const router = express.Router()

router.post('',auth, saveBrandDetail)
router.get('',auth, getBrandDetail)
router.put('',auth, updateBrandDetail)



module.exports = router