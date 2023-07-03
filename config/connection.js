const mongoose = require("mongoose");
const config = require("../config");
const db = config.dbUrl;

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });

        console.log(`MongoDB connected ... ${db}`);
    } catch (error) {
        console.error("Failed to connect Mongodb");
        console.error(error.message);
        //Exit process
        process.exit(1);
    }
};

module.exports = connectDB;