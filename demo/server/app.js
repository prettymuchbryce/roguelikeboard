var express = require('express');
var bodyParser = require('body-parser')
var router = require('./router.js');
var app = express();

app.use('/building/roguelikeboard', express.static('./static'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/templates/');

app.use(bodyParser.json());
app.use (function (error, req, res, next){
    //Catch json error
    if (error.status === 400) {
        res.status(400).send('Sorry. Something went wrong.');
        logger.log.warn('JSON Error', error);
    }
});

router.route(app);

app.listen(3006);