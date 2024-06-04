const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    country: String,
    resort: String,
    hotel: String,
    room: String
});

//new class declaration
const clientSchema = new mongoose.Schema({
    name: String,
    city: String,
    egn: Number,
    activity: {
        type: [String],
        //validating strings
        enum: {
            values: ['ski', 'hiking', 'swimming', 'nightlife'],
            message: 'Not valid activity'
        }
    },
    trip: {
        //reference to another schema
        type: tripSchema
    }
});

//can attach methods to the schema
clientSchema.methods.greet = function () {
    console.log(`Hello, I\'m ${this.name}`);
}

//creating a getter / setter which will not be displayed in the db
clientSchema.virtual('infoPerson').get(function () {
    return `My name is ${this.name} and I'm planing a trip to ${this.trip.resort} for ${this.activity}.`
});

//create model
const Trip = mongoose.model('Client', clientSchema);

module.exports = { Trip };