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

router.delete('/:id', async (req, res) => {
  try {
    const deleteItem = await User.userList.findByIdAndRemove(req.params.id)
    res.json({ 
      status: 200,
      data: deleteItem
    })
  } catch(err) {
    res.send(err)
  }
});
// router.delete('/:id', logUser, async (req,res)=>{
//   try {
//       const deleteCard = Card.findByIdAndDelete(req.params.id);
//       const findUser = User.findOne({'cards': req.params.id});
//       const [deletedCard, foundUser] = await Promise.all([deleteCard,findUser]);
//       if (foundUser.cards.favorite === true) {
//           foundUser.favorites.remove(req.params.id);
//       }
//       foundUser.cards.remove(req.params.id);
//       await foundUser.save();
//       res.redirect(`/users/${req.session.userDbId}`)
//   } catch(err) {
//       res.send(err)
//   }
// })





module.exports = router;
