const { saveBrandDetailsdata, getBrandDetailsById, updateBrandDetailsService} = require('../../services/adminServices/brandDetail')

const saveBrandDetail = async (req, res) => {
    try{
        const subscriptionId = req?.user?.subscriptionId

        // const brandDetails = await getBrandDetailsById(undefined, subscriptionId)
        const brandDetails = await getBrandDetailsById(subscriptionId)
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
        // const productId = req?.query?.productId

        // if( !(subscriptionId || productId ))
        if( !(subscriptionId))
            return res.status(409).send({ messege: `product id or subscription is mandatory`}).end()

        // const response = await getBrandDetailsById(productId, subscriptionId)
        const response = await getBrandDetailsById(subscriptionId)
        return res.status(201).send({ data: response }).end()
    }
    catch(err){
        return res.status(500).send('Internal Server Error').end()
    }
}
const updateBrandDetail = async (req, res) => {
    try{
        // const productId = req?.body?.productId
        const subscriptionId = req?.user?.subscriptionId  // that line i create
        // if(!productId)
        if(subscriptionId)
            return res.status(409).send({ messege: `product id property is mandatory in body`})

        // await updateBrandDetailsService(req.body, productId)
        await updateBrandDetailsService(req.body, subscriptionId)
        return res.status(201).send({messege: `product details updated succesfully`}).end()
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