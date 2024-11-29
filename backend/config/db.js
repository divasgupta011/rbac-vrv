const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        // Attempt to connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "RBAC"
        });
        console.log("MongoDB connected successfully ......");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1); // Exit the process on failure
    }
};

module.exports = connectDb;
