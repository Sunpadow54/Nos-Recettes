// App
// ------------------------- IMPORTS --------------------------

const express = require('express'); // framework express
// Package (to format body (ex: from Post request) )
const bodyParser = require('body-parser');
/* const path = require('path'); // from node */
// security
const helmet = require('helmet'); // against Xss attacks
const hpp = require('hpp'); // against Dos attack (avoid parameters pollution)
const cors = require('cors');

// ---- Import Roads
const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipe');
const ingredientRoutes = require('./routes/ingredient');
const userRoutes = require('./routes/user');

// ============================================================
// ----------------------- Create app -------------------------

const app = express();
app.use(cors())

// ------------------------- MIDDLEWARES ----------------------

// ---- Create header (for CORS error)

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // all can access
    // eslint-disable-next-line max-len
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // eslint-disable-next-line max-len
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // can use all theses methods
    next();
});

app.use(bodyParser.urlencoded({extended: true}));
// --- Format Json
app.use(bodyParser.json());

// security
app.use(helmet()); // Protect from cross-site scripting (XSS)
app.use(hpp());

// --- middleware (for file upload path)
/* app.use('/images', express.static(path.join(__dirname, 'images'))); */

// --- Roads
app.use('/api/auth', authRoutes);
app.use('/api/recipe', recipeRoutes);
app.use('/api/ingredient', ingredientRoutes);
app.use('/api/user', userRoutes);


// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = app; // our server node
