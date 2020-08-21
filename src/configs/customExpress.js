const express = require('express');
const app = express();
const consign = require('consign');

const bodyParser = require('body-parser');

customExpress = () => {

    app.use(express .json())

    consign()
        .include('controllers/public')
        .then('controllers')
        .then('models')
        .into(app)

        return app

}

module.exports  = customExpress()