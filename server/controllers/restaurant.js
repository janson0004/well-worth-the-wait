const mongoose = require("mongoose");
const User = require("../models/user");
const {Restaurant} = require("../models/restaurant");
const {Comment} = require("../models/restaurant");
const { spawn } = require("child_process");

//for testing if populartime_api is working *delete this when finished
exports.restaurant_test = (req, res, next) => {
    let dataset = [];
    const python = spawn("python3", ["populartimes_api.py", req.params['placeId']]);

    python.stdout.on("data", (data) => {
        dataset.push(data);
    })

    python.on("close", (code) => {
        res.json(JSON.parse(dataset.join("")))
    })   
}

//API for getting restaurant waiting time (all wait-time on that day and wait-time on that hour over the week)
exports.restaurant_time = (req, res, next) => {
    let dataset = [];
    const python = spawn("python3", ["populartimes_api.py", req.params['placeId']]);

    python.stdout.on("data", (data) => {
        dataset.push(data);
    })

    python.on("close", (code) => {
        dataset = JSON.parse(dataset.join(""))
        
        let date = new Date()
        let d = date.getDay() || 7 - 1
        let h = date.getHours()
        let day_wait = []
        let seven_day_wait = []

        dataset = dataset.time_wait

        for (let day in dataset) {
            var object = dataset[day];
            var data = object.data

            for(let hour in data){

                if(day == d){
                    day_wait.push(data[hour])
                }

                if(hour == h){
                    seven_day_wait.push(data[hour])
                }
            }          
        }  
    
        res.json({day_wait, seven_day_wait})
    });
}

//API for creating new restaurant
exports.restaurant_create = (req, res, next) => {
    Restaurant.findOne({ placeId: req.body.placeId}).then((exist) => {
        if (exist != null) {
          return res.status(409).json({
            message: "Duplicate placeId",
          });
        } 
        else {
            let dataset = [];
            const python = spawn("python3", ["populartimes_api.py", req.body['placeId']]);
        
            python.stdout.on("data", (data) => {
                dataset.push(data);
            });
        
            python.on("close", (code) => {
                dataset = JSON.parse(dataset.join(""))

                const restaurant = new Restaurant({
                    _id: new mongoose.Types.ObjectId(),
                    placeId: dataset.id,
                    name: dataset.name,
                    rating: dataset.rating,
                    latitude: dataset.coordinates.lat,
                    longitude: dataset.coordinates.lng,
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
            });
            
        }
    })
}

//API for creating restaurant comment
exports.restaurant_comment = (req, res, next) => {
    User.findById(req.userData.userId)
        .then((user) => {
            const comment = new Comment({
                _id: new mongoose.Types.ObjectId(),
                username: user.username,
                created_time: new Date(),
                message: req.body['message'],
            })

            comment
                .save()
                .then((result) => {
                    Restaurant.findOneAndUpdate({placeId: req.body['placeId']}, { $push: {comment: result} })
                    .then((e) => {
                        res.status(201).json({
                            message: "Comment saved",
                        });
                    })
                    .catch((err) => {
                        res.status(500).json({
                            error: err,
                            message: "Database error",
                        });
                    });
                            
                })

        .catch((err) => {
        res.status(500).end(err);
        });
    })   

   
}

//API for getting all restaurants
exports.restaurant_all = (req, res, next) => {
    Restaurant.find({}).exec((err, e) => {
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
			res.status(500).json({
                error: err,
                message: "Database error",
            });
		}
		
		if(e){
            res.status(200).json(e);
		}

		else{
			return res.status(401).json({
                message: "Restaurant does not exist",
              });
		}
    })
}

//API for updating restaurant
exports.restaurant_update = (req, res, next) => {
    Restaurant.findOneAndUpdate({placeId: req.params['placeId']}, { $set: {name: req.body['name'], rating: req.body['rating']} })
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
    Restaurant.findOneAndRemove({placeId: req.params['placeId']})
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