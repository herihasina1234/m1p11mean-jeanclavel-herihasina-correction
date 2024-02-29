const Appointments = require("../models/Appointments");
const GeneralService = require("../services/general_service");


module.exports.registre_appointment = async(req, res) => {
    const { customer, employee, service, startDate, endDate, createdAt = new Date(), status = "new" } = req.body;

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


module.exports.appointment_list = async(req, res) => {

    try {
        const appointment = await Appointments.find()
            .populate('customer')
            .populate('employee')
            .populate('service');
        const response = {
            message: "List of available offer",
            data: appointment
        }
        res.status(201).json({ response: response });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }

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



module.exports.revenue_per_day = async(req, res) => {
    try {
        const result = await Appointments.aggregate([{
                $lookup: {
                    from: "services",
                    localField: "service",
                    foreignField: "_id",
                    as: "serviceInfo"
                }
            },
            {
                $unwind: "$serviceInfo"
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$startDate" } },
                    totalRevenue: { $sum: "$serviceInfo.price" } // Sum of service prices for the day
                }
            },
            {
                $project: {
                    _id: 0,
                    date: {
                        $dateToString: {
                            format: "%d-%b-%Y", // Format the date as 'd-Fév-Y'
                            date: { $dateFromString: { dateString: "$_id", format: "%Y-%m-%d" } }
                        }
                    },
                    totalRevenue: 1
                }
            },
            {
                $addFields: {
                    monthFormatted: {
                        $switch: {
                            branches: [
                                { case: { $eq: [{ $substr: ["$date", 3, 3] }, "Jan"] }, then: "Janv" },
                                { case: { $eq: [{ $substr: ["$date", 3, 3] }, "Feb"] }, then: "Fév" },
                                { case: { $eq: [{ $substr: ["$date", 3, 3] }, "Mar"] }, then: "Mar" },
                                { case: { $eq: [{ $substr: ["$date", 3, 3] }, "Apr"] }, then: "Avr" },
                                { case: { $eq: [{ $substr: ["$date", 3, 3] }, "May"] }, then: "Mai" },
                                { case: { $eq: [{ $substr: ["$date", 3, 3] }, "Jun"] }, then: "Jun" },
                                { case: { $eq: [{ $substr: ["$date", 3, 3] }, "Jul"] }, then: "Jul" },
                                { case: { $eq: [{ $substr: ["$date", 3, 3] }, "Aug"] }, then: "Aoû" },
                                { case: { $eq: [{ $substr: ["$date", 3, 3] }, "Sep"] }, then: "Sep" },
                                { case: { $eq: [{ $substr: ["$date", 3, 3] }, "Oct"] }, then: "Oct" },
                                { case: { $eq: [{ $substr: ["$date", 3, 3] }, "Nov"] }, then: "Nov" },
                                { case: { $eq: [{ $substr: ["$date", 3, 3] }, "Dec"] }, then: "Déc" }
                            ],
                            default: "Unknown"
                        }
                    }
                }
            },
            {
                $project: {
                    date: {
                        $concat: [
                            { $substr: ["$date", 0, 2] },
                            "-",
                            "$monthFormatted",
                            "-",
                            { $substr: ["$date", 7, 4] }
                        ]
                    },
                    totalRevenue: 1
                }
            }
        ]);

        console.log(result);
        res.status(200).json({ response: result });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}





module.exports.revenue_per_month = async(req, res) => {
    try {
        const result = await Appointments.aggregate([{
                $lookup: {
                    from: "services",
                    localField: "service",
                    foreignField: "_id",
                    as: "serviceInfo"
                }
            },
            {
                $unwind: "$serviceInfo" // Décomprimer le tableau serviceInfo
            },
            {
                $group: {
                    _id: { year: { $year: "$startDate" }, month: { $month: "$startDate" } },
                    totalRevenue: { $sum: "$serviceInfo.price" }
                }
            },
            {
                $project: {
                    _id: 0,
                    year: "$_id.year",
                    month: "$_id.month",
                    totalRevenue: 1
                }
            },
            {
                $addFields: {
                    monthFormatted: {
                        $switch: {
                            branches: [
                                { case: { $eq: ["$month", 1] }, then: "Jan" },
                                { case: { $eq: ["$month", 2] }, then: "Fev" },
                                { case: { $eq: ["$month", 3] }, then: "Mar" },
                                { case: { $eq: ["$month", 4] }, then: "Avr" },
                                { case: { $eq: ["$month", 5] }, then: "Mai" },
                                { case: { $eq: ["$month", 6] }, then: "Jun" },
                                { case: { $eq: ["$month", 7] }, then: "Jul" },
                                { case: { $eq: ["$month", 8] }, then: "Aou" },
                                { case: { $eq: ["$month", 9] }, then: "Sep" },
                                { case: { $eq: ["$month", 10] }, then: "Oct" },
                                { case: { $eq: ["$month", 11] }, then: "Nov" },
                                { case: { $eq: ["$month", 12] }, then: "Dec" }
                            ],
                            default: "Unknown"
                        }
                    }
                }
            },
            {
                $project: {
                    year: 1,
                    month: "$monthFormatted",
                    totalRevenue: 1
                }
            }
        ]);

        console.log(result);
        res.status(200).json({ response: result });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
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