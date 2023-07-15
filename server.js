const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;

// Create DB Connection
const DB = process.env.DATABASE_URI.replace("<password>", process.env.DATABASE_PASSWORD);
mongoose.connect(DB)
  .then(() => {
    console.log('Connected Successfully.');
  }).catch((err) => {
    console.log('Something went wrong in connection.', err.message);
  });


app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});