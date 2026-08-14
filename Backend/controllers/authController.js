import  User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sendEmail from '../utils/sendEmail.js';

const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
}

const otpStore = new Map();

const normalizeEmail = (email = '') => email.trim().toLowerCase();

const verify = async(req, res) => {
    const { email, name } = req.body ?? {};
    try {
        const normalizedEmail = normalizeEmail(email);

        if (!normalizedEmail) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await User.findOne({ email: normalizedEmail });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        otpStore.set(normalizedEmail, {
            email: normalizedEmail,
            name: name ?? 'user',
            otp,
            expiresAt: Date.now() + 10 * 60 * 1000,
        });

        const message = `Welcome ${name ?? 'user'}, your account is being created.\nYour OTP is: ${otp}. Do not share this with anyone. It will expire in 10 minutes.`;
        await sendEmail(normalizedEmail, 'Account Created', message);

        return res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};
 
// Register a new user
const registerUser = async (req, res) => {
    const { name, email, password, otp } = req.body ?? {};
    try {
        const normalizedEmail = normalizeEmail(email);

        if (!name || !normalizedEmail || !password || !otp) {
            return res.status(400).json({ message: 'name, email, password and otp are required' });
        }

        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const otpRecord = otpStore.get(normalizedEmail);
        if (!otpRecord) {
            return res.status(400).json({ message: 'OTP not requested for this email' });
        }

        if (normalizedEmail !== normalizeEmail(otpRecord.email)) {
            return res.status(400).json({ message: 'Email does not match the one used for OTP request' });
        }

        if (Date.now() > otpRecord.expiresAt) {
            otpStore.delete(normalizedEmail);
            return res.status(400).json({ message: 'OTP expired. Please request a new OTP' });
        }

        if (String(otp).trim() !== String(otpRecord.otp)) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            name,
            email: normalizedEmail,
            password: hashedPassword,
            verified: true,
        });

        otpStore.delete(normalizedEmail);

        if (newUser) {
            return res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                verified: newUser.verified,
                generatedToken: generateToken(newUser),
                message: 'User registered successfully.',
            });
        }

        return res.status(400).json({ message: 'Invalid user data' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const normalizedEmail = normalizeEmail(email);
        const user = await User.findOne({ email: normalizedEmail });
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
            generatedToken: token,
            cart: user.cart || [] // Include the cart in the response, defaulting to an empty array if not present
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

const updateUserCart = async (req, res) => {
    const { userId, productId: routeProductId } = req.params;
    const { productid, price, imgUrl, name } = req.body ?? {};

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const cartProductId = routeProductId ?? productid;

        if (!cartProductId) {
            return res.status(400).json({ message: 'Product id is required' });
        }

        const existingItem = user.cart.find(
            (item) => item.productid?.toString() === cartProductId.toString()
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            if (price === undefined || !imgUrl || !name) {
                return res.status(400).json({
                    message: 'price, imgUrl, and name are required when adding a new cart item',
                });
            }

            user.cart.push({
                productid: cartProductId,
                quantity: 1,
                price,
                imgUrl,
                name,
            });
        }

        await user.save();

        res.json({
            message: 'Cart updated successfully',
            cart: user.cart,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getUserCart = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        res.json({ cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteCartItem = async (req, res) => {
    const { userId, productId } = req.params;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.cart = user.cart.filter((item) => item.productid?.toString() !== productId.toString());
        await user.save();

        res.json({ message: 'Item removed from cart successfully', cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export { registerUser, loginUser, getAllUsers, updateUserCart, getUserCart, deleteCartItem , verify};
