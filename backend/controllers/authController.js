const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const register = async (req, res)=>{
    const { email, password, role} = req.body;
    
    try {
        let user = await User.findOne({email});
        if(user) 
            return res.json({message: "User already exist"});
        const hashPassword = await bcrypt.hash(password, 10);
        user = await User.create({email, password: hashPassword, role});
        res.status(201).json({message:"User registered successfully ... "});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const oauth = async(req,res) => {
    const {googleId,email,role} = req.body;

    try {
        let user = await User.findOne({ googleId });
        if(!user){
            user = new User({ googleId, email, role });
            await user.save();
        }
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token, user: { id: user._id, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
}

const logout = async (req, res) => {
    try {
      res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server error', message: error.message });
    }
  };



module.exports = { register, login, oauth, logout };
