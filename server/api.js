const router = require('express').Router()
const User= require('./user')
const { registerUser, loginUser, ensureLoggedin } = require('./auth')
router.get('/demo', (req, res) => {
  return res.json({
    success: true,
    message: "This is a JSON object"
  })
})

router.post('/register', registerUser)
router.post('/login', loginUser)

router.get('/whoami',ensureLoggedin, async(req, res) => {
    const email = req.session.user.email;
    const user = await User.findOne({
      email: email  
    })
    res.json(user)
})

router.post('/playnow',ensureLoggedin, async (req, res)=>{
   
  const email = req.session.user.email;
  const sports = req.body.sports;
  const fields= req.body.fields;
  const user = await User.findOne({
    email: email  
  })
  user.playnow= true;
  user.sports= sports;
  user.fields= fields;
  await user.save();
  res.json({ success: true, message: "Sports and Fields are modified successfully"});
})

router.post('/playlater',ensureLoggedin, async (req, res)=>{
   
  const email = req.session.user.email;
  const sports = req.body.sports;
  const fields= req.body.fields;
  const times= req.body.times;
  const user = await User.findOne({
    email: email  
  })
  user.playnow= false;
  user.sports= sports;
  user.fields= fields;
  user.times= times;
  await user.save();
  res.json({ success: true, message: "Sports and Fields are modified successfully"});
})

module.exports = router
