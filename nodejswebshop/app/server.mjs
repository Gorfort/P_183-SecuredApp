// Import required modules
import express from "express";
import https from "https";
import http from "http";
import fs from "fs";

// Specify the paths to your private key and certificate files
const privateKeyPath = "path/to/private.key";
const certificatePath = "path/to/certificate.crt";

// Read the private key and certificate files
const privateKey = fs.readFileSync(privateKeyPath);
const certificate = fs.readFileSync(certificatePath);

// Create options object with the key and cert properties
const options = {
  key: privateKey,
  cert: certificate,
};

// Create an Express app
const app = express();

// Create an HTTP server and bind it to port 80
http.createServer(app).listen(80, () => {
  console.log("HTTP server running on port 80");
});

// Create an HTTPS server using the options object and bind it to port 443
https.createServer(options, app).listen(443, () => {
  console.log("HTTPS server running on port 443");
});
