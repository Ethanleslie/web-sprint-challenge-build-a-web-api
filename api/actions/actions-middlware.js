// add middlewares here related to actions
const User = require('./actions-model')


async function validateActionId( req, res, next) {
    try{
        const user = await User.get(req.params.id)
        console.log('user' , user)
        if(user){
            req.user = user
            next()
        
        }else{
            next({message: 'error getting project'})
        }
    }
    catch (err) { 
        next({message: 'error finding project'})
       
    }
}

module.exports = {
    validateActionId
}