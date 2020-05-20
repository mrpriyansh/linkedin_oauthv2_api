const request= require('superagent');
const {linkedinClientId, linkedinSecretKey} = require('./config');

const getAccessToken=(code)=>{
    return request.post('https://www.linkedin.com/oauth/v2/accessToken')
    .send('grant_type=authorization_code')
    .send(`redirect_uri=http://localhost:4000/auth`)
    .send(`client_id=${linkedinClientId}`)
    .send(`client_secret=${linkedinSecretKey}`)
    .send(`code=${code}`)
}

const getProfileDetails=(token)=>{
    return request.get('https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~digitalmediaAsset:playableStreams))')
                  .set('Authorization', `Bearer ${token}`);
}


const linkedinAuth=(req,res)=>{
    const error =  req.query.error;
    if(error) res.status(500).json('Server Error');
    if(req.query.state!=='bajrang') res.status(403).json('CSRF detected');
    getAccessToken(req.query.code)
    .then(response=>{
        getProfileDetails(response.body.access_token)
        .then(data=>{
            res.render('linkedinauth',{profile:data.body});
        })
    })
}

module.exports = linkedinAuth;