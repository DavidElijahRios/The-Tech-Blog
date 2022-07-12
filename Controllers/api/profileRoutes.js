const router = require('express').Router();
const { Posts } = require('../../Models')


router.post('/', async (req, res) => {
   try {

       const newPost = await Posts.create({...req.body, user_id: req.session.user_id });
       
       res.status(200).json(newPost);

   } catch (err) {
       res.status(500).json(err)
   }

})



module.exports = router;