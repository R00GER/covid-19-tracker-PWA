const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const newsItemSchema = new Schema({
    title: {type: String},
    desc: {type: String},
    date: {type: Date},
    link: {type: String},
})

module.exports = mongoose.model('NewsItem', newsItemSchema);