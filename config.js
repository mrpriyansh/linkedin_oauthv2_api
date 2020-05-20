require('dotenv').config();

const config ={
    linkedinClientId:process.env.linkedinClientId,
    linkedinSecretKey:process.env.linkedinClientSecret
};
module.exports = config;