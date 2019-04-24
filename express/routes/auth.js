const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const AuthController = require('../controllers/auth')

router.post('/signup', (req, res) => {
  AuthController.SignUp(req.body)
    .then(() => res.send('User created successfully'))
    .catch(err => res.send(err.message))
})

router.post('/login', (req, res) => {
  // contents of login route
  AuthController.Login(req.body).then(user => {
    if (user) {
      const token = jwt.sign({ ...user }, 'secret')
      return res.status(200).send(token)
    } else {
      return res.status(404).send('User could not be found')
    }
  })
})

module.exports = router
