// Import required modules
import express from "express";
import https from "https";
import http from "http";
import fs from "fs";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";

// Define __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the router
import userRouter from "./routes/User.mjs";

// Specify the paths to your private key and certificate files
const privateKeyPath = path.join(__dirname, "Key&Certificate", "private.key");
const certificatePath = path.join(
  __dirname,
  "Key&Certificate",
  "certificate.crt"
);

// Function to read files safely
function readFileSyncSafe(path) {
  try {
    return fs.readFileSync(path);
  } catch (error) {
    console.error(`Failed to load file at ${path}:`, error.message);
    process.exit(1); // Exit if we cannot read the files, no point in continuing
  }
}

// Read the private key and certificate files
const privateKey = readFileSyncSafe(privateKeyPath);
const certificate = readFileSyncSafe(certificatePath);

// Create options object with the key and cert properties
const options = {
  key: privateKey,
  cert: certificate,
};

// Create an Express app
const app = express();

app.use(cookieParser());

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Explicit route for '/login'
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Using the user router
app.use("/users", userRouter);

// Create an HTTP server and bind it to port 80
http.createServer(app).listen(80, () => {
  console.log("HTTP server running on port 80");
});

// Create an HTTPS server using the options object and bind it to port 443
https
  .createServer(options, app)
  .listen(443, () => {
    console.log("HTTPS server running on port 443");
  })
  .on("error", (error) => {
    console.error("HTTPS server failed to start:", error);
  });
