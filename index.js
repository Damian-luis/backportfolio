const express = require("express");
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var cors = require('cors')
const app = express();

var cors = require('cors')
//app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
//app.use(cookieParser())
app.use(cors()) // Use this after the variable declaration


const PORT = process.env.PORT || 7000;
app.listen(PORT, function () {
  console.log("escuchando en el puerto " + PORT)
})


app.get('/informacion', function (req, res) {
  res.send("api funcionando correctamente")
})



app.post('/enviar', async (req, res) => {
  
  const name = req.body.name
  const message = req.body.message
  const mail = req.body.mail
console.log(name+message+name)

  function mailToMyself() {

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      // true for 465, false for other ports
      auth: {
        user: 'el.pibe.sabe.todo4@gmail.com', // generated ethereal user
        pass: 'bhfuwxfjqwgwynle', // generated ethereal password
      }

    });



    var mailOptions = {
      from: '"Portfolio" <damian.duran@webleadsgroup.com>', // sender address
      to: `damian.luis.porta@gmail.com`, // sender addresslist of receivers
      subject: "Nuevo Mensaje desde tu potfolio!", // Subject line
      // plain text body
      html: `<h4>Nombre del cliente: ${name} <br>
        Mail de contacto: ${mail}<br>
        Mensaje:</h4><br><br><br>
        <h3> ${message}</h3>`,
      // html bod

    }


  

  }



  await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailOptions, (error, info) => {
      console.log("senMail returned!");
      if (error) {
        console.log("ERROR!!!!!!", error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
});



  function mailAutoReply() {

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      // true for 465, false for other ports
      auth: {
        user: 'damian.luis.porta@gmail.com', // generated ethereal user
        pass: 'djksersjkfniyngs', // generated ethereal password
      }

    });



    var mailOptions = {
      from: '"Damian Duran" <damian.luis.porta@gmail.com>', // sender address
      to: `${mail}`, // list of receivers
      subject: "Damian Duran", // Subject line
      // plain text body
      text: "",
      html: `<div style="height:auto;width:100vw;border:solid 1px black;padding:15px;border-radius:10px;">
        
        <h2>Muchas gracias por comunicarte conmigo ☺! <h2><br>
        <h2>He recibido tu mensaje exitosamente, me pondre en contacto con vos muy pronto, muchas gracias! :) .</h2>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <h3>Damian Duran. </h3>
        
        
        </div>`// html body
    }


    transporter.sendMail(mailOptions, (error, info) => {
      console.log("senMail returned!");
      if (error) {
        console.log("ERROR!!!!!!", error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    

  }

  var mails = [mailToMyself, mailAutoReply]

try{
  for (var i = 0; i < 2; i++) {
    mails[i]()
  }
  return res.send("mensaje enviado correctamente")
}
  catch(e){
res.send(e)
  }

  

})



