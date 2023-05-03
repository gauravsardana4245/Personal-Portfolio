const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();
const port = 5000;

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
// Connect to MongoDB
const mongoURI = "mongodb+srv://Gaurav:blankspace@cluster0.xhef3ce.mongodb.net/PersonalPortfolio?retryWrites=true&w=majority";
mongoose.connect(mongoURI)
    .then(() => console.log("Connect to mongo successfully"));

// Create a schema for the data you want to save
const myDataSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

// Create a model for the schema
const MyData = mongoose.model('myData', myDataSchema);

// Define a route to handle form submission
app.post('/submit-form', async (req, res) => {

    try {
        message = await MyData.create({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        })
        res.json({ message: message })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }
    // Save the data to the database
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});