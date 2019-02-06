
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
    subject: req.body.subject, // Subject line
    html: '<p>' + req.body.content + '</p>' + 
          '<img src="cid:unique@nodemailer.com">', // plain text body
    attachments: [
                  {
                    filename: 'test',
                    path: './public/img/monty.jpg',
                    contentType: 'image/jpeg'
                  },
                                    {
                    filename: 'test2',
                    path: './public/img/monty.jpg',
                    contentType: 'image/jpeg',
                    cid: 'unique@nodemailer.com'
                  }
                 ]

  };

  transporter.sendMail(mailOptions, function (err, info) {
     if(err)
       console.log(err)
     else
       console.log(info);
  });

  res.render('index', {
    title: 'Generator-Express MVC',
    saysomething: 'Email sent to ' + req.body.email
  });
});

module.exports = require('./config/express')(app, config);

app.listen(config.port, () => {
  console.log('Express server listening on port ' + config.port);
});

