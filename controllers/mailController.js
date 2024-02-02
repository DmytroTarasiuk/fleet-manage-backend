const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const ejs = require("ejs");
const fs = require("fs");

dotenv.config();

const sendEmail = async (req, res) => {
  try {
    const { to, subject, data } = req.body;

    const dataToSend = {
      obrotBolt: data.profitBolt || 0,
      gotowkaBolt: data.cashBolt || 0,
      bonusBolt: data.bonusBolt || 0,
      obrotUber: data.profitUber || 0,
      gotowkaUber: data.cashUber || 0,
      bonusUber: data.bonusUber || 0,
      obrotFn: data.profitFn || 0,
      gotowkaFn: data.cashFn || 0,
      bonusFn: data.bonusFn || 0,
      vat: data.vat || 0,
      vatBonus: data.vatBonus || 0,
      prowizja: data.comission || 0,
      wynajem: data.rent || 0,
      regulacja: data.adjustments || 0,
      wyplata: data.salary || 0,
    };

    const htmlTemplate = fs.readFileSync(
      "./templates/emailTemplate.ejs",
      "utf-8"
    );

    const renderedHtml = ejs.render(htmlTemplate, dataToSend);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
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
