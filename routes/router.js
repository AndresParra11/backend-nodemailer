const express = require("express");
const router = new express.Router();
const nodemailer = require("nodemailer");

router.post("/sendEmail", (req, res) => {
  const { firstName, lastName, cellPhone, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.USER,
      to: email,
      cc: process.env.USER,
      subject: "Contacto desde la web",
      /* text: `Nombre: ${firstName} \n Email: ${email} \n Gracias por contactarnos!`, */
      text: `Nombre: ${firstName} ${lastName} \nCelular: ${cellPhone} \nEmail: ${email} \nMensaje: ${message}.\n\n Gracias por contactarnos!`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error", error);
      } else {
        console.log("Email enviado" + info.response);
        res.status(200).json({ status: 200, info });
      }
    });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ status: 500, error });
  }
});

module.exports = router;
