const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const ejs = require("ejs");
const fs = require("fs");

dotenv.config();

const sendEmail = async (req, res) => {
  try {
    const { to, subject } = req.body;

    const data = {
      obrotBolt: 797.61,
      gotowkaBolt: 797.61,
      bonusBolt: 797.61,
      obrotUber: 500.0,
      gotowkaUber: 500.0,
      bonusUber: 500.0,
      obrotFn: 0,
      gotowkaFn: 0,
      bonusFn: 0,
      vat: 278,
      prowizja: 40,
      wynajem: 0,
      regulacja: 0,
      wyplata: 2000,
    };

    const htmlTemplate = fs.readFileSync(
      "./templates/emailTemplate.ejs",
      "utf-8"
    );

    const renderedHtml = ejs.render(htmlTemplate, data);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "dmytro.tarasiuk1899@gmail.com",
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: "dmytro.tarasiuk1899@gmail.com",
      to,
      subject,
      html: renderedHtml,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info);

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  sendEmail,
};
