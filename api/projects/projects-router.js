// Write your "projects" router here!
 
const express = require('express')
const {
    validateProjectId,
    validateProject,
    
} = require('./projects-middleware')

const User = require('./projects-model')

const router = express.Router()


router.get('/',  (req, res, next) => {
     User.get()
     .then(users => {
        res.json(users)
     })
     .catch(next)
})

router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.user)
    
})

router.post('/', validateProject,  (req, res, next) => {
 User.insert(req.body)
   .then(newUser => {
    res.status(201).json(newUser)
   })
   .catch(next)
})

// router.put('/:id', validateProject, validateProjectId, (req, res, next) => {
//     User.update(req.params.id, {name: req.body.name, description: req.body.description})
//     // .then(() => {
//     //     console.log('put then')
//     //     return User.get(req.params.id)
//     // })
//     .then(user => {
//         console.log('req', req.body.name, req.body.description)
//         res.json(user)
//     })
//     .catch(() => {
//         console.log('catch')
//         next()
        
//     })
    
// })
router.put('/:id', validateProjectId, validateProject, (req, res, next) => {
     const { name, description, completed} = req.body;
    console.log('req body' , req.body)
    User.update(req.params.id, {name, description, completed})
        .then(updatedProject => {
            res.json(updatedProject);
        })
        .catch(err => {
            next(err);
        });
});

router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
   const result =  await User.remove(req.params.id)
   res.json(result)
    }catch(err){
        next(err)
    }
})

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try {
        const result = await User.getProjectActions(req.params.id)
        res.json(result)
         }catch(err){
             next(err)
         }
})

module.exports = router