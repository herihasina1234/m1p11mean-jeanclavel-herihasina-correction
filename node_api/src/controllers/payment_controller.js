const Payment = require("../models/Payment");
const Appointment = require("../models/Appointments");
const mongoose = require('mongoose');

module.exports.save = async(req, res) => {    
    paymentDate = new Date();
    let { appointment, amount } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        let pay = null;
        let appt = null;
        await Payment.create({ appointment, amount, paymentDate })
            .then( payment => {
                pay = payment
            })  
            
            //inn le new io moa?
            await Appointment.findByIdAndUpdate(appointment, { paymentStatus: true }, { new: true })
            .then(appointment => {
                if (!appointment) {                    
                    throw new Error(`no such appointment with id=${id}.`);                                    
                }
                appt = appointment;
            })                
            
            await session.commitTransaction();
            const message = "payment added and appointment updated successfully"                 
            res.status(201).json({ message: message, data: { payment: pay, appointment: appt } });
    }
    catch(error){

        await session.abortTransaction();
        res.status(400).json({message: error.message, data: error})
    }
    finally {
        // Fermeture de la session
        session.endSession();
    }

}

module.exports.find = async(req, res) => {        
    await Payment.find()
        .populate('appointment')            
        .then ( payments => {  
            const message = `payments list obtained successfully`                 
            res.status(201).json({ message: message, data: payments });
        })
        .catch( error => {
            res.status(400).json({message: error.message, data: error})
        })  
}

