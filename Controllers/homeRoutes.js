const router = require('express').Router();
const { User, Posts } = require('../Models')


router.get('/', async (req, res) => {
    try {
        
        const postData = await Posts.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

         const posts = postData.map((posts) => posts.get({ plain: true }));

         res.render('homepage', {
          posts, logged_in: req.session.logged_in
         })
        
    } catch (err) {
       res.status(500).json(err);
    }
});

// Render Login page
router.get('/login', (req,res) => {
    
    res.render('login')
})

router.get('/profile', async (req, res) => {

    try {

        const users = await User.findOne({
            where: req.session.user_id,
            attributes: {
                exclude: ["password"]
            }, 
            include: [
                Posts
            ]
        });
        const user = users.get({ plain: true });
        console.log(user)
        res.render('profile', { user, logged_in: req.session.logged_in });

    } catch (err) {
        res.status(500).json(err)
    }
})

// view for new post
router.get('/newpost', (req, res) => {
    res.render('newpost')
})

module.exports = router;