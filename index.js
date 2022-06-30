const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");


///Import Routes
const authRoute = require("./routes/auth");
const notesRoute = require("./routes/notes");


dotenv.config();

//connect to db
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
  console.log("connected to db")
);

//mw
app.use(cors());
app.use(express.json());

//Route mws
app.use("/api/user", authRoute);
app.use("/api/todo", notesRoute);

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});


app.listen(process.env.PORT || 8000, () => console.log("Server running"));
