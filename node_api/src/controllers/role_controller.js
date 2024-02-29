const Role = require("../models/Role");

module.exports.registre_role = async(req, res) => {
    const { designation, code } = req.body;

    try {
        const role = await Role.create({ designation, code });
        const response = {
            message: "role added successfully",
            data: role
        }
        res.status(201).json({ data: response });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }

}


module.exports.role_list = async(req, res) => {

    try {
        const role = await Role.find();
        const data = {
            message: "List of roles",
            data: role
        }
        res.status(201).json({ response: data });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }

}


module.exports.find_by_designation = async(req, res) => {    
    const designation = req.params
    await Role.findOne(designation)    
    .then ( role => {  
        const message = `role obtained successfully`                 
        res.status(201).json({ message: message, data: role });
    })
    .catch( error => {
        res.status(400).json({message: error.message, data: error})
    })          
}


module.exports.delete_role = async(req, res) => {
    const { id } = req.params;

    try {
        // Utilisez la méthode findOneAndDelete pour supprimer le service par son ID
        const role = await Role.findOneAndDelete({ _id: id });

        if (!role) {
            return res.status(404).json({ error: "Role not found" });
        }

        res.status(200).json({ message: "Role deleted successfully", data: role });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}