const bcrypt = require('bcryptjs/dist/bcrypt');
const knex = require('../../db/migrations/config/knex');
const { saveUser, getUserDetails, sendPasswordGenerationLink, savePassword } = require('../../services/webServices/userDetails')
const { createToken } = require('../../utilities/createToken');

const registerUser = async (req, res) => {
    try{
        const reqBody = {...req.body}
        const { email, password } = reqBody;

        const userDetails = await getUserDetails(email)

        if(userDetails.length){
            return res.status(409).send({ messege: `User already exist`}).end()
        }

        const encryptedPassword = await bcrypt.hash(password, 10)

        reqBody.password = encryptedPassword
        
       await saveUser(reqBody)

       delete reqBody.password

        const savedUserDetails = await getUserDetails(email)

        const tokenRequest = {
            userId: savedUserDetails[0].user_id,
            email: email,
            subscriptionId: savedUserDetails[0].subscription_id
        }

        const token = createToken(tokenRequest)

        const user = {
            token,
            subscriptionId: savedUserDetails[0].subscription_id,
            email 
        }
        return res.status(200).send({ messege: `Registered Successfully`, user}).end()
    }
    catch(err){
        console.log(err)
        return res.status(500).send(`Internal Server Error`).end()
    }
}

const login = async (req, res) => {
    try{
        const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).send({ messege: `All input is required`}).end()
    }
    const userDetails = await getUserDetails(email);

    if (userDetails.length && (await bcrypt.compare(password, userDetails[0].password))) {

      const tokenRequest = {
        userId: userDetails[0].user_id,
        email: email,
        subscriptionId: userDetails[0].subscription_id
      }

      const token = createToken(tokenRequest)
      userDetails[0].token = token;
      delete userDetails[0].password

      return res.status(200).json(userDetails[0]);
    }
    return res.status(400).send({messege: `Invalid Credentials`}).end()
    }
    catch(err){
        return res.status(500).send(`Internal Server Error`).end()
    }
}

const forgotPassword = async (req, res) => {
    try{
        const reqBody = {...req.body}

        const userDetails = await getUserDetails(reqBody.email)

        if(!userDetails.length)
            return res.status(409).send({ messege: `Email is not registered with us`}).end()

        await sendPasswordGenerationLink(reqBody.email, userDetails[0].user_id)
        return res.status(200).send({ messege: `Reset Password link send to your email`}).end()
    }
    catch(err){
        console.log(err);
        return res.status(500).send({messege: `Internal Server Error`})
    }
}

const saveForgotPassword = async (req, res) => {
    try{
        const { temporaryPassword, password, userId } = req.body
        const response = await knex('password_change_requests').select('id').where({user_id: userId, is_valid: true})
        if(!response.length) return res.status(409).send({messege: `Temporary password not found, please re send the link`})

        const decryptTempPassword = await bcrypt.compare(`${response[0].id}`, `${temporaryPassword}`)
        if(!decryptTempPassword) return res.status(409).send({ messege: `Temporary Password didn't matched`})
        const hashPassword = await bcrypt.hash(`${password}`, 10)
        await savePassword(hashPassword, userId)
        return res.status(201).send({ messege: `Password saved successfully`}).end()
    }
    catch(err){
        console.log(err)
        return res.status(500).send({messege: `Internal Server Error`})
    }
}

module.exports = {
    registerUser,
    login,
    forgotPassword,
    saveForgotPassword
}