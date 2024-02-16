const CustomerPreference = require("../models/CustomerPreference");
const EmployeeService = require("../models/EmployeeService");

module.exports.registre_employee_service = async(req, res) => {
    const { employee, service } = req.body;

    try {
        const employeeService = await EmployeeService.create({ employee, service });
        const response = {
            message: "employee added in to service successfully",
            data: employeeService
        }
        res.status(201).json({ response: response });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }

}


module.exports.employee_service_list = async(req, res) => {

    try {
        const employeeService = await EmployeeService.find()
            .populate('employee')
            .populate('service');
        const response = {
            message: "List of  employee in service",
            data: employeeService
        }
        res.status(201).json({ response: response });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }

}

module.exports.delete_employee_service = async(req, res) => {
    const { id } = req.params;

    try {
        const employeeServiceToDeleted = await EmployeeService.findOneAndDelete({ _id: id });

        if (!employeeServiceToDeleted) {
            return res.status(404).json({ error: "employee service not found" });
        }

        res.status(200).json({ message: "Employee service deleted successfully", response: employeeServiceToDeleted });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}