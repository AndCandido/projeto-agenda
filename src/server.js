require('dotenv').config();

// Requires
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const helmet = require('helmet');
const csrf = require('csurf');
const path = require('path');
const routes = require('./routes');
const app = express();

// Connection with Mongoose
mongoose.connect(
    process.env.CONNECTIONSTRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }).then(() => {
        app.emit('serverOn');
    })
    .catch(e => console.log(e)
    );

// Import Middlewares
const {
    middlewareGlobal,
    checkCsrfError,
    csrfMiddleware } = require('./middlewares/middleware');

// Session options
const sessionOptions = session({
    secret: process.env.SESSION_SECRET_KEY,
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});

// Use dependencies
app.use(helmet());
app.use(sessionOptions);
app.use(flash());
    
// Express configs
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

// Set views
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

// Csrf
app.use(csrf());

// Use Middlewares
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

// Server listen
app.on('serverOn', () => {
    app.listen(3003, () => {
        console.log('Acessar http://localhost:3003');
    });
});
