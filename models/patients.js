const mongoose = require('mongoose');
const patientSchema = new mongoose.Schema({
    patientName:{
        type: String,
        required: true,
    },
    patientSymptoms:{
        type: String,
        required: true,
    },
    patientAddress:{
        type: String,
        required: true,
    },
    patientemail:{
        type: String,
        required: true,
    },
    patientPhno:{
        type: String,
        required: true,
    },
    appointmentTime:{
        type: String,
        required: true,
        // default: Date.now,
    },
    appointmentDate:{
        type: Date,
        required: true,
        // default: Date.now,
    },
    

});

module.exports = mongoose.model('Patient', patientSchema);