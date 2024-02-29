const Appointments = require("../models/Appointments");
const mongoose = require('mongoose');

module.exports.registre_appointment = async(req, res) => {
    const { customer, employee, service, startDate, endDate, createdAt = new Date(), status = false } = req.body;

    try {
        const appointment = await Appointments.create({ customer, employee, service, startDate, endDate, createdAt, status });
        const response = {
            message: "appointment added successfully",
            data: appointment
        }
        res.status(201).json({ response: response });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }

}


module.exports.save_many = async(req, res) => {
    const appointments = req.body;
    const createdAt = new Date();
    const status = false;
    const paymentStatus = false;
    let listCreated = [];
    const message = "request to add appointments completed"   
    
    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      appointments.forEach(async appointment => {         
          const customer = appointment.customer._id
          const employee = appointment.employee._id
          const service = appointment.service._id 
          const startDate = appointment.startDate
          const endDate = appointment.endDate   
          
          await Appointments.create({ customer, employee, service, startDate, endDate, createdAt, status, paymentStatus })
              .then ( app => {                   
                  listCreated.push(app);
              })                        
      });
    
      await session.commitTransaction();
    } catch (error) {
        console.log(error);
      await session.abortTransaction();

      res.status(400).json({ error: err.message });
    } finally {
      session.endSession();
    }
    
    
    res.status(201).json({ message: message, data: listCreated });
}


module.exports.appointment_list = async(req, res) => {

    try {
        const appointment = await Appointments.find()
            .populate('customer')
            .populate('employee')
            .populate('service');
        const response = {
            message: "List of available appointment",
            data: appointment
        }
        res.status(201).json({ response: response });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }

}

module.exports.findByParams = async(req, res) => {    

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const startIndex = (page - 1) * pageSize; //0

    const customer_id = req.query.customer_id

    let filter = Object.assign({}, req.query);
    delete filter.page;
    delete filter.pageSize;
    delete filter.customer_id;
    delete filter.keyword;

    await Appointments.find(filter)
    .populate('customer')
    .populate('employee')
    .populate('service')   
    .sort({ startDate: 'desc' })            
    .then ( appointments => {    
        let result = []  
        let id_filter_res = []
        //filtre pour customer_id
        if(customer_id){
            appointments.forEach(appointment => {
                if( appointment.customer._id.toString() === customer_id ) {
                    
                    id_filter_res.push(appointment)                
                }
            });
        }
        
        
        // Filtrer mot-cle
        if(req.query.keyword) {
        const regex = new RegExp(req.query.keyword, 'i'); // i: insensible à la casse
        id_filter_res.forEach(appointment => {
            if(
                regex.test(appointment.service.designation) ||
                regex.test(appointment.employee.name) ||
                regex.test(appointment.employee.firstname) 
                ) 
                result.push(appointment)                
            });
        }
        else{
            result = id_filter_res;
        }
            
        const endIndex = Math.min(startIndex + pageSize - 1, result.length - 1);
        const paginatedResult = result.slice(startIndex, endIndex + 1);
        const totalPages = Math.ceil(result.length / pageSize);
        const queryParams = Object.keys(req.query).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(req.query[key])).join(', ');
        
        message= `appointments list with params ${queryParams} obtained successfully`;
    
                    
        res.status(201).json({ message: message, data: paginatedResult, totalPages: totalPages });
        })
        .catch( error => {
            res.status(400).json({message: error.message, data: error})
        })  

}


module.exports.findByParamsEmployee = async(req, res) => {    

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const startIndex = (page - 1) * pageSize; //0

    const employee_id = req.query.employee_id;

    let filter = Object.assign({}, req.query);
    delete filter.page;
    delete filter.pageSize;
    delete filter.employee_id;
    delete filter.keyword;

    await Appointments.find(filter)
    .populate('customer')
    .populate('employee')
    .populate('service')   
    .sort({ startDate: 'desc' })            
    .then ( appointments => {    
        let result = [] 
        let after_id = []
        
        //filtre pour employee_id        
        appointments.forEach(appointment => {
            if( appointment.employee._id.toString() === employee_id ) {
                
                after_id.push(appointment)                
            }
        });
                
        // Filtrer mot-cle
        if(req.query.keyword) {
            const regex = new RegExp(req.query.keyword, 'i'); // i: insensible à la casse            
            after_id.forEach(appointment => {                
            if(
                regex.test(appointment.service.designation) ||
                regex.test(appointment.customer.name) ||
                regex.test(appointment.customer.firstname) 
                ) 
                result.push(appointment)                
            });
        }else{
            result = after_id;
        }
        
        const endIndex = Math.min(startIndex + pageSize - 1, result.length - 1);
        const paginatedResult = result.slice(startIndex, endIndex + 1);
        const totalPages = Math.ceil(result.length / pageSize);
        const queryParams = Object.keys(req.query).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(req.query[key])).join(', ');
        
        message= `appointments list of employee with params ${queryParams} obtained successfully`;
    
                    
        res.status(201).json({ message: message, data: paginatedResult, totalPages: totalPages });
        })
        .catch( error => {
            res.status(400).json({message: error.message, data: error})
        })  

}


module.exports.findCommission = async(req, res) => {        
    const employee_id = req.query.employee_id;
    const dateCommission = req.query.dateCommission;
    
    // let debut = new Date(`${dateCommission}:00z`);
    // let fin = new Date(`${dateCommission}:00z`);
    // debut.setHours(0, 0, 0, 0);
    // fin.setHours(59, 59, 59, 59);
    // console.log(debut, fin)

    const filter = { startDate: { $gte: "2024-02-01T00:00", $lte: "2024-02-01T23:59" }};
    
    await Appointments.find(filter)
    .populate('customer')
    .populate('employee')
    .populate('service')   
    .sort({ startDate: 'desc' })            
    .then ( appointments => {    
        let result = []         
        
        //filtre pour employee_id        
        appointments.forEach(appointment => {
            if( appointment.employee._id.toString() === employee_id ) {
                
                result.push(appointment)                
            }
        });                        
        
        const queryParams = Object.keys(req.query).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(req.query[key])).join(', ');
        
        message= `commission list of employee with params ${queryParams} obtained successfully`;
    
                    
        res.status(201).json({ message: message, data: result });
        })
        .catch( error => {
            res.status(400).json({message: error.message, data: error})
        })  
    }




module.exports.count_appointment_per_day = async(req, res) => {

    try {
        const result = await Appointments.aggregate([{
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$startDate" } },
                count: { $sum: 1 }
            }
        }]);

        console.log(result);
        res.status(200).json({ response: result });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }

}

module.exports.count_appointment_per_month = async(req, res) => {

    try {
        const result = await Appointments.aggregate([{
            $group: {
                _id: { $dateToString: { format: "%Y-%m", date: "$startDate" } },
                count: { $sum: 1 }
            }
        }]);

        console.log(result);
        res.status(200).json({ response: result });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }

}

module.exports.average_time_by_employee = async(req, res) => {
    try {
        const averageTimeByEmployee = await calculateAverageTimeByEmployee();
        const response = {
            message: "Average time by employee",
            data: averageTimeByEmployee
        }
        res.status(200).json({ response: response });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function calculateAverageTimeByEmployee() {
    try {
        const averageTimeByEmployee = await Appointments.aggregate([{
                $lookup: {
                    from: "users",
                    localField: "employee",
                    foreignField: "_id",
                    as: "employeeInfo"
                }
            },
            {
                $unwind: "$employeeInfo"
            },
            {
                $group: {
                    _id: {
                        employee_id: "$employee",
                        name: "$employeeInfo.name",
                        firstname: "$employeeInfo.firstname"
                    },
                    averageTime: {
                        $avg: {
                            $divide: [{ $subtract: ["$endDate", "$startDate"] }, 60000] // Conversion en minutes
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    employee_id: "$_id.employee_id",
                    name: "$_id.name",
                    firstname: "$_id.firstname",
                    averageTime: 1
                }
            }
        ]);

        return averageTimeByEmployee;
    } catch (error) {
        throw new Error('Error calculating average time by employee: ' + error.message);
    }
}


module.exports.update = async(req, res) => {
    const { id } = req.params;

    await Appointments.findByIdAndUpdate(id, req.body)
        .then(appointment => {
            if (!appointment) {                    
                throw new Error(`no such appointment with id=${id}.`);                                    
            }
            appt = appointment;
            const message = "appointment updated successfully"                 
            res.status(201).json({ message: message, data: appt });
        })    
}


module.exports.delete_appointment = async(req, res) => {
    const { id } = req.params;

    try {
        const appointment = await Appointments.findOneAndDelete({ _id: id });

        if (!appointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }

        res.status(200).json({ message: "Appointment deleted successfully", response: appointment });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}