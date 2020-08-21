const nodemailer = require('nodemailer');
const path = require('path');
const hbs = require('nodemailer-express-handlebars');
const exphbs = require('express-handlebars');

const { host, port, user, pass } = require('../configs/mail.json');
const { resolve } = require('path');

const transport = nodemailer.createTransport({
    host,
    port,
    auth: { user, pass }
});

const viewPath = resolve('./src/resources/mail/')

transport.use('compile', hbs({
    viewEngine: exphbs.create({
        layoutsDir:viewPath,
        defaultLayout:'forgot_password',
        extname:'.hbs'
    }) ,
    viewPath,
    extName: '.hbs',
}));

module.exports = transport;