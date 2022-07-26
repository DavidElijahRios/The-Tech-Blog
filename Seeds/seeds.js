// Connect to sequelize to use database
const sequelize = require('../Config/connection');

// Bring made models to transfer seeds to database
const { User, Posts } = require('../Models');


// bring in all json data to seed into database when function is ran
const userData = require('./userData.json');
const postData = require('./postData.json');


// Function to seed data into database
const seedDatabase = async () => {
    await sequelize.sync({ force: true });
  
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
  
    for (const posts of postData) {
      await Posts.create({
        ...posts,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });
    }
  
    process.exit(0);
  };
  
  seedDatabase();
  