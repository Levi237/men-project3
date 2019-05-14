var express = require('express');
var router = express.Router();

const User = require('../models/User');

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.json({user})
  } catch(err) {
    res.json({err})
  }
});

router.post('/:id/parks', async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.id)
    const park = {
      id: req.body.park.id,
      name: req.body.park.title
    }
    foundUser.userList.push(park)
    await foundUser.save()
    res.json({user: foundUser})
  } catch(err) {
    res.json({err})
  }
})

router.get('/', (req, res) => {
  return res.json({data: 'received a GET"'})
});

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.json({user})
    console.log(user)
  } catch(err) {
    res.json({err})
  }
});

router.put('/', (req, res) => {
  return res.json({ data: "Recieved a PUT"})
});

router.delete('/', (req, res) => {
  return res.json({ data: "Received a DELETE"})
});

router.post('/login', async (req, res) => {
  try {
    const foundUser = await User.findOne({username: req.body.username})
    console.log(foundUser)
    res.json({
      data: foundUser,
      success: true
    })
  } catch(err){
    res.json(err)
  }
});



module.exports = router;
