const express = require('express')
const {
    validateActionId,
    validateAction
} = require('./actions-middlware')

const User = require('./actions-model')

const router = express.Router()


router.get('/',  (req, res, next) => {
    User.get()
    .then(users => {
       res.json(users)
    })
    .catch(next)
})

router.get('/:id', validateActionId, (req, res) => {
    res.json(req.user)
})

router.post('/', validateAction, (req, res, next) => {
    User.insert(req.body)
    .then(newUser => {
     res.status(201).json(newUser)
    })
    .catch(next)
 })


router.put('/:id', validateActionId, validateAction, (req, res, next) => {
    const { project_id , description, notes, completed} = req.body;
    console.log('req body' , req.body)
    User.update(req.params.id, {project_id, description, notes, completed})
        .then(updatedProject => {
            res.json(updatedProject);
        })
        .catch(err => {
            next(err);
        });
})

router.delete('/:id', validateActionId, async (req, res, next) => {
    try {
        const result =  await User.remove(req.params.id)
        res.json(result)
         }catch(err){
             next(err)
         }
})



module.exports = router
