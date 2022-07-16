const knex = require("../../db/migrations/config/knex")

// working here
const saveproductServicedata = async (serdetails, subscriptionId) => {
    try{
        const insertData = {

            CompanyId:serdetails.companyId,
            Product_Service_Name:serdetails.Product_Service_Name,
            NIC_code:serdetails.NIC_code,
            TurnOver:serdetails.TurnOver,
            activity_grp_desc:serdetails.activity_grp_desc,
            Buisiness_code:serdetails.Buisiness_code,
            Buisiness_code_desc:serdetails.Buisiness_code_desc,
            State:serdetails.State,
            City:serdetails.City,
            Country:serdetails.Country,
            Year:serdetails.Year,
            SupportedCategory:serdetails.SupportedCategory,
            SubID:subscriptionId,
        }
        return await knex('product_service').insert(insertData)
    }
    catch(err){
        throw Promise.reject(err)
    }
}

const getProductDetailsById = async (productId, subscriptionId) => {
    try{

        if(subscriptionId)
            return await knex('product_service').select('*').where({ SubID: subscriptionId})
        
        return await knex('product_service').select('*').where({servicesID: productId})
    }
    catch(err){
        throw Promise.reject(err)
    }
}

const updateProductDetailsService = async (serdetails, productId) => {
    try{
        const insertData = {
        //     Nic_code:productDetails.niccode,
        //     Main_Activity:productDetails.mainactivity,
        //    Activity_group:productDetails.Activity_group,
        //    Business_code:productDetails.Business_code,
        //    Turn_Over:productDetails.TurnOver,
            CompanyId:serdetails.companyId,
            Product_Service_Name:serdetails.Product_Service_Name,
            NIC_code:serdetails.NIC_code,
            TurnOver:serdetails.TurnOver,
            activity_grp_desc:serdetails.activity_grp_desc,
            Buisiness_code:serdetails.Buisiness_code,
            Buisiness_code_desc:serdetails.Buisiness_code_desc,
            State:serdetails.State,
            City:serdetails.City,
            Country:serdetails.Country,
            Year:serdetails.Year,
            SupportedCategory:serdetails.SupportedCategory
            //SubID:subscriptionId,
        }
        return await knex('product_service').update(insertData).where({ servicesID: productId})
    }
    catch(err){
        throw Promise.reject(err)
    }
}
module.exports = {
    saveproductServicedata,
    getProductDetailsById,
    updateProductDetailsService
}