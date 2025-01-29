const Joi = require('joi');

module.exports.menuSchema = Joi.object({
    menu: Joi.object({
        judul: Joi.string().required(),
        harga: Joi.number().min(0).required(),
        waktu: Joi.string().required(),
        keterangan: Joi.string().required(),
        image: Joi.string().required()
    }).required()
});