const express=require("express");
const path=require("path");
const app=express();
var mongoose = require('mongoose');
mongoose.set('strictQuery',false);

const db='mongodb+srv://priyansh:9893449249@cluster0.mai7d0l.mongodb.net/signup?retryWrites=true&w=majority';
mongoose.connect(db,{ 
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connection established");
}).catch((err)=>console.log(err));  
const bodyparser=require('body-parser'); 
const port=8000;

var contactschema=new mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    password:String
  });

var contact=mongoose.model('user',contactschema);    

app.use('/static',express.static('static'))
app.use(express.urlencoded())

app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))

app.get('/',(req,res)=>{
    const params={}
     res.status(200).render('index.pug',params)  
})

app.get('/signin',(req,res)=>{
    const params={}
     res.status(200).render('signin.pug',params)     
})

app.get('/signup',(req,res)=>{
    const params={}
     res.status(200).render('signup.pug',params)  
})

app.post('/signup', (req, res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
    res.get('/home',(req,res)=>{
        const params={}
        res.status(200).render('home.pug',params)
    }).catch((err)=>{
    res.status(400).send(err)
    })
})
});

app.listen(port,()=>{
    console.log(`the application is started succesfully on ${port}`);   
})