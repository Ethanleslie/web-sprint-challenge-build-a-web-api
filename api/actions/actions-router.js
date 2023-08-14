const express = require('express')
const {
    validateActionId
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

router.post('/',  (req, res, next) => {
 
})

router.put('/:id', validateActionId ,(req, res, next) => {
    
})

router.delete('/:id',validateActionId, async (req, res, next) => {
   
})



module.exports = router
