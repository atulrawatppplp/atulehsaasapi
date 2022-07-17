const { saveBrandDetailsdata, getBrandDetailsById, updateBrandDetailsService} = require('../../services/adminServices/brandDetail')

const saveBrandDetail = async (req, res) => {
    try{
        const subscriptionId = req?.user?.subscriptionId
        const servicesID = req?.body?.servicesID

        const brandDetails = await getBrandDetailsById(servicesID, undefined)
        if(brandDetails.length){
            return res.status(409).send({messege: `brand details already added`})
        }
        await saveBrandDetailsdata(req.body, subscriptionId);
        return res.status(201).send({messege: `added brand succesfully`}).end()
    }
    catch(err){
        return res.status(500).send('Internal Server Error').end()
    }
}

const getBrandDetail = async (req, res) => {
    try{
        const subscriptionId = req?.user?.subscriptionId
        const servicesID = req?.body?.servicesID

        if( !(subscriptionId || servicesID ))
            return res.status(409).send({ messege: `service id or subscription is mandatory`}).end()

        const response = await getBrandDetailsById(servicesID, subscriptionId)
        return res.status(201).send({ data: response }).end()
    }
    catch(err){
        return res.status(500).send('Internal Server Error').end()
    }
}
const updateBrandDetail = async (req, res) => {
    try{
        const servicesID = req?.body?.servicesID

        if(!servicesID)
            return res.status(409).send({ messege: `service id property is mandatory in body`})

        await updateBrandDetailsService(req.body, servicesID)
        return res.status(201).send({messege: `brand details updated succesfully`}).end()
    }
    catch(err){
        return res.status(500).send('Internal Server Error').end()
    }
}
module.exports = {
    saveBrandDetail,
    getBrandDetail,
    updateBrandDetail
}