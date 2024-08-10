const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.static('public'));
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect("mongodb+srv://saitejaphani:Periteja123@cluster0.vntccsk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewURLParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected");
}).catch((e) => {
    console.log("Error", e);
});

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    movieSuggestion: { type: String, required: true },
    email: { type: String, required: true },
    numberOfSeats: { type: Number, required: true }
});

const Contact = mongoose.model('Contact', contactSchema);

const saveContact = async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();

        const responseData = {
            name: newContact.name,
            movieSuggestion: newContact.movieSuggestion,
            email: newContact.email,
            numberOfSeats: newContact.numberOfSeats
        };

        res.status(201).json({
            message: 'Contact saved successfully',
            contact: responseData
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error saving contact',
            error: error.message
        });
    }
};

app.post('/movies', saveContact);

const port = 3040;
app.listen(port, () => {
    console.log("Server is listening on port " + port);
});
