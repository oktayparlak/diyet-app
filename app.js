const express = require('express');
const session = require('express-session');
const fileUpload = require('express-fileupload');

const sequelize = require('./src/configs/database');
const routes = require('./src/routes/index');
const initAssociations = require('./src/models/index');
const initFakeData = require('./src/configs/fakeData');

const app = express();
const PORT = 3000;

/** Template Engine */
app.set('view engine', 'ejs');
app.set('views', './src/views');

/** Middlewares */
app.use(express.static('public'));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(fileUpload());
app.use(
  session({
    secret: 'gizliAnahtar',
    resave: false,
    saveUninitialized: true,
  })
);

/** Associations */
initAssociations();

/** Routes */
routes(app);

sequelize.sync({ force: true }).then(() => {
  console.log('Database connected!');
  /** Fake Data */
  // initFakeData();
  /** Server */
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});

/**
 * 1. dotenv
 * 2. rate-limit
app.use(
  rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 10 minutes)
    handler: function (req, res, next) {
      return res.json({ error: { message: 'Too many requests, please try again later.' } });
    },
  })
);
 * 3. cors
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    optionsSuccessStatus: 200,
  })
);
 */
