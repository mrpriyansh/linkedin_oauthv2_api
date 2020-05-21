const request= require('superagent');
const {linkedinClientId, linkedinSecretKey, apiUrl} = require('./config');

const getAccessToken=(code)=>{
    const r1= request.post('https://www.linkedin.com/oauth/v2/accessToken')
    .send('grant_type=authorization_code')
    .send(`redirect_uri=${apiUrl}/auth`)
    .send(`client_id=${linkedinClientId}`)
    .send(`client_secret=${linkedinSecretKey}`)
    .send(`code=${code}`)
    // console.log(r1);
    return r1;
}

const getProfileDetails=(token)=>{
    const r2= request.get('https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~digitalmediaAsset:playableStreams))')
                  .set('Authorization', `Bearer ${token}`);
    return r2;
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
    .catch((err)=>{
        console.log(err);
    })
}

module.exports = linkedinAuth;