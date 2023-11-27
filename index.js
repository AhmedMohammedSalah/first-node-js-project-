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
