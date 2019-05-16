// const express = require('express');
// const router = express.Router();

// const User = require('../models/User');

// router.get('/:id', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id)
//     res.json({user})
//   } catch(err) {
//     res.json({err})
//   }
// });

// router.post('/:id/parks', async (req, res) => {
//   try {
//     const foundUser = await User.findById(req.params.id)
//     const park = {
//       id: req.body.park.id,
//       name: req.body.park.title,
//       url: req.body.park.url
//     }
//     foundUser.userList.push(park)
//     await foundUser.save()
//     res.json({user: foundUser})
//   } catch(err) {
//     res.json({err})
//   }
// })

// router.get('/', (req, res) => {
//   return res.json({data: 'received a GET"'})
// });

// router.post('/', async (req, res) => {
//   try {
//     const user = await User.create(req.body)
//     res.json({user})
//     console.log(user)
//   } catch(err) {
//     res.json({err})
//   }
// });

// router.put('/', (req, res) => {
//   return res.json({ data: "Recieved a PUT"})
// });

// router.post('/login', async (req, res) => {
//   try {
//     const foundUser = await User.findOne({username: req.body.username})
//     console.log(foundUser)
//     res.json({
//       data: foundUser,
//       success: true
//     })
//   } catch(err){
//     res.json(err)
//   }
// });

// router.delete('/:id/:userListId', async (req, res) => {
//   try {
//     // const deleteItem = await User.userList.findByIdAndRemove(req.params.id)
//     const user = await User.findById(req.params.id)
    
//     user.userList = user.userList.filter((alert, i) => {
//       console.log('user list id', alert._id.equals(req.params.userListId));
//       return !alert._id.equals(req.params.userListId)
//     })
//     user.save();

//     // console.log('user filtered', user.userList);
//     res.json({ 
//       status: 200,
//       data: user
//     })
//     // res.json('')
//   } catch(err) {
//     console.log(err);
    
//     res.send(err)
//   }
// });






// module.exports = router;
const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.get('/', (req, res) => {
  return res.json({data: 'received a GET"'})
});


//------------------------------->  CREATE USER
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.json({user})
    console.log(user)
  } catch(err) {
    res.json({err})
  }
});

//------------------------------->  PUT - UPDATE USER INFO ?????????
// router.put('/:id/edit', async (req, res) => {
//   try {
//     const editUser = await User.findById(req.params.id)
//     console.log(editUser)
//     res.json({ data: editUser})
//   } catch(err) {
//     res.send(err)
//   }
  
// });

//------------------->  EDIT
router.put('/:id/edit', async (req, res) => {
  try {
    const editUser = await User.findById({username: req.params.username})
    console.log(editUser.data, '<=============users.js editUser.data from Edit router.')
    res.json({
      data: editUser.data,
      success: editUser ? true : false
      // success: true
    })
  } catch(err){
    res.json(err)
  }
})
// router.get('/:id/edit', logUser, async (req, res) => {
//   try {
//       const foundUser = await User.findById(req.params.id)
//       res.render('users/edit.ejs',{
//           user: foundUser,
//           logged: req.session.logged,
//           userTakenMessage: req.session.userTaken
//       })
//   } catch (err) {   
//       res.send(err)
//   }
// })

//------------------------------->  LOGIN
router.post('/login', async (req, res) => {
  try {
    const foundUser = await User.findOne({username: req.body.username})
    console.log(foundUser)
    res.json({
      data: foundUser,
      success: foundUser ? true : false
      // success: true
    })
  } catch(err){
    res.json(err)
  }
});

//------------------------------->  ADD LIST ITEM
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

//------------------------>  LOGOUT
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if(err){
      res.json({err});
    } else {
      res.json({
        success: true,
        message: "logged out!"
      });
    }
  })
})

//------------------------------->  DELETE LIST ITEM
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
