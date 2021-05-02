const mongoose = require("mongoose");
const Restaurant = require("../models/restaurant");

//API for creating new restaurant
exports.restaurant_create = (req, res, next) => {
    Restaurant.findOne({ placeId: req.body.placeId}).then((exist) => {
        if (exist != null) {
          return res.status(409).json({
            message: "Duplicate placeId",
          });
        } 
        else {
            const restaurant = new Restaurant({
                _id: new mongoose.Types.ObjectId(),
                placeId: req.body.placeId,
                name: req.body.name,
                rating: req.body.rating,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
            });

            restaurant
                .save()
                .then((result) => {
                    res.status(201).json({
                        message: "Restaurant created",
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        error: err,
                        message: "Database error",
                    });
                });
        }
    })
    
}

//API for getting all restaurants
exports.restaurant_all = (req, res, next) => {
    Restaurant.find({}).exec((err, e) =>{
        if(err){
            res.send(err)
            return
        }
        
        if(e){
            res.status(200).json(e);
        }
    })
    
}

//API for getting specified restaurant
exports.restaurant_one = (req, res, next) => {
    Restaurant.findOne({placeId: req.params['placeId']}, (err, e) => {
        if(err){
			res.send(err)
			return
		}
		
		if(e){
            res.status(200).json(e);
		}

		else{
			res.send("The given PlaceId is not found.")
		}
    })
}

//API for updating restaurant
exports.restaurant_update = (req, res, next) => {
    Restaurant.findOneAndUpdate({placeId: req.params['placeId']}, { $set: {name: req.body['name'], rating: req.body['rating']} })
        .exec()
        .then((result) => {
            res.status(201).json({
                message: "Restaurant updated",
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
                message: "Database error",
            });
        });
}

//API for deleting restaurant
exports.restaurant_delete = (req, res, next) => {
    Restaurant.findOneAndRemove({placeId: req.params['placeId']}).exec()
        .then((result) => {
            res.status(201).json({
                message: "Restaurant deleted",
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
                message: "Database error",
            });
        });
}