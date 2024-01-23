let express = require("express");
const dbConnect = require("./DB/dbConnect");
const studentRouter = require("./routes/StudentRoute");
let cors = require("cors");

//port and host
let PORT = 2766;
let hostName = "127.0.0.2";

//server
let app = express();

//CORS
app.use(cors());

//middleware
app.use(express.json());

//routes

app.use("/student", studentRouter);

//app listen
app.listen(PORT, hostName, async () => {
  await dbConnect();
  console.log(
    `server started at https://${hostName}:${PORT} & database connected`
  );
});
