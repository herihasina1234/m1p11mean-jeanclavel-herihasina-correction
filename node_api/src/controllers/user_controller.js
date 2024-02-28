const bcrypt = require('bcryptjs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const global_constants = require('../middleware/global_constants')
const { sendMail } = require('../services/general_service')

module.exports.login = async(req, res) => {
    const { email, password } = req.body
    console.log({ email, password })
    await User.findOne({ email })
        .then(user => {
            if (user === null) {
                const message = `L'utilisateur n'existe pas.`
                return res.status(404).json({ message })
            }

            //bcrypt.compare(pass en claire, pass en hash)
            bcrypt.compare(req.body.password, user.password)
                .then(isPasswordValid => {
                    if (!isPasswordValid) {
                        const message = `Le mot de passe est incorrect.`
                        return res.status(401).json({ message })
                    }

                    //JWT
                    const token = jwt.sign({ userId: user.id }, //identifiant unique de l'utilisateur
                        global_constants.private_key, //clef secrete 
                        { expiresIn: '24h' } //duree de validite
                    )

                    const message = `L'utilisateur est connecte avec succes.`
                    return res.json({ message, data: user, token })
                })
        })
        .catch(error => {
            const message = `L' utilisateur n'a pas pu etre connecte. Reessayez dans quelques instants.`
            res.status(500).json({ message, data: error })
        })
}

module.exports.save = async(req, res) => {
    const salt = await bcrypt.genSalt();
    let { email, password, name, firstname, role } = req.body;

    //encrypt password
    bcrypt.hash(password, salt)
        .then(async hash => {
            //save user
            password = hash
            await User.create({ email, password, name, firstname, role })
                .then(user => {
                    const message = "user added successfully"
                    res.status(201).json({ message: message, data: user });
                })
                .catch(error => {
                    return res.status(400).json({ message: error.message, data: error })
                })
        })
}

module.exports.find = async(req, res) => {

    await User.find()
        .then(users => {
            const response = {
                message: "list obtained successfully",
                data: users
            }
            res.status(201).json({ response: response });
        })
        .catch(error => {
            return res.status(400).json({ message: error.message, data: error })
        })

}

module.exports.findByRole = async(req, res) => {
    const { id } = req.params;
    try {
        const users = await User.find({ role: id }).populate('role');
        const response = {
            message: "List obtained successfully",
            data: users
        };
        res.status(200).json({ response: response });
    } catch (error) {
        res.status(400).json({ message: error.message, data: error });
    }
};

module.exports.sendMail = async(req, res) => {
    // try {
    await sendMail('ainafitiavana0120@gmail.com', 'Bienvenue!', 'Votre compte a été créé avec succès.');
    const response = {
        message: "envoie mail success",
    };
    res.status(201).json(response);
    // } catch (error) {
    //     res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'e-mail.', error });
    // }
};