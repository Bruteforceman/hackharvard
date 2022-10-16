const router = require('express').Router()
const User= require('./user')
const { registerUser, loginUser, ensureLoggedin } = require('./auth')
const universityDetails = [
  {
    "university": "Harvard University",
    "fields": ["Dillon Fieldhouse", "Jordan Field", "Lavietes Pavilion", "McCurdy Outdoor Track", "Roberto A. Mignone Field", "Ohiri Field"]
  }, 
  {
      "university": "MIT",
      "fields": ["Rockwell Cage", "Jack Barry Field", "Briggs Field", "duPont Athletic Center", "Al & Barrie Zesiger Sports & Fitness Center"]
  },
  {
      "university": "Drexel University",
      "fields": ["Vidas Athletic Complex", "Buckley Green", "Maguire Field", "Astroturf field"]    
  },
  {
      "university": "Villanova University",
      "fields": ["The Jake Nevin Field House", "Villanova Stadium", "Higgins Soccer Complex", "Butler Annex", "Jake Nevin Field House"]    
  }
]



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
    const userData = {
      success: true,
      email: user.email,
      university: user.university,
      fields: user.fields,
      sports: user.sports,
      times: user.times
    }
    res.json(userData)
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

router.get('/getuniversities', (req, res) => {
  res.json(universityDetails.map(obj => obj.university))
})

router.post('/getuniversitydetails', (req, res) => {
  const university = req.body.university;
  const cands = universityDetails.filter(obj => obj.university === university)
  console.log(university)
  if(cands.length > 0) {
    res.json(cands[0])
  } else {
    res.json({ university: "", fields: [] })
  }
})


module.exports = router
