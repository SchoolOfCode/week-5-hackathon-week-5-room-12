// Import the required modules
import express from "express";
import morgan from "morgan";

import peopleRouter from "./routes/people.js";
import awardsRouter from "./routes/awards.js";

// Initialize the express app
const app = express();

// Middleware
app.use(morgan("dev")); // Morgan is used for logging HTTP requests to the console in a developer-friendly format
app.use(express.json()); // express.json() middleware is used to parse incoming JSON requests

// Use sub-routers
app.use("/people", peopleRouter);
app.use("/awards", awardsRouter);

export default app;
