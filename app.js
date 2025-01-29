//npm i express mongoose ejs ejs-mate method-override joi
const express = require('express');
const ErrorHandler = require('./utils/ErrorHandler');
const Joi = require('joi');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const wrapAsync = require('./utils/wrapAsync');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

//models
const Menu = require('./models/menu');
const Review = require('./models/review');
//schemas
const { menuSchema } = require('./schemas/menu');
const { reviewSchema } = require('./schemas/review');


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

const validateMenu = (req, res, next) => {
    const { error } = menuSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        return next(new ErrorHandler(msg, 400));
    } else {
        next();
    }
}

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        return next(new ErrorHandler(msg, 400));
    } else {
        next();
    }
}

app.get('/', (req, res) =>{
    res.render('home');
});

app.get('/menus', wrapAsync(async (req, res) => {
    const menus = await Menu.find();
    res.render('menus/index', { menus });
}));

app.get('/menus/create', (req, res) => {
    res.render('menus/create');
});

app.post('/menus', validateMenu, wrapAsync(async (req, res, next) => {
        const menu = new Menu(req.body.menu);
        await menu.save();
        res.redirect('/menus');
}));


app.get('/menus/:id', wrapAsync(async (req, res) => {
    const menu = await Menu.findById(req.params.id).populate('reviews');
    res.render('menus/show', { menu });
}));

app.get('/menus/:id/edit', wrapAsync(async (req, res) => {
    const menu = await Menu.findById(req.params.id);
    res.render('menus/edit', { menu });
}));

app.put('/menus/:id', validateMenu, wrapAsync(async (req, res) => {
    const menu = await Menu.findByIdAndUpdate(req.params.id, { ...req.body.menu});
    res.redirect('/menus');
}));

app.delete('/menus/:id', wrapAsync(async (req, res) => {
    const menu = await Menu.findByIdAndDelete(req.params.id);
    res.redirect('/menus');
}));

app.post('/menus/:id/reviews', validateReview, wrapAsync(async (req, res) => {
    const review = new Review(req.body.review);
    const menu = await Menu.findById(req.params.id);
    menu.reviews.push(review);
    await review.save();
    await menu.save();
    res.redirect(`/menus/${req.params.id}`);
}));

app.delete('/menus/:menu_id/reviews/:review_id', wrapAsync(async (req, res) => {
    const { menu_id, review_id } = req.params;
    await Menu.findByIdAndUpdate(req.params.menu_id, { $pull: { reviews: review_id}});
    await Review.findByIdAndDelete(review_id);
    res.redirect(`/menus/${menu_id}`);
}));

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