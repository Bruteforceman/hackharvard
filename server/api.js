const router = require('express').Router()
const { registerUser, loginUser, ensureLoggedin } = require('./auth')
router.get('/demo', (req, res) => {
  return res.json({
    success: true,
    message: "This is a JSON object"
  })
})

router.post('/register', registerUser)
router.post('/login', loginUser)

router.get('/whoami', (req, res) => {
  if(req.session.user) {
    return res.json(req.session.user)
  } else {
    return res.json({
      email: "",
      university: ""
    })
  }
})

module.exports = router
