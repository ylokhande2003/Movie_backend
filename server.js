const express = require('express');


const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const authRoutes = require('./routes/authRoutes');
const listRoutes = require('./routes/listRoutes')
const movieRoutes = require('./routes/movieRoutes');

app.get('/', (req, res) => {
    res.send('products api running new deploy');
});

app.use('/api/auth', authRoutes);
app.use('/api/lists', listRoutes);
app.use('/api/movies', movieRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
