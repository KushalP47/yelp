require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const app = express()

// middleware
app.use(express.json());

// Get All Restaurants
app.get("/api/v1/restaurants", (req, res) => {
    console.log("In the route handler");
    res.json({
        status: 200,
        data: {
            restaurant: ["wendy", "subway"],
        },
    });
});

// Get Individual Restaurant
app.get("/api/v1/restaurants/:id", (req, res) => {
    // res.json({

    // }) 
    console.log(req.params);
    res.json(req.params);
});

// Create a restaurant
app.post("/api/v1/restaurants", (req, res) => {
    console.log(req.body);
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log("Server is hot and running!!");
})

