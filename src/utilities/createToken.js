const jwt = require('jsonwebtoken')

const createToken = (userDetails) => {
    const token= jwt.sign(
        { userId: userDetails.userId, email: userDetails.email, subscriptionId: userDetails.subscriptionId },
        process.env.TOKEN_KEY
      )

    return token
}

module.exports = {
    createToken
}