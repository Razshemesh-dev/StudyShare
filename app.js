const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();

// Configure EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'));

app.use(express.static(path.join(__dirname)));

app.use(express.urlencoded({ extended: false }));

// Session configuration
app.use(session({
  secret: 'StudyShare_Secret_Key_2024',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
  }
}));

// Auth routes
const authRoutes = require('./Routes/auth/auth.js');
app.use(authRoutes);

// Main routes
const routes = require('./Routes/auth/StudyShare.js');
app.use(routes);

app.listen(3000, () => console.log('Server listening on port 3000'));