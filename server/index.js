const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const userRouter = require("./Routes/user");
const { MONGOURI } = require("./config/keys");

mongoose
  .connect(MONGOURI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(() => console.log("Error occur while connecting MongoDB"));

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("wellcome to the Backend of Trello!!!");
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server running on ${port}`));
