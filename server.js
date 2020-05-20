const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const linkedinAuth = require('./linkedinAuth.js');

const port = 4000;

const app = express();

app.set('view engine', 'ejs');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req,res)=>{
    res.status(200).json('Welcome laundooooo!!');
})

app.get('/auth',(req,res)=>{
    // res.json(req.query);
    linkedinAuth(req,res);
})

app.listen(port,()=>{
    console.log('Backend  Server is running on ',port );
})