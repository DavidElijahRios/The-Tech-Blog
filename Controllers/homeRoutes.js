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
          posts,
         })
        
    } catch (err) {
       res.status(500).json(err);
    }
});

// Render Login page
router.get('/login', (req,res) => {
    
    res.render('login')
})


module.exports = router;