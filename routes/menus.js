const express = require('express');
//models
const Menu = require('../models/menu');
//schemas
const { menuSchema } = require('../schemas/menu');
//utils
const wrapAsync = require('../utils/wrapAsync');
//errorhandler
const ErrorHandler = require('../utils/ErrorHandler');
//router
const router = express.Router();
const isValidObjectId = require('../middleware/isValidObjectId');

const validateMenu = (req, res, next) => {
    const { error } = menuSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        return next(new ErrorHandler(msg, 400));
    } else {
        next();
    }
}

router.get('/', wrapAsync(async (req, res) => {
    const menus = await Menu.find();
    res.render('menus/index', { menus });
}));

router.get('/create', (req, res) => {
    res.render('menus/create');
});

router.post('/', validateMenu, wrapAsync(async (req, res, next) => {
        const menu = new Menu(req.body.menu);
        await menu.save();
        req.flash('success_msg', 'Menu added successfully')
        res.redirect('/menus');
}));

router.get('/:id', isValidObjectId('/menus'),wrapAsync(async (req, res) => {
    const menu = await Menu.findById(req.params.id).populate('reviews');
    res.render('menus/show', { menu });
}));

router.get('/:id/edit', isValidObjectId('/menus'),wrapAsync(async (req, res) => {
    const menu = await Menu.findById(req.params.id);
    res.render('menus/edit', { menu });
}));

router.put('/:id', isValidObjectId('/menus'), validateMenu, wrapAsync(async (req, res) => {
    const menu = await Menu.findByIdAndUpdate(req.params.id, { ...req.body.menu});
    req.flash('success_msg', 'Menu updated successfully')
    res.redirect(`/menus/${req.params.id}`);
}));

router.delete('/:id', isValidObjectId('/menus'), wrapAsync(async (req, res) => {
    const menu = await Menu.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Menu deleted successfully')
    res.redirect('/menus');
}));

module.exports = router;