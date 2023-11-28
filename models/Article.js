const mongoose = require( 'mongoose' );

const Schema = mongoose.Schema
const articleSchema = new Schema( {
    title: String, // String is shorthand for {type: String}
    author: String,
    body: String,
    // comments: [{ body: String, date: Date }],
    publishDate: { type: Date, default: Date.now },
    hidden: Boolean,
    // meta: {
    //     votes: Number,
    //     favs: Number
    // }
} );

const Article = mongoose.model( 'article', articleSchema );

module.exports = Article;
