const knex = require("../../db/migrations/config/knex")

const getCompanyList = async(criteria) => {
    try{
        const limit = criteria.limit
        const page = criteria.page
        const offset = (page - 1) * 10
        const keyword = criteria.keyword
        let result
        let total
       
        if(keyword?.length){
            result = await knex('company_details').select('*' )
                                                  .where('name', 'like', `%${keyword}%`)
                                                  .limit(limit)

            total = await knex('company_details').count('* as totalProduct')
                                                 .where('name', 'like', `%${keyword}%`)
        }
        else{
            result = await knex('company_details').select('*')
                                              .limit(limit)
                                              .offset(offset)
        total = await knex('company_details').count('* as totalProduct')
        }
        
        return {result, totalProduct:total[0].totalProduct}
    }
    catch(err){
        return Promise.reject(err)
    }
}

module.exports = {
    getCompanyList
}