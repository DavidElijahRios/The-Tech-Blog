const router = require('express').Router();
const { User } = require('../../Models')

// TODO: Ask how this works and also the sessions


// Route to create a new user
router.post('/', async (req, res) => {
    console.log(req.body)
    try {

    const newUser = await User.create(req.body);
        console.log(newUser)
    req.session.save(() => {
        req.session.user_id = newUser.id;
        req.session.logged_in = true;

        res.status(200).json(newUser)

    });
   } catch (err) {
    console.log("this is err", err.errors[0].message)
       res.status(400).json(err);
      //  {message: err.errors[0].message}
   }
});



router.post('/login', async (req, res) => {
    try {
      const newUser = await Users.findOne({ where: { email: req.body.email } });
  
      if (!newUser) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await newUser.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = newUser.id;
        req.session.logged_in = true;
        
        res.json({ user: newUser, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.delete('/logout', async (req, res) => {
    if( req.session.logged_in ) {
        req.session.destroy(() => {
          res.status(204).json({ message: "Successfully logged out"}).end()
        }) 
    } else {
      res.redirect("/login");
    }
  })


  


module.exports = router;