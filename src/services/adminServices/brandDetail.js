const knex = require("../../db/migrations/config/knex")

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

const getBrandDetailsById = async (servicesID, subscriptionId) => {
    try{

        if(subscriptionId)
            return await knex('brand_details').select('*').where({ SubID: subscriptionId})
        
        return await knex('brand_details').select('*').where({servicesID: servicesID})
    }
    catch(err){
        throw Promise.reject(err)
    }
}

const updateBrandDetailsService = async (serdetails, servicesID) => {
    try{
        const insertData = {
                CompanyId:serdetails.CompanyId,
                BrandDetails:serdetails.BrandDetails,
                Name:serdetails.Name,
                Year:serdetails.Year,
                Revenue:serdetails.Revenue,
                servicesID:servicesID,
        }
        return await knex('brand_details').update(insertData).where({ servicesID: servicesID})
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