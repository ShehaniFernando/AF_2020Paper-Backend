//API ENDPOINT
//IMPORT
const express = require('express');
const router = express.Router();
const controller = require('../controllers/room.controller');

//EXPORT
module.exports = function(){
    router.post('/create', controller.createRoom);
    router.get('/', controller.getAllRooms);
    router.get('/:id', controller.getRoomDetails);
    router.put("/u2/:id", controller.updateRoom);
    router.delete("/d2/:id", controller.deleteRoom);
    return router;
}

