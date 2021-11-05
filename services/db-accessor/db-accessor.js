const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const Joi = require('joi');

const db = require("./db");
const messagesCollectionName = "messages";
const usersCollectionName = "users";
const app = express();

// parses json data sent to us by the user
app.use(bodyParser.json());

/*****************************************************************
 * Messages Controller
 *****************************************************************/

// schema used for data validation for our todo document
const messageSchema = Joi.object().keys({
    userId: Joi.string().required(),
    content: Joi.string().required()
});

// read
app.get(`/${messagesCollectionName}`,(req,res)=>{
    db.getDB().collection(messagesCollectionName).find({}).toArray((err,documents)=>{
        if(err)
            console.log(err);
        else{
            res.json(documents);
        }
    });
});

//create
app.post(`/${messagesCollectionName}`,(req,res,next)=>{
    // Document to be inserted
    const userInput = req.body;
    console.log('Inserting a new message to DB');
    console.log(JSON.stringify(req.body));

    Joi.validate(userInput,messageSchema,(err,result)=>{
        if(err){
            const error = new Error("Invalid Input");
            error.status = 400;
            next(error);
        }
        else{
            db.getDB().collection(messagesCollectionName).insertOne(userInput,(err,result)=>{
                if(err){
                    const error = new Error("Failed to add message");
                    error.status = 400;
                    next(error);
                }
                else
                    res.json({result : result, document : result.ops[0],msg : "Successfully added message!!!",error : null});
            });
        }
    })
});


/*****************************************************************
 * Users Controller
 *****************************************************************/

// schema used for data validation for our todo document
const userSchema = Joi.object().keys({
    nickName: Joi.string().required(),
    email: Joi.string().required()
});


// read
app.get(`/${usersCollectionName}`,(req,res)=>{
    db.getDB().collection(usersCollectionName).find({}).toArray((err,documents)=>{
        if(err)
            console.log(err);
        else{
            res.json(documents);
        }
    });
});

//create
app.post(`/${usersCollectionName}`,(req,res,next)=>{
    // Document to be inserted
    const userInput = req.body;
    console.log('Inserting a new user to DB');
    console.log(JSON.stringify(req.body));

    Joi.validate(userInput,userSchema,(err,result)=>{
        if(err){
            const error = new Error("Invalid Input");
            error.status = 400;
            next(error);
        }
        else{
            db.getDB().collection(usersCollectionName).insertOne(userInput,(err,result)=>{
                if(err){
                    const error = new Error("Failed to add user");
                    error.status = 400;
                    next(error);
                }
                else
                    res.json({result : result, document : result.ops[0],msg : "Successfully added user!!!",error : null});
            });
        }
    })
});

// Middleware for handling Error
// Sends Error Response Back to User
app.use((err,req,res,next)=>{
    res.status(err.status).json({
        error : {
            message : err.message
        }
    });
})


db.connect((err)=>{
    // If err unable to connect to database
    // End application
    if(err){
        console.log('unable to connect to database');
        process.exit(1);
    }
    // Successfully connected to database
    // Start up our Express Application
    // And listen for Request
    else{
        app.listen(8002,()=>{
            console.log('connected to database, Registry listening on port 8002');
        });
    }
});
