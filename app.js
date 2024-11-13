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

// Connect to the database and start the server
app.use(function (request, response, next) {
  if (request.session && !request.session.regenerate) {
    request.session.regenerate = (cb) => {
      cb();
    };
  }
  if (request.session && !request.session.save) {
    request.session.save = (cb) => {
      cb();
    };
  }
  next();
});

const start = async (uri) => {
  console.log("Starting ", uri);
  try {
    await connectDB(uri);
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start(process.env.DATABASE);
