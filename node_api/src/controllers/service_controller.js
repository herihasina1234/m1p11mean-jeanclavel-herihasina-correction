const Service = require('../models/service')

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

module.exports.find = async (req, res) => {        
    await Service.find()
        .then ( services => {    
            const response = {
                message: "service list obtained successfully",
                data: services                 
            }            
            res.status(201).json({ response: response });
        })
        .catch( error => {
            res.status(400).json({message: error.message, data: error})
        })            
            
}


module.exports.findById = async (req, res) => {        
    await Service.findById(req.params.id)
        .then ( services => {    
            const response = {
                message: "service obtained successfully",
                data: services                 
            }            
            res.status(201).json({ response: response });
        })
        .catch( error => {
            res.status(400).json({message: error.message, data: error})
        })            
            
}


module.exports.search = async (req, res) => {      
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const startIndex = (page - 1) * pageSize; //0

    let filter = Object.assign({}, req.query);
    delete filter.page;
    delete filter.pageSize;

    await Service.find(filter)
        .then ( services => {  
            let result = services
            
            const endIndex = Math.min(startIndex + pageSize - 1, result.length - 1);
            const paginatedResult = result.slice(startIndex, endIndex + 1);
            const totalPages = Math.ceil(result.length / pageSize);
            
            const queryParams = Object.keys(req.query).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(req.query[key])).join(', ');            
            message= `services list with params ${queryParams} obtained successfully`;
        
                        
            res.status(201).json({ message: message, data: paginatedResult, totalPages: totalPages });
        })
        .catch( error => {
            res.status(400).json({message: error.message, data: error})
        })            
            
}

module.exports.save = async (req, res) => {
    let { designation, description, duration, price, commission, img } = req.body;

    await Service.create({ designation, description, duration, price, commission, img })
        .then ( service => {                   
            const message = "service added successfully"                 
            res.status(201).json({message: message, data: service});
        })
        .catch( error => {
            res.status(400).json({message: error.message, data: error})
        })                        
}