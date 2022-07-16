const { login, registerUser, forgotPassword, saveForgotPassword } = require('../../controller/webController/userDetails')

const express = require('express')
const { validateLoginBody } = require('../../validator/loginValidator')
const { validateRegisterBody } = require('../../validator/registerBodyValidator')
const router = express.Router()

router.route('/register').post(validateRegisterBody, registerUser)
router.route('/login').post(validateLoginBody, login)
router.route('/forgotPassword').post(forgotPassword)
router.route('/saveForgotpassword').post(saveForgotPassword)

module.exports = router