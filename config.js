require('dotenv').config();

const apiUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://linkedin-oauth-api-dot-tutorial-262713.el.r.appspot.com'
    : 'http://localhost:4001';

const config ={
    linkedinClientId:process.env.linkedinClientId,
    linkedinSecretKey:process.env.linkedinClientSecret,
    apiUrl
};
module.exports = config;