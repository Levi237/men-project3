const express = require('express');
const router = express.Router();

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
      name: req.body.park.title,
      url: req.body.park.url
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

// router.post('/', async (req, res) => {
//   try {
//     const user = await User.create(req.body)
//     res.json({user})
//     console.log(user)
//   } catch(err) {
//     res.json({err})
//   }
// });

router.post('/register', async (req,res)=>{

  try {
      const createdUser = await User.create(req.body);
      console.log(createdUser, "====================================createdUser")
      // req.session.userDbId = createdUser._id;
      // user.save();

      // console.log('user filtered', user.userList);
      res.json({createdUser})

  } catch(err) {
    res.json(err)
  }
})

router.put('/', (req, res) => {
  return res.json({ data: "Recieved a PUT"})
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

router.delete('/:id/:userListId', async (req, res) => {
  try {
    // const deleteItem = await User.userList.findByIdAndRemove(req.params.id)
    const user = await User.findById(req.params.id)
    
    user.userList = user.userList.filter((alert, i) => {
      console.log('user list id', alert._id.equals(req.params.userListId));
      return !alert._id.equals(req.params.userListId)
    })
    user.save();

    // console.log('user filtered', user.userList);
    res.json({ 
      status: 200,
      data: user
    })
    // res.json('')
  } catch(err) {
    console.log(err);
    
    res.send(err)
  }
});






module.exports = router;
