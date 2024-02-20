const mongoose = require('mongoose');
const hospitalSchema = new mongoose.Schema({
    hospitalName:{
        type: String,
        required: true,
    },
    hospitalAbout:{
        type: String,
        required: true,
    },
    hospitalAddress:{
        type: String,
        required: true,
    },
    hospitalemail:{
        type: String,
        required: true,
    },
    hospitalPhno:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    establishDate:{
        type: Date,
        required: true,
        // default: Date.now,
    },
    openingTime:{
        type: String,
        required: true,
    },

});

module.exports = mongoose.model('hopital',hospitalSchema);