import  User from '../modules/user.module.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sendEmail from '../utils/sendEmail.js';

const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
}


// Register a new user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body; 
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            name,   
            email,  
            password: hashedPassword
        });
        if(newUser){
            const otp = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit OTP
            const message = 
            `welcome ${name}, your account has been created successfully.
            Your OTP is: ${otp}`;
            await sendEmail(email, 'Account Created', message); // Send the OTP email

            res.status(201).json({ 
                _id: user._id,
                name: user.name,
                email: user.email,
                generatedToken: generateToken(user),
                message: 'User registered successfully. Please check your email for the OTP.',
            });
        }else{
            res.status(400).json({ message: 'Invalid user data' });
        }

        // await newUser.save();
        // res.status(201).json({ message: 'User registered successfully' });
        
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }

}

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user);
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            generatedToken: token
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

//get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude password field 
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export { registerUser, loginUser, getAllUsers };
