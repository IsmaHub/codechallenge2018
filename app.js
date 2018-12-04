const cors              = require('cors');
const express           = require("express");
const bodyParser        = require("body-parser");
const methodOverride    = require("method-override");

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());

require("./routes")(app);
require("./server")(app);