const CustomerPreference = require("../models/CustomerPreference");

module.exports.registre_customer_preference = async(req, res) => {
    const { customer, employee, service } = req.body;

    try {
        const customerPreference = await CustomerPreference.create({ customer, employee, service });
        const response = {
            message: "appointment added successfully",
            data: customerPreference
        }
        res.status(201).json({ response: response });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }

}


module.exports.customer_preference_list = async(req, res) => {

    try {
        const customerPreference = await CustomerPreference.find()
            .populate('customer')
            .populate('employee')
            .populate('service');
        const response = {
            message: "List of  customer preference",
            data: customerPreference
        }
        res.status(201).json({ response: response });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }

}

module.exports.delete_customer_preference = async(req, res) => {
    const { id } = req.params;

    try {
        const customerToDeleted = await CustomerPreference.findOneAndDelete({ _id: id });

        if (!customerToDeleted) {
            return res.status(404).json({ error: "Customer preference not found" });
        }

        res.status(200).json({ message: "Customer preference deleted successfully", response: customerToDeleted });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}