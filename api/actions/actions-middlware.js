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

async function validateAction(req, res, next) {
    try{
      const {project_id} = req.body
      const {description} = req.body
      const {notes} = req.body
      
      if(!project_id  || !description || !notes ) {
          res.status(400).json({
              message: "name is a required field"
          })
      } else {
          req.project_id = project_id
          req.description = description
          req.notes = notes
          next()
      }
  }
  catch(err){
      res.status(500).json({
          message: 'problem finding project',
      })
  }
  }

module.exports = {
    validateActionId,
    validateAction
}