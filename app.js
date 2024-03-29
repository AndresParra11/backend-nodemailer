require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./routes/router");
const cors = require("cors");

const port = 3000;

app.use(express.json());
app.use(cors());
app.use(router);

app.get("/", (req, res) => {
  res.send("Corriendo servidor!");
});

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
