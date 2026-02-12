const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const imageRoute = require("./routes/imageRoute");

const app = express();

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DB Connected"))
.catch(err => console.log(err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/image", imageRoute);

// Test Route
app.get("/", (req, res) => {
    res.send("Backend Running 🚀");
});

// Start Server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
