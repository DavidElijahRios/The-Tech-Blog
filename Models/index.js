const User = require('./Users');
const Posts = require('./Posts');

Posts.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Posts, {
     foreignKey: 'user_id'
})


module.exports = { User, Posts };
