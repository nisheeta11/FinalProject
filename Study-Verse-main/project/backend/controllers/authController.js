require('dotenv').config();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const LoginLog = require('../models/LoginLog');


const ADMIN_EMAIL = process.env.ADMIN_EMAIL;       
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;


const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

   

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword, role: 'student' });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error during signup' });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Login attempt:', { email, password });  

    if (!email || !password) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    if (email.trim() === ADMIN_EMAIL && password.trim() === ADMIN_PASSWORD) {
      return res.status(200).json({
        user: {
          _id: 'admin-fixed-id',
          name: 'Admin',
          email: ADMIN_EMAIL,
          role: 'admin',
        },
      });
    }

    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || 'student',
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

const getLoginLogs = async (req, res) => {
  try {
    const logs = await LoginLog.find().sort({ loginTime: -1 });
    res.status(200).json(logs);
  } catch (error) {
    console.error('Login Logs Error:', error);
    res.status(500).json({ message: 'Server error while fetching login logs' });
  }
};

module.exports = {
  signup,
  login,
  getLoginLogs,
};
