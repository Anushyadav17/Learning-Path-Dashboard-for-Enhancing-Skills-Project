const express = require("express");
const app = express();

const database = require("./config/database");
const cookiePaser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

const userRoutes = require("./routers/User");
const profileRoutes = require("./routers/Profile");
const paymentRoutes = require("./routers/Payment");
const courseRoutes = require("./routers/Course");
const contactRouter = require("./routers/ContactUs");

require("dotenv").config();
const PORT = process.env.PORT || 4000;

//database connect
database.connect();

//middlewars
app.use(express.json());
app.use(cookiePaser());
app.use(
    cors({
        origin : "http://localhost:3000",
        credentials : true,
    })
)

app.use(
    fileUpload({
        useTempFiles : true,
        tempFileDir : "/tmp",
    })
)

//cloudinary connection
cloudinaryConnect();

//routes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/contactus",contactRouter);

//default routes
app.use("/", (req,res) => {
    res.send("<h1>Server is Running</h1>")
});

//server instance
app.listen(PORT, () => {
    console.log(`Your server is running at http://localhost:${PORT}`);
});