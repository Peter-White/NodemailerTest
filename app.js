

const express = require('express');
const config = require('./config/config');

'use strict';
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'welotestemailsender@gmail.com',
        pass: 'zX1c99NG'
    }
});

const mailOptions = {
  from: 'welotestemailsender@gmail.com', // sender address
  to: 'pwhitedeveloper@gmail.com', // list of receivers
  subject: 'Subject of your email', // Subject line
  html: '<p>Works</p>'// plain text body
};

transporter.sendMail(mailOptions, function (err, info) {
   if(err)
     console.log(err)
   else
     console.log(info);
});

const app = express();

module.exports = require('./config/express')(app, config);

app.listen(config.port, () => {
  console.log('Express server listening on port ' + config.port);
});

