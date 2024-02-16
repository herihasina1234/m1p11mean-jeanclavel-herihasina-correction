const Appointments = require("../models/Appointments");

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