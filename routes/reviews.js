const express = require('express');
//models
const Menu = require('../models/menu');
const Review = require('../models/review');
//schemas
const { reviewSchema } = require('../schemas/review');
//utils
const wrapAsync = require('../utils/wrapAsync');
//errorhandler
const ErrorHandler = require('../utils/ErrorHandler');
//router
const router = express.Router({mergeParams: true});
//middleware
const isValidObjectId = require('../middleware/isValidObjectId');

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        return next(new ErrorHandler(msg, 400));
    } else {
        next();
    }
}

router.post('/', isValidObjectId('/menus'), validateReview, wrapAsync(async (req, res) => {
    const review = new Review(req.body.review);
    const menu = await Menu.findById(req.params.menu_id);
    menu.reviews.push(review);
    await review.save();
    await menu.save();
    req.flash('success_msg', 'Review added successfully')
    res.redirect(`/menus/${req.params.menu_id}`);
}));

router.delete('/:review_id', isValidObjectId('/menus'), wrapAsync(async (req, res) => {
    const { menu_id, review_id } = req.params;
    await Menu.findByIdAndUpdate(req.params.menu_id, { $pull: { reviews: review_id}});
    await Review.findByIdAndDelete(review_id);
    req.flash('success_msg', 'Review deleted successfully')
    res.redirect(`/menus/${menu_id}`);
}));

module.exports = router;