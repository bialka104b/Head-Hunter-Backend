const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;

const projectRoutes = require("./routes/projectRoutes");
const mongoose = require("mongoose");

// const dbURI = `mongodb+srv://marta:${hasloDB.haslo}@cluster0.w2bha.mongodb.net/rekruter?retryWrites=true&w=majority`;

// Apply CORS policy
app.use(cors())

// Assign the PORT 8080 lub IP serwera to our app
app.listen(port, () => console.log(`Server Running on port: http://localhost:${port}`));