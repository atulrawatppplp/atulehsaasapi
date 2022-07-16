const knex = require("../../db/migrations/config/knex")

const saveCompanyDetailsService = async (companyDetails, subscriptionId) => {
    try{
        const insertData = {
            cin: companyDetails.cin,
            name: companyDetails.name,
            year: companyDetails.year,
            office_address: companyDetails.officeAddress,
            registered_corporate_address: companyDetails.registeredCorporateAddress,
            email:companyDetails.email,
            phone: companyDetails.phone,
            website: companyDetails.website,
            reporting_year: companyDetails.reportingYear,
            is_recognized: companyDetails.isRecognized,
            authorized_capital: companyDetails.authorizedCapital,
            paidup_capital: companyDetails.paidupCapital,
            subscription_id: subscriptionId
        }
        return await knex('company_details').insert(insertData)
    }
    catch(err){
        throw Promise.reject(err)
    }
}

const getCompanyDetailsById = async (companyId, subscriptionId) => {
    try{

        if(subscriptionId)
            return await knex('company_details').select('*').where({ subscription_id: subscriptionId})
        
        return await knex('company_details').select('*').where({ company_id: companyId})
    }
    catch(err){
        throw Promise.reject(err)
    }
}

const updateCompanyDetailsService = async (companyDetails, companyId) => {
    try{
        const insertData = {
            cin: companyDetails.cin,
            name: companyDetails.name,
            year: companyDetails.year,
            office_address: companyDetails.officeAddress,
            registered_corporate_address: companyDetails.registeredCorporateAddress,
            email:companyDetails.email,
            phone: companyDetails.phone,
            website: companyDetails.website,
            reporting_year: companyDetails.reportingYear,
            is_recognized: companyDetails.isRecognized,
            authorized_capital: companyDetails.authorizedCapital,
            paidup_capital: companyDetails.paidupCapital,
        }
        return await knex('company_details').update(insertData).where({ company_id: companyId})
    }
    catch(err){
        throw Promise.reject(err)
    }
}


module.exports = {
    saveCompanyDetailsService,
    getCompanyDetailsById,
    updateCompanyDetailsService
}
