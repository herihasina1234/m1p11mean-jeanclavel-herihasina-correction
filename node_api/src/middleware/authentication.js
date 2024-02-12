const jwt = require('jsonwebtoken')
const global_constants = require('./global_constants')

module.exports = (req, res, next) => {
    const authorizationHeader = req.headers.authorization
    
    if(!authorizationHeader){
        const message = `Vous n'avez pas fourni de jeton d'authentification. Veuiller vous identifier.`
        return res.status(401).json({message})
    }

    const token = authorizationHeader.split(' ')[1]
    const decodedToken = jwt.verify(token, global_constants.private_key, (error, decodedToken) => {
        if (error){
            const message = `L'utilisateur n'est pas autorise a acceder a cette ressource.`
            return res.status(401).json({message, data: error})
        }

        const userId = decodedToken.userId
        if(req.body.userId && req.body.userId !== userId){
            const message =`L'identifiant de l'utilisateur est invalide.`
            res.status(401).json({message})
        }else{
            next()
        }
    })
}