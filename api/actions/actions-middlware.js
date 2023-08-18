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
            next({status: 404, message: 'error getting project'})
        }
    }
    catch (err) { 
        next({status: 404, message: 'error finding project'})
       
    }
}

async function validateAction(req, res, next) {
    if(req.body.project_id && req.body.description && req.body.notes && req.body.completed !== undefined){
        next()
    } else{
        next({status: 400, message: "please provide name and description for the project"})
    }
  }

module.exports = {
    validateActionId,
    validateAction
}