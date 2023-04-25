"use strict";
const sanitizeHtml = require('sanitize-html');
const nodemailer = require("nodemailer");

const format = function(fields, type="text"){
	var text = sanitizeHtml(fields.message)

	if(type == 'html'){
		return `
		<p>${fields.name}  de "${fields.organisation}" souhaite nous contacter</p>
		<p>Contacter : <a href="mailto:${fields.email}">${fields.email}</a></p>
		<h2>Message</h2>
		<p>${text}</p>
		`
	}

	return `
		${fields.name} de "${fields.organisation}" souhaite nous contacter
		Contacter :${fields.email}
		Message:
		${text}
	`
}


const sendMail = function(fields) {
	
	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		host: process.env.MAIL_HOST,
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: process.env.MAIL_USER, // generated ethereal user
			pass: process.env.MAIL_PASSWORD, // generated ethereal password
		},
		tls: {rejectUnauthorized: false}
	});

	// send mail with defined transport object
	return transporter.sendMail({
		from: process.env.MAIL_USER, // sender address
		to: process.env.MY_MAIL, // list of receivers
		subject: fields.name + " souhaite un contact ! ", // Subject line
		text: format(fields), // plain text body
		html: format(fields, 'html'), // html body
		
	});
}

// async..await is not allowed in global scope, must use a wrapper
module.exports = {
	sendMail
}