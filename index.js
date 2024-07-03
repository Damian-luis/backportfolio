require('dotenv').config();
const express = require("express");
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 7000;

app.listen(PORT, function () {
  console.log("escuchando en el puerto " + PORT);
});

app.get('/informacion', function (req, res) {
  res.send("api funcionando correctamente");
});

app.post('/enviar', async (req, res) => {
  const { lastname, name, message, mail } = req.body;
  console.log(name + message + name);

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let mailOptions = {
    from: `"Portfolio" <${process.env.EMAIL_USER}>`,
    to: 'damian.luis.porta@gmail.com',
    subject: "Nuevo Mensaje desde tu portfolio!",
    html: `<h4>Nombre del cliente: ${name} <br>
            Mail de contacto: ${mail}<br>
            Mensaje:</h4><br><br><br>
            <h3> ${message}</h3>`,
  };

  let mailOptionsReply = {
    from: `"Damian Duran" <${process.env.EMAIL_USER}>`,
    to: mail,
    subject: "Security and System",
    html: `<h4>Mensaje recibido de: ${name} ${lastname}<br>
            Mail de contacto: ${mail}<br>
            Mensaje:</h4><br><br><br>
            <h3> ${message}</h3>
            <br><br><br>
            Este es un mensaje enviado para el examen de Security and System. Los correos van bajo solo ese propósito.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(mailOptionsReply);
    res.status(200).send("mensaje enviado correctamente");
  } catch (error) {
    console.error('Error al enviar correo:', error);
    res.status(500).send("Ocurrió un error al enviar el mensaje");
  }
});


