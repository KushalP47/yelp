require("dotenv").config();
const express = require("express");
const cors = require("cors");
// import morgan from "morgan";
const db = require("./db/index");
const app = express();

// middleware
app.use(express.json());
app.use(cors());
// Get All Restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query("select * from restaurants");
    // console.log(results);
    res.json({
      status: 200,
      results: results.rows.length,
      data: {
        restaurant: results.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Get Individual Restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query(
      "select * from restaurants where restaurant_id = $1",
      [req.params.id]
    );
    console.log(results);
    res.json({
      status: 200,
      results: results.rows.length,
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Create a restaurant
app.post("/api/v1/restaurants", async (req, res) => {
  try {
    const data = [req.body.name, req.body.location, req.body.price_range];
    const results = await db.query(
      "insert into restaurants (restaurant_name, restaurant_location, restaurant_price_range) values($1, $2, $3) returning *",
      data
    );
    console.log(results);
    res.json({
      status: 200,
      results: results.rows.length,
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Update restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const data = [
      req.body.name,
      req.body.location,
      req.body.price_range,
      req.params.id,
    ];
    const results = await db.query(
      "update restaurants set restaurant_name = $1, restaurant_location = $2, restaurant_price_range = $3 where restaurant_id = $4 returning *",
      data
    );
    console.log(results);
    res.json({
      status: 200,
      results: results.rows.length,
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Delete restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query(
      "delete from restaurants where restaurant_id = $1",
      [req.params.id]
    );
    console.log(results);
    res.json({
      status: 200,
      results: results.rows.length,
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server is hot and running!!");
});
