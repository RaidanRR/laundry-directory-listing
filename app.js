//npm init -y | npm i express mongoose ejs ejs-mate method-override joi express-session connect-flash
const express = require('express');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const ErrorHandler = require('./utils/ErrorHandler');
const app = express();

//connect to mongoose using in cmd: mongod --dbpath="c:\data\db"  using mongosh in cmd: mongosh  and then in cmd: show databases and then in cmd: use bestpoints and then in cmd: db.places.find()
mongoose.connect('mongodb://127.0.0.1/rancaklaundry')
.then((result) => {
    console.log('connected to mongodb')
}).catch((err) => {
    console.log(err)
});

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middleware
app.use(express.urlencoded({ extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'secret-unknow-region-uy2g5ghdtu43435gv4g243',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 *7,
    }
}));
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

app.get('/', (req, res) =>{
    res.render('home');
});

app.use('/menus', require('./routes/menus'));
app.use('/menus/:menu_id/reviews', require('./routes/reviews'));

app.all('*', (req, res, next) => {
    next(new ErrorHandler('Page not found', 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if(!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err });
});

app.listen(3000, () => {
    console.log('server is running on http://127.0.0.1:3000');
});