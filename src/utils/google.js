const {OAuth2Client} = require('google-auth-library');


const getClient = function(){
    return new OAuth2Client(
        process.env.GOOGLE_OAUTH2_SECRET,
    )
}

const verifyIdToken = async function (token) {
    const client = getClient()

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_OAUTH2_SECRET
    });

    return ticket.getPayload();
}


module.exports = {
    getClient,
    verifyIdToken
}