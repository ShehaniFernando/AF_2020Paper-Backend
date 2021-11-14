//IMPORT MONGOOSE PACKAGE
const mongoose = require('mongoose');

//MODEL CLASS SCHEMA
const RoomSchema = new mongoose.Schema({
    roomNo: {type:String, required:true, trim:true},
    name: {type:String, required:true, trim:true},
    description: {type:String, required:true, trim:true},
    value: {type:Number, required:true},

    //MANY TO MANY RELATIONSHIP - GIVE REFERENCE TO PACKAGE COLLECTION
    categories: [{type: mongoose.Schema.Types.ObjectId, required:false, ref:'categories'}]
});

//SAVE TO THE DATABASE
const Room = mongoose.model('rooms', RoomSchema);

//EXPORT - IMPORTED IN THE CONTROLLER
module.exports = Room;