require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const auth = require("./middleware/auth");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// app.use(limiter);

// app.use(helmet());

app.use(cookieParser());

app.use(bodyParser.json());

//attaching the users to the request so all sub routes can handle it

//auth middleware

//check server is running
app.get("/", (req, res) => {
  res.cookie("happy", "yes"); //sending cookie
  // console.log(req.cookies);
  res.send(`<h1>Server is running!</h1>`);
});

//sub routes
app.use("/footballData", require("./routes/footballData.js"));
app.use("/add", require("./routes/add.js"));
app.use("/login", require("./routes/login.js"));
app.use("/forgot", require("./routes/forgot.js"));

//sub routes need auth
app.use("/sync", auth, require("./routes/sync.js"));
app.use("/get", auth, require("./routes/get.js"));
app.use("/delete", auth, require("./routes/delete.js"));
app.use("/update", auth, require("./routes/update.js"));
app.use("/logout", auth, require("./routes/logout.js"));
app.use("/addImage", auth, require("./routes/addImage"));
app.use(
  "/notification-emails",
  auth,
  require("./routes/notificationEmails.js")
);
app.use("/updateTeamName", auth, require("./routes/updateTeamName"));
app.use("/save", auth, require("./routes/save"));

const port = process.env.PORT || 6001;
app.listen(port, () => {
  console.log("Server started on port: " + port);
});
