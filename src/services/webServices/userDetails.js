const bcrypt = require("bcryptjs/dist/bcrypt")
const knex = require("../../db/migrations/config/knex")
const { sendEmail, getMailOptions } = require("../../utilities/nodeMailer")

const saveUser = async (userData) => {
    try{
        const insertData = {
            first_name: userData.firstName,
            last_name: userData.lastName,
            email: userData.email,
            password: userData.password,
            subscription_id: userData.firstName + Date.now(),
            is_owner: true,
            is_active: true
        }

        return await knex('users').insert(insertData)
    }
    catch(err){
        return Promise.reject(err)
    }
}

const getUserDetails = async ( email ) => {
    try{
        const userDetails = await knex('users').select('*').where({email})
        return userDetails
    }
    catch(err){
        return Promise.reject(err)
    }
}

const sendPasswordGenerationLink = async (email, userId) => {
    try{
        await knex('password_change_requests').returning('id').insert({ user_id: userId })
        const passwordId = await knex('password_change_requests').select('id').where({user_id: userId, is_valid: true})
        const hashedPasswordId =  await bcrypt.hash(passwordId[0].id, 10)
        const mailOptions = getMailOptions(email, `text`, `baseUrl?tempPassword=${hashedPasswordId}&&userId=${userId}`)
        sendEmail(mailOptions)
    }
    catch(err){
        return Promise.reject(err)
    }
}


const savePassword = async (password, userId) => {
    try{
        await knex('users').update({password}).where({user_id: userId})
        await knex('password_change_requests').update({ is_valid: false} ).where({ user_id: userId})
    }
    catch(err){
        return Promise.reject(err)
    }
}

module.exports = {
    saveUser,
    getUserDetails,
    sendPasswordGenerationLink,
    savePassword
}