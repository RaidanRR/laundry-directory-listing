const mongoose = require('mongoose');
const { param } = require('../routes/menus');

module.exports = (redirectUrl = '/') => {
    return async (req, res, next) => {
        const paramId = ['id', 'menu_id', 'review_id'].find(param => req.params[param]);
        if(!paramId){
            return next();
        }

        const id = req.params[paramId];
        if(!mongoose.Types.ObjectId.isValid(id)){
            req.flash('error_msg', 'Invalid Id / data tidak ditemukan');
            return res.redirect(redirectUrl);
        }
        next();
    }
}