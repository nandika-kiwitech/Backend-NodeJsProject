const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const db = require("./app/config/dbconfig");

// simple route
app.get("/", (req, res) => {
    res.json({ message: "hiiiii" });
  });
  
const router = require('./app/routes/routes')
app.use('/',router);

// app.use(mWare);

  // set port, listen for requests
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });



  