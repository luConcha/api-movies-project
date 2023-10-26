const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', require('./routes/usersRoutes'));
app.use('/api/movies', require('./routes/moviesRoutes'));
app.use('/api/watch', require('./routes/watchListsRoutes'));

app.listen(port, () => console.log(`Server started on port ${port}`));
