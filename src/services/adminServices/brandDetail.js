const knex = require("../../db/migrations/config/knex")

// working here
const saveBrandDetailsdata = async (serdetails, subscriptionId) => {
    try{
        const insertData = {
            CompanyId:serdetails.CompanyId,
            BrandDetails:serdetails.BrandDetails,
            Name:serdetails.Name,
            servicesID:serdetails.servicesID,
            Year:serdetails.Year,
            Revenue:serdetails.Revenue,
            SubID:subscriptionId
        }
        return await knex('brand_details').insert(insertData)
    }
    catch(err){
        throw Promise.reject(err)
    }
}

// const getBrandDetailsById = async (productId, subscriptionId) => {
const getBrandDetailsById = async (subscriptionId) => {
    try{

        if(subscriptionId)
            return await knex('brand_details').select('*').where({ SubID: subscriptionId})
        
        // return await knex('brand_details').select('*').where({servicesID: productId})
    }
    catch(err){
        throw Promise.reject(err)
    }
}

const updateBrandDetailsService = async (serdetails, subscriptionId) => {
    try{
        const insertData = {
                CompanyId:serdetails.companyId,
                BrandDetails:serdetails.BrandDetails,
                Name:serdetails.Name,
                servicesID:serdetails.servicesID,
                Year:serdetails.Year,
                Revenue:serdetails.Revenue,
                SubID:subscriptionId
        }
        // return await knex('brand_details').update(insertData).where({ servicesID: productId})
        return await knex('brand_details').update(insertData).where({ SubID: subscriptionId})
    }
    catch(err){
        throw Promise.reject(err)
    }
}
module.exports = {
    saveBrandDetailsdata,
    getBrandDetailsById,
    updateBrandDetailsService
}