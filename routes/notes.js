const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config(); 
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.DB_CONNECT);
const { ObjectId } = require("mongodb");
const { addNoteValidation } = require("../validation");


router.post("/add", async (req, res) => {

    const { error } = addNoteValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        await User.updateOne(
          { email: req.body.email },
          { $set: req.body },
          { upsert: true }
        );
        res.send("success");
    } catch (error) {
        res.status(400).send(err);
        
    }

});






module.exports = router;
