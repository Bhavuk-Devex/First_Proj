const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/DB/Connection");
const RegisterRoutes = require("./src/Routes/RegisterRoutes");
const http = require("http");

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

app.use(express.json());

// Define a simple route
app.use("/api", RegisterRoutes);
