const mongoose = require("mongoose");
const Restaurant = require("../models/restaurant");

//API for getting all restaurants
exports.restaurant_all = (req, res, next) => {
    Restaurant.find({}).exec((err, e) =>{
        if(err){
            res.send(err)
            return
        }
        
        if(e){
            var restaurants = "";

            //put each event detail into string
            for(i = 0; i < e.length; i++){
                restaurants += "PlaceId: " + e[i].placeId + "<br>\n" +
                "name: " + e[i].name + "<br>\n" +
                "rating: " + e[i].rating + "<br>\n" +
                "Latitude: " + e[i].latitude + "<br>\n" +
                "Longitude: " + e[i].longitude + "<br>\n" +
                "Comment: "  + e[i].comment + "<br>\n" + 
                "<br>\n"
            }
            
            res.send(restaurants)
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
            res.send(
                "PlaceId: " + e.placeId + "</br>\n" +
                "Name: " + e.name + "<br>\n" +
                "Rating: " + e.rating + "<br>\n" +
                "Latitude: " + e.latitude + "<br>\n" + 
                "Longitude: " + e.longitude + "<br>\n"
            );
		}

		else{
			res.send("The given PlaceId is not found.")
		}
    })
}