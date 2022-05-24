require("dotenv").config();
const express = require("express");

const { getStream } = require("./src/twitter/stream/get-stream");

const app = express();

const PORT = process.env.PORT || 5000;

//we don't wan't to listen do we?
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

getStream();
