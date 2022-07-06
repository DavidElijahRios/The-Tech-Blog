const router = require('express').Router();
const { Users } = require('../../Models')



router.post('/users', async (req, res) => {
    try {

    const newUser = await Users.create(req.body);

    req.session.save(() => {
        req.session.user_id = newUser.id;
        req.session.logged_in = true;

        res.status(200).json(newUser)

    });
   } catch (err) {
       res.status(400).json(err);
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


module.exports = router;