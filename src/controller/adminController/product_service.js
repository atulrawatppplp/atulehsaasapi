const { saveproductServicedata, getProductDetailsById, updateProductDetailsService} = require('../../services/adminServices/productService')

const saveproductdata = async (req, res) => {
    try{
        const subscriptionId = req?.user?.subscriptionId

        const productDetails = await getProductDetailsById(undefined, subscriptionId)
        if(productDetails.length){
            return res.status(409).send({messege: `company details already added`})
        }
        await saveproductServicedata(req.body, subscriptionId);
        return res.status(201).send({messege: `added product succesfully`}).end()
    }
    catch(err){
        return res.status(500).send('Internal Server Error').end()
    }
}

const getProductdata = async (req, res) => {
    try{
        const subscriptionId = req?.user?.subscriptionId
        const productId = req?.query?.productId

        if( !(subscriptionId || productId ))
            return res.status(409).send({ messege: `product id or subscription is mandatory`}).end()

        const response = await getProductDetailsById(productId, subscriptionId)
        return res.status(201).send({ data: response }).end()
    }
    catch(err){
        return res.status(500).send('Internal Server Error').end()
    }
}
const updateProductdata = async (req, res) => {
    try{
        const productId = req?.body?.productId
        if(!productId)
            return res.status(409).send({ messege: `product id property is mandatory in body`})

        await updateProductDetailsService(req.body, productId)
        return res.status(201).send({messege: `product details updated succesfully`}).end()
    }
    catch(err){
        return res.status(500).send('Internal Server Error').end()
    }
}
module.exports = {
    saveproductdata,
    getProductdata,
    updateProductdata
}