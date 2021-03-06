const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const dbsetup = require('./database/setup');
const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');

// SETUP EXPRESS
app.use(express.json());

// SETUP DB
dbsetup();

//REQUIRE ROUTES
app.use('/auth',authRoutes);
app.use(bookRoutes);

//SEEDERS
const {seedAdmin} = require('./seeders/admin');
console.log(seedAdmin());

app.listen(port, () => console.log(`app listening on port ${port}`)); 