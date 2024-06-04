const mongoose = require('mongoose');
const { Trip } = require('./models/trips');

async function connectDb() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/db');
        console.log('Db connected successfully');

        // trip.find has all kinds of methods
        const members = await Trip.find();
        // members.forEach((m) => console.log(m.infoPerson)); //calling the virtual property
        // members.forEach((m) => m.activity.push('tennis')); //adding new activities in the array

        //CRUD
        //Create
        const firstTrip = await Trip.create({
            name: 'Mimi',
            city: 'Sofia',
            egn: 8608269360,
            activity: ['ski', 'swimming'],
            trip: {
                country: 'France',
                resort: 'Val Thorens',
                hotel: 'Balcones',
                room: '5 pax'
            }
        });

        //new variant of Create
        const anotherTrip = new Trip({
            name: 'Pesho',
            city: 'Plovdiv',
            egn: 9608235360,
            activity: ['ski', 'hiking'],
            trip: {
                country: 'France',
                resort: 'Les Sybelles',
                hotel: 'Varet',
                room: '4 pax'
            }
        });
        await anotherTrip.save();

        //Read (extract data)
        // Trip.find({});
        //Trip.findOne({condition}, {option}) === const person = await Trip.findOne({"name": "Pesho"}, {"activity": "hiking"});
        //Trip.findById(id, {options})

        //Update (modify data)
        // const updated = await Trip.findOneAndUpdate({ "name": "Mimi" }, { "name": "Penka" })
        // Trip.updateMany({ filter }, { $set: { name: "Something" } })
        // Trip.updateOne({ filter }, { $set: { name: "Something" } })

        //Delete (remove data)
        // Trip.findByIdAndDelete(id);
        // Trip.deleteOne();
        // Trip.deleteMany()

        await mongoose.disconnect();

    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

connectDb();
