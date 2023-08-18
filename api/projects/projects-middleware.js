// add middlewares here related to projects
 const User = require('../projects/projects-model')

 async function validateProjectId( req, res, next) {
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

async function validateProject(req, res, next) {
    if(req.body.name && req.body.description && req.body.completed !== undefined){
        next()
    } else{
        next({status: 400, message: "please provide name and description for the project"})
    }
}







//   try{
//     const {name} = req.body
//     const {description} = req.body
//     console.log('name', name , "description" , description)
//     if(!name  || !description ) {
        
//         res.status(400).json({
//             message: "name is a required field"
//         })
//     } else {
//         req.name = name
//         req.name = description
//         next()
//     }
// }
// catch(err){
//     res.status(500).json({
//         message: 'problem finding project',
//     })
// }




 module.exports = {
    validateProjectId,
    validateProject,
    
 }