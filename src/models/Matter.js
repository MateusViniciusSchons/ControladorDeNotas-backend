const mongoose = require('mongoose');


const matterSchema = new mongoose.Schema({
    name: String,
    grades: [{
        id: String,
        value: { type: Number, required: false },
        weight: { type: Number, required: false },
        isResponse: { type: Boolean, required: false },
    }],
    userId: mongoose.ObjectId,
    average: {
        type: Number,
        required: false,
    }
});

const Matter = new mongoose.model('Matter', matterSchema);

module.exports = Matter;