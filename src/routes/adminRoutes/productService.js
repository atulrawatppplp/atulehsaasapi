
const {saveproductdata, getProductdata, updateProductdata} = require('../../controller/adminController/product_service')
const auth = require("../../middleware/auth");

const express = require('express')
const router = express.Router()

router.post('',auth, saveproductdata)
router.get('',auth, getProductdata)
router.put('',auth, updateProductdata)



module.exports = router