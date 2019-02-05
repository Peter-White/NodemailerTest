
const express = require('express');
const config = require('./config/config');
const bodyParser = require('body-parser');
const app = express();
'use strict';
var nodemailer = require('nodemailer');

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'welotestemailsender@gmail.com',
        pass: 'zX1c99NG'
    }
});

app.post('/send', (req, res) => {
  const mailOptions = {
    from: 'welotestemailsender@gmail.com', // sender address
    to: req.body.email, // list of receivers
    subject: 'Subject of your email', // Subject line
    html: '<p>Works</p>'// plain text body
  };

  transporter.sendMail(mailOptions, function (err, info) {
     if(err)
       console.log(err)
     else
       console.log(info);
  });
});

module.exports = require('./config/express')(app, config);

app.listen(config.port, () => {
  console.log('Express server listening on port ' + config.port);
});

