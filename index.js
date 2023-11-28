// init express in app 
const express = require( 'express' );
const app = express();

// use express (get) by app 
// get have 2 parameters (path ,function(request,response){} )
app.get( "/start", (req,res) => {
    res.send("lets start with express");
} );
app.get( "/", (req,res) => {
    res.send("Root page");
} )
// run server on port 4000
app.listen( 4000, () => {
    console.log("server work successfully on port 4000")
} )
// install nodemon > npm i nodemon
// run nodemon > npx nodemon index.js

// request types (get "recieve data" ,post "send data" ,put "edit data" , delete) most commonly

// use path parameters 
app.get( "/findSumPath/:num1/:num2", ( req, res ) => {
    let total=Number(req.params.num1)+ Number(req.params.num2)
    console.log(total);
    res.send(`the total is ${total}`);
} )

// use body parameters
// first make app use body params => app.use(express.json())
app.use(express.json())
app.post( "/findSumBody", ( req, res ) => {
    let total = Number( req.body.num1 ) + Number( req.body.num2 )
    console.log( req.body );
    res.send( `the total is ${total}` );
} );
// use Query parameters and use json return
app.get( "/findSumQuery", ( req, res ) => {
    let total=Number(req.query.num1)+ Number(req.query.num2)
    console.log(req.query);
    res.json( {
        "num1":Number(req.query.num1),
        "num2":Number(req.query.num2),
        "Result":total
    });
} )
// Not important if you use react
/*
    if you want to render a webpage uou can use ejs files 
    first install it => npm i ejs
    secondly add views folder
    
*/
app.get( "/findSum/ejs/:num1/:num2", ( req, res ) => {
    let total = Number( req.params.num1 ) + Number( req.params.num2 )
    
    res.render( "addnums.ejs", {
        num1: Number( req.params.num1 ),
        num2: Number( req.params.num2 ),
        total
    } );
} );


/*
        <Start with Database>
        first start at mongoDB 
        install mongoose > npm install mongoose 
*/
// DB url connection
// mongodb+srv://ahmed:ahmed123@cluster0.vnwpnz3.mongodb.net/?retryWrites=true&w=majority

const mongoose = require( 'mongoose' );
mongoose.connect( 'mongodb+srv://ahmed:ahmed1234@cluster0.vnwpnz3.mongodb.net/?retryWrites=true&w=majority' ).then( () => {
    console.log( "success connection" );
    
} ).catch( (e) => {
    console.log( e.message);
} )

// start using models 
const Article = require( './models/Article' );
// 
app.post( "/addDefaultArticle", async( req, res ) => {
    const newArt = new Article();
    newArt.title = 'Default Article ';
    newArt.author = 'Default body ';
    newArt.body = 'Default user ';
    newArt.hidden = false;
    await newArt.save();
    res.send("Article Saved ")
} );
app.post( "/addArticleByBody", async( req, res ) => {
    const newArt = new Article();
    newArt.title = req.body.title;
    newArt.author = req.body.user;
    newArt.body = req.body.body;
    newArt.hidden = req.body.hidden;
    await newArt.save();
    res.send("Article Saved ")
} );
app.get( "/articles", async( req, res ) => {

    const articles =await Article.find();
    res.json(articles)
} );
app.get( "/article", async ( req, res ) => {

    try {
        await Article.findById(req.body.id).exec();
        const article =await Article.findById(req.body.id);
        res.json(article)
        
    } catch (error) {
        res.send( error.message );
    }
} );
app.delete( "/article/:id", async ( req, res ) => {

    try {
        await Article.findByIdAndDelete(req.params.id);
        res.send( "article deleted" );
        
    } catch (error) {
        res.send( error.message );
    }
} );

app.put( "/article/:id", async ( req, res ) => {

    try {
        if ( Article.findById( req.params.id ).exec() ) {
            const newArt = await Article.findByIdAndUpdate( req.params.id, {
                title: req.body.title,
                author: req.body.user,
                body: req.body.body,
                hidden: req.body.hidden
            } );

            res.json( newArt );
        }
        
    } catch (error) {
        res.send( error.message );
    }
} );