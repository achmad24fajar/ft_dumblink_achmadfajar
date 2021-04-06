const express = require("express");

const app = express();
const router = require('./src/routers')
const cors = require("cors")
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000

app.use(bodyParser.json());
app.use(cors());
app.use('/api/v1', router);
app.use("/uploads", express.static("uploads"))
app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`))