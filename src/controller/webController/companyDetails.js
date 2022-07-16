const { saveCompanyDetailsService, getCompanyDetailsById, updateCompanyDetailsService } = require('../../services/webServices/companyDetails')

const saveCompanyDetails = async (req, res) => {
    try{
        const subscriptionId = req?.user?.subscriptionId

        const companyDetails = await getCompanyDetailsById(undefined, subscriptionId)
        if(companyDetails.length){
            return res.status(409).send({messege: `company details already added`})
        }
        await saveCompanyDetailsService(req.body, subscriptionId)
        return res.status(201).send({messege: `Company details added succesfully`}).end()
    }
    catch(err){
        return res.status(500).send('Internal Server Error').end()
    }
}

const getCompanyDetails = async (req, res) => {
    try{
        const subscriptionId = req?.user?.subscriptionId
        const companyId = req?.query?.companyId

        if( !(subscriptionId || companyId) )
            return res.status(409).send({ messege: `company id or subscription is mandatory`}).end()

        const response = await getCompanyDetailsById(companyId, subscriptionId)
        return res.status(201).send({ data: response }).end()
    }
    catch(err){
        return res.status(500).send('Internal Server Error').end()
    }
}

const updateCompanyDetails  = async (req, res) => {
    try{
        const companyId = req?.body?.companyId
        if(!companyId)
            return res.status(409).send({ messege: `company id property is mandatory in body`})

        await updateCompanyDetailsService(req.body, companyId)
        return res.status(204).send({messege: `Company details updated succesfully`}).end()
    }
    catch(err){
        return res.status(500).send('Internal Server Error').end()
    }
}

module.exports = {
    saveCompanyDetails,
    getCompanyDetails,
    updateCompanyDetails
}