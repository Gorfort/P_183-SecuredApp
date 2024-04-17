import express from "express";
import userRoute from "./routes/User.mjs";

const app = express();

app.use("/user", userRoute);

// Démarrage du serveur
app.listen(8080, () => {
  console.log("Server running on port 8080");
});
