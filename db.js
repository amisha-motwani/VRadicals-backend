const mongoose = require("mongoose");
const mongoURL = "mongodb://localhost:27017";
const express = require('express');
const cors = require('cors'); // Import cors
const app = express();
const port = 3001;

// Apply the CORS middleware
app.use(cors());

// app.use is a middleware, this line is for if you want to receive any data from req.body
app.use(express.json());

const connectToMongodb = async () => {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    // If there's an error connecting to MongoDB, exit the process
    process.exit(1);
  }
};

// Available routes
app.use('/api/auth', require('./routes/auth'));

app.use('/api/HrRoutes', require('./routes/HrRoutes'));
app.use('/api/AdminRoutes', require('./routes/AdminRoutes'));

// app.get('/', (req, res) => {
//   res.send('Hello Amisha')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = connectToMongodb;
