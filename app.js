const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express();
const port = 80;
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true})
// Here test is the name of the database so  we will write contactdance which is the name of thhe database
const mongoose = require('mongoose');
// const bodyparser = require('body-parser');
mongoose.connect('mongodb://localhost:27017/login', {useNewUrlParser: true, useUnifiedTopology: true})

//  Define mongoose schema
const contactSchema = new mongoose.Schema({
  name: String,
  Email: String,
  contact: String,
  Stream: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'))
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') 
app.set('views', path.join(__dirname,'views')) 

// ENDPOINTS
app.get('/',(req,res)=>{
    res.status(200).render('login.pug');
  })
app.post('/login',(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
      res.status(200).render('Survey.pug');
    }).catch(()=>{
      res.status(400).send("Item was not saved to the database")
    })
  })


//   START THE SERVER
  app.listen(port, () => {
    console.log(`the application started sucessfully on port ${port}`)
  })