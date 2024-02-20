const express = require('express');
const router = express.Router();
const Patient = require('../models/patients');
// const hopital = require('../models/hospitals');
const multer = require('multer');

//image upload
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads')
    }, 
    filename: function(req, file, cb)
    {
        cb(null, file.filename+"_"+Date.now()+"_"+ file.originalname);
    },

});

// middleware
var upload = multer({
    storage: storage,
}).single("image");

//insert an user into database route
router.post('/appointmentform',upload, (req, res) =>{
    const patient = new Patient({
        "patientName": req.body.patientName,      
        "patientAddress": req.body.patientAddress,
        "patientemail": req.body.patientemail,
        "patientPhno": req.body.patientPhno,
        "appointmentDate": req.body.appointmentDate,
        "appointmentTime": req.body.appointmentTime,        
        "patientSymptoms": req.body.patientSymptoms,
    });
    patient.save()
    .then(savedPatient => {
        req.session.message = {
            type: 'success',
            message: 'User added successfully!'
        };
        res.redirect("/patient_appointmentlist");
    })
    .catch(error => {
        res.status(500).json({ message: error.message, type: 'danger' });
    });
});

router.get('/', (req,res)=>{
    res.render("index", { title: "finalproject"});
});

//get alll users 
// router.get('/patient_appointmentlist', (req,res)=>{
//     Patient.find().exec((err, patients)=>{
//         if(err){
//             // res.json({message: err.message });     
//             res.render('error', { message: 'An error occurred while fetching patient data.' });       
//         }
//         else{
//             res.render('Appointment_detail',{
//                 title:'Patient List',
//                 patients: patients,
//             })
//         }
//     })
// });
router.get('/patient_appointmentlist', (req, res) => {
    Patient.find({})
    .then(patients => {
        console.log('Retrieved patients:', patients);
        
    })
    .catch(err => {
        console.error('Error fetching patients:', err);
        // Handle the error appropriately, such as sending an error response
    });

    
});



//login - patient
router.get('/patient', (req,res)=>{
    res.render("login_patient", { title: "login"});
});

//login patient

router.get('/hospital', (req,res)=>{
    res.render("hospital_dashboard", { title: "login"});
});

// patient signup
router.get('/signup', (req,res)=>{
    res.render("signup_patient", { title: "signup"});
});

//appoinmentform
router.get('/appointmentform', (req,res)=>{
    res.render("appoinmentForm", { title: "hospital1"});
});

router.get('/patient_appointmentlist', (req,res)=>{
    res.render('Appoinment_detail', {title:'add appoinment'});
});


// -----------------!!!!!!--------------------------------------------------------------------------------


//--clinic ---
router.get('/clinic', (req,res)=>{
    res.render("login_clinic", { title: "login"});
});

router.get('/patient_appointmentlist', (req,res)=>{
    res.render("Appointment_detail", { title: "detail"});
});
// clinic signup
router.get('/signup_clinic', (req,res)=>{
    res.render("signup_clinic", { title: "signup"});
});
// hospitaldetail
router.get('/hospitaldetail', (req,res)=>{
    res.render("hospital_detail", { title: "hospital1"});
});

module.exports = router;