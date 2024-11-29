const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/db.js");
const cors = require('cors');
const authRoutes = require('./routes/authRoutes.js');


dotenv.config();
connectDb();


const app = express();
app.use(cors());
app.use(express.json());



app.get("/", async (req, res) => {
    res.json({message: "I am at home page"});
});


app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));