const Service = require("../models/service");

module.exports.registre_service = async(req, res) => {
    const { designation, duration, price, commission } = req.body;

    try {
        const service = await Service.create({ designation, duration, price, commission });
        const response = {
            message: "service added successfully",
            data: service
        }
        res.status(201).json({ data: response });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }

}


module.exports.service_list = async(req, res) => {

    try {
        const service = await Service.find();
        const data = {
            message: "List of services",
            data: service
        }
        res.status(201).json({ response: data });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }

}

module.exports.get_service_by_id = async(req, res) => {
    const { id } = req.params;
    try {
        const service = await Service.findById(id);
        const data = {
            message: "Service by id",
            data: service
        }
        if (!service) {
            return res.status(404).json({ error: "Service not found" });
        }

        res.status(200).json({ response: data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports.delete_service = async(req, res) => {
    const { id } = req.params;

    try {
        // Utilisez la méthode findOneAndDelete pour supprimer le service par son ID
        const service = await Service.findOneAndDelete({ _id: id });

        if (!service) {
            return res.status(404).json({ error: "Service not found" });
        }

        res.status(200).json({ message: "Service deleted successfully", data: service });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}