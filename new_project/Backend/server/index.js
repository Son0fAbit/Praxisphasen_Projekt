const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const links = require("./routes/api/links");
const db = require("./model/dblink");


const app = express();

//run at startup
//initielles herstellen der DB Verbindung
db.getConnection();


//Middleware
//Was alles so genutzt werden soll

app.use(bodyParser.json());
app.use(cors());


app.use("/api/links" ,links)

const port = process.env.PORT || 5000;

app.listen (port, () => console.log(`Server running on port ${port}`));