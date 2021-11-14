//IMPORT - FROM MODEL
const Room = require('../models/room.model');

//CREATE THE FUNCTION - TO SAVE THE ROOMS IN THE DATABASE
const createRoom = async(req, res) => {
    if(req.body) {
        const room = new Room(req.body);
        //save
        room.save()
        .then(data => {
            //200/201 = SUCCESS STATUS
            res.status(200).send({data:data});
        })
         .catch(error => {
            res.status(500).send({ error: error.message});
        });
    }
}

//FUNCTION - GET THE ROOMS
const getAllRooms = async(req,res) => {
    await Room.find({})
    .then(data => {
        //200/201 = SUCCESS STATUS
        res.status(200).send({data:data});
    })
     .catch(error => {
        res.status(500).send({ error: error.message});
    });
}

//FUNCTION - GET ALL THE ROOM DETAILS
const getRoomDetails = async (req, res) => {
    if (req.params && req.params.id) {
        const room = await Room.findById(req.params.id)
            .then(data => {
                res.status(200).send({data: data});
            })
            .catch(error => {
                res.status(500).send({error: error.message});
            });
    }
}

//DELETE - RELATED TO THE ID
const deleteRoom = async(req, res) => {
    const id = req.params.id;
  
    Room.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Room was not found! Unsuccessful deletion of Room with id=${id}.`
          });
        } else {
          res.send({
            message: "Successfully deleted the Room!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Sorry! Cannot delete theRoom with id=" + id
        });
      });
  };
  
  //UPDATE - SPECIFIED TO THE ID
  const updateRoom = async(req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data cannot be Empty for the Update!"
      });
    }
  
    const id = req.params.id;
  
    Room.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Room was not found! Unsuccessful updation of Room with id=${id}.`
          });
        } else res.send({ message: "Successfully updated the Room!" });
      })
      .catch(err => {
        res.status(500).send({
          message: "Sorry! Cannot delete the Room with id=" + id
        });
      });
  };

//EXPORT
module.exports = {
    createRoom,
    getAllRooms,
    getRoomDetails,
    updateRoom,
    deleteRoom
};
