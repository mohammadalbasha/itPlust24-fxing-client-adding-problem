import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";


const transport = new SMTPTransport({
    name: "mohammad",
    host: process.env.MAIL_HOST!,
    port: +process.env.MAIL_PORT!,
    secure: process.env.MAIL_IS_SECURE == 'false' ? false : true,
    auth: {
      user: process.env.MAIL_AUTH_USER,
      pass: process.env.MAIL_AUTH_PASSWORD,
    },
});
console.log(transport)
const transporter = nodemailer.createTransport(transport);
export default transporter;