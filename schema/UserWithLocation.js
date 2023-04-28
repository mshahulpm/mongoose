const sampleData = [{
    name: 'Sophie Walker',
    location: {
        type: 'Point',
        coordinates: [84.5488, 27.9263],
    },
},
{
    name: 'Eva Ford',
    location: {
        type: 'Point',
        coordinates: [84.3293, 27.9399],
    },
},
{
    name: 'Ralph Barnes',
    location: {
        type: 'Point',
        coordinates: [83.7899, 27.8132],
    },
},
{
    name: 'Abigail Brown',
    location: {
        type: 'Point',
        coordinates: [85.4707, 28.5321],
    },
},
{
    name: 'Landon Powell',
    location: {
        type: 'Point',
        coordinates: [87.2775, 28.0978],
    },
},
{
    name: 'Madeline Cruz',
    location: {
        type: 'Point',
        coordinates: [83.4228, 29.1263],
    },
},
{
    name: 'Ethan Bailey',
    location: {
        type: 'Point',
        coordinates: [83.3003, 28.3268],
    },
},]
require('dotenv').config()
const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect(process.env.mongo_url)

const UserLocationSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
});

UserLocationSchema.index({ location: '2dsphere' });

const UserLocation = mongoose.model('UserWithLocation', UserLocationSchema);

(async () => {

    const userCount = await UserLocation.count()
    if (!userCount) {
        await UserLocation.create(sampleData)
    }
    const center = {
        type: 'Point',
        coordinates: [85.3188, 27.7172]
    };

    const population = await UserLocation.aggregate([
        {
            $geoNear: {
                near: center,
                distanceField: 'distance',
                maxDistance: 1000000,
                spherical: true,
            },
        },
        {
            $group: {
                _id: null,
                totalPopulation: { $sum: 1 },
            },
        },
    ])
    console.log({ population, userCount })
})();