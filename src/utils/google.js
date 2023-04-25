const axios = require('axios')

const verifyIdToken = (token, handle) => {
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.GOOGLE_CLIENT_ID}&response=${token}`;

    axios.post(url)
        .then(google_response => handle())
        .catch(error => handle(error));
};

module.exports = {
    getClient,
    verifyIdToken
}