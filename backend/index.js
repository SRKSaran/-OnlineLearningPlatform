const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/user');
const courseRoutes = require('./routes/course');
const enrollmentRoutes = require('./routes/enrollment');

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGO_URL;

// CORS configuration
app.use(cors());

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log('MongoDB connected...');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.use(bodyParser.json());
app.use('/api/user', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);

// 404 Error handling middleware
app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

// General Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
