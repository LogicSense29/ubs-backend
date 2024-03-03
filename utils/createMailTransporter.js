"use strict";
const nodemailer = require("nodemailer");

const createMailTransporter= ()=>{
    let transporter = nodemailer.createTransport(
        {
            service: "hotmail",
            auth:{
                user:"umerabusinesschool@outlook.com",
                pass:process.env.OUTLOOK_PASS
            }
        }
    )

    return transporter
}

module.exports = {createMailTransporter}