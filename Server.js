// =======================================================================================
// =======================================================================================
// Requiring all the packages I need for the application 

const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
// Need to bring in handlebars.js
const exphbs = require('express-handlebars');
const helpers = require('./Utils/helper.js')
const path = require('path')


const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// =======================================================================================
// =======================================================================================
// Setting up the use of express and getting Port ready for server use

const app = express();
const PORT = process.env.PORT || 3001;

// =======================================================================================
// =======================================================================================
// using session store to store and 

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
const hbs = exphbs.create({ helpers })

app.use(session(sess));

// =======================================================================================
// =======================================================================================

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});