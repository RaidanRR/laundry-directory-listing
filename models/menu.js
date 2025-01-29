const mongoose = require('mongoose');
const Review = require('./review');
const { ref } = require('joi');
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    judul: String,
    harga: Number,
    waktu: String,
    keterangan: String,
    image: String,
    reviews:[{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
});

menuSchema.post('findOneAndDelete', async function(doc) {
    if(doc){
        await Review.deleteMany({ _id: {$in: doc.reviews} })
    }
});

module.exports = mongoose.model('Menu', menuSchema);