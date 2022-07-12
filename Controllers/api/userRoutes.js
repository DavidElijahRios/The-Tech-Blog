const router = require('express').Router();
const { Users } = require('../../Models')

// TODO: Ask how this works and also the sessions


// Route to create a new user
router.post('/', async (req, res) => {
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

// get user profile
router.get('/', async (req, res) => {
    try {
        const userData = await Users.findAll({
          include: [
            {
              model: Posts,
              attributes: ['name']
            }
          ]
        });
        const users = userData.map((users) => users.get({ plain: true }));
        res.render('profile', {
          ...users,
        })

    } catch (err) {
      res.status(500).json(err);
    }
})



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