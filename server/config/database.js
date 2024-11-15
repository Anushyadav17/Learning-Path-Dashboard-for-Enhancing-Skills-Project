const mongoose = require('mongoose');
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then( () => console.log("DB Connected Succesfully"))
    .catch ( (error) => {
        console.log("Not Connected");
        console.error(error.message);
        process.exit(1);
    });
}
