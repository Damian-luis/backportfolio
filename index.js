const express=require("express");
const nodemailer=require('nodemailer');

const app=express();


var cors = require('cors')

app.use(cors()) // Use this after the variable declaration

app.use(express.urlencoded({ extended: true }))
const PORT=process.env.PORT ||8081;
app.listen(PORT, function(){
  console.log("escuchando en el puerto 8081")
})


app.get('/info', function(req, res){
    res.send("api funcionando correctamente")
})


app.post('/enviar',async (req, res)=>{
console.log(req.body)
const name = req.body.name
const number = req.body.number
const company = req.body.company
const message = req.body.message
  let transporter = nodemailer.createTransport({
    service: 'gmail',
      // true for 465, false for other ports
      auth: {
        user: 'damian.luis.porta@gmail.com', // generated ethereal user
        pass: 'kdvmhcvdaudmhujd', // generated ethereal password
      }
    
    });



    var mailOptions = {
      from: '"Damiancito 👻" <damian.luis.porta@gmail.com>', // sender address
      to: "damian.duran@webleadsgroup.com", // list of receivers
      subject: "Hello ✔", // Subject line
       // plain text body
       text: "Hello cit",
      html: `<h1>Hola mi nombre es ${name}, trabajo en mi empresa ${company}, me comunico por ${message}.Adicionalmente
      te dejo mi numero ${number}</h1>`// html body
    }
    
    
    transporter.sendMail(mailOptions,(error,info) => {
      console.log("senMail returned!");
      if (error) {
        console.log("ERROR!!!!!!", error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  
return res.redirect("https://example-two-smoky.vercel.app/#ContentSection6")
   
})
