const express=require("express");
const nodemailer=require('nodemailer');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');

const app=express();


var cors = require('cors')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cookieParser())
app.use(cors()) // Use this after the variable declaration


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
const email = req.body.email
  let transporter = nodemailer.createTransport({
    service: 'gmail',
      // true for 465, false for other ports
      auth: {
        user: 'webleadsgroup@gmail.com', // generated ethereal user
        pass: 'fknzicgulrqnecnkv', // generated ethereal password
      }
    
    });



    var mailOptions = {
      from: name,
      to: "damian.duran@gmail.com", // list of receivers
      subject: "Nuevo mensaje en Webleads!", // Subject line
       // plain text body
      text: "",
      html: `<div style="width:100%;height:auto; box-sizing: border-box;background-color:black;border-radius:15px;">

      <div style="justify-content:center;width:100%;height:10%;background: rgb(18,131,215);
      background: linear-gradient(90deg, rgba(18,131,215,1) 0%, rgba(204,21,58,1) 49%, rgba(232,215,18,1) 100%);">
      <h3 style="color:white;text-align: center;">Webleads Group </h3>
      </div>

      <div style="padding:20px">
      <div style="background-color: rgba(255, 255, 255, 0.37); height:80%;width:90%;border:solid 1px white;border-radius:10px;padding:10px;color:white;">
      <h4>Mensaje recibido de: ${name} <br>
          Compañía: ${company} <br>
          Numero de contacto: ${number} <br>
          Correo electrónico: ${email} <br>
          Mensaje: <br><br>
      
      <h2 style="text-align:center;">${message}</h1>
      </div> </div>
      
      </div>`// html body
    }
    
    
    transporter.sendMail(mailOptions,(error,info) => {
      console.log("senMail returned!");
      if (error) {
        console.log("ERROR!!!!!!", error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  
return res.send("Mensaje enviado exitosamente a webleads!")

   
})
