//create http server
//import express module
const exp = require("express");
const app = exp();

const cors=require('cors');

// Production
app.use(cors());


app.use(exp.json())
require('dotenv').config();

//import MongoClient
const { MongoClient } = require("mongodb");

// getting DBURL from .env
const DB_URL = process.env.DB_URL;

//Create MongoClient object
let mClient = new MongoClient(DB_URL);

//connect to mongodb server
mClient
  .connect()
  .then((connectionObj) => {   
    //connect to a database(slot-booking) database name and collections names are given intially at MongoDB atlas
    const fsddb=connectionObj.db('slot-booking');

    //connect to a collection
    const usersCollection=fsddb.collection('users')
    const bookedSlotsCollection = fsddb.collection('bookedSlots');

    //share collection obj to APIS
    app.set('usersCollection',usersCollection);
    app.set('bookedSlotsCollection', bookedSlotsCollection);


    console.log("Db connection success");

    //assign port numbr to http server of express app
    app.listen(4000, () => console.log("http server started on port 4000"));
  })
  .catch((err) => console.log("Error in DB connection", err));
  

//import userApp express object
const userApp = require("./APIs/userApi");

//if path starts with /user-api, forward req to userApp
app.use("/user-api", userApp);

//handling invalid path
app.use('*',(req,res,next)=>{
  console.log(req.path)
  res.send({message:`Invalid path`})
})
