var express = require('express');
var router = express.Router();

const User = require('../models/User')

router.get('/', (req, res) => {
  return res.json({data: 'received a GET"'})
});

router.post('/', async(req, res) => {
  try{
    console.log(req.body)
    const user = await User.create(req.body)
    // const User = await User.find({})
    console.log("finsihed creating")
    console.log(user)
    res.json({data:user, success:true})
  } catch(err) {
    console.log(err)
  }
  
});

router.put('/', (req, res) => {
  return res.json({ data: "Recieved a PUT"})
});

router.delete('/', (req, res) => {
  return res.json({ data: "Received a DELETE"})
})

router.post('/login', async (req, res) => {
  try {
    const foundUser = await User.find({username: req.body.name})
    res.json({
      user: foundUser,
      success: true
    })
  } catch(err){
    res.json(err)
  }
});



module.exports = router;
