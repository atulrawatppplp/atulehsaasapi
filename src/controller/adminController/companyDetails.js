const { getCompanyList } = require("../../services/adminServices/companyDetails")

const getCompany = async (req, res) => {
    try{
        const response = await getCompanyList(req.query)
        return res.status(200).send({data: response})
    }
    catch(err){
        return res.status(500).send({messege: `Internal Server Error`})
    }
}

module.exports = {
    getCompany
}