//IMPORT - FROM MODEL
const Category = require('../models/category.model');

//CREATE THE FUNCTION - TO SAVE THE PACKAGES IN THE DATABASE
const createCategory = async(req, res) => {
    if(req.body) {
        const category = new Category(req.body);
        //SAVE - RETURNS A PROMISE
        //AWAIT
        await category.save()
        .then(data => {
            //200/201 = SUCCESS STATUS
            res.status(200).send({data:data});
        })
         .catch(error => {
            res.status(500).send({ error: error.message});
        });
    }
}

//CREATE THE FUNCTION - TO GET ALL THE PACKAGES
const getAllCategories = async(req,res) => {
    await Category.find({}).populate('rooms', 'roomNo name description value')
    .then(data => {
        //200/201 = SUCCESS STATUS
        res.status(200).send({data:data});
    })
     .catch(error => {
        res.status(500).send({ error: error.message});
    });
}

//FUNCTION - GET ALL THE PACKAGE DETAILS
const getCategoryDetails = async (req, res) => {
    if (req.params && req.params.id) {
        const category = await Category.findById(req.params.id)
            .then(data => {
                res.status(200).send({data: data});
            })
            .catch(error => {
                res.status(500).send({error: error.message});
            });
    }
}


//CREATE THE FUNCTION - RETURN THE VEHICLES WHEN THE PACKAGE IS GIVEN
const getRoomsForCategory = async(req, res) => {
    if(req.params && req.params.id) {
        await Category.findById(req.params.id)
        .populate('rooms', 'roomNo name description value')
        .then(data => {
            //200/201 = SUCCESS STATUS
            res.status(200).send({rooms:data.rooms});
        })
        .catch(error => {
            res.status(500).send({ error: error.message});
        });

    }
}

//CALCULATION - CALCULATE THE PAYMENT BASED ON THE ROOMS AND CategoryS
const calculatePayment = async (req, res) => {
    if (req.body) {
        const roomValue = req.body.roomValue;
        const categoryValue = req.body.categoryValue;
        const duration = req.body.duration;

        const totalCost = duration * (roomValue + categoryValue);
        res.status(200).send({data: totalCost});
    }
}

//EXPORT
module.exports = {
    createCategory,
    getAllCategories,
    getCategoryDetails,
    getRoomsForCategory,
    calculatePayment
};
