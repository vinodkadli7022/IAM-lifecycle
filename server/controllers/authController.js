const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const loginUser = async (req, res) => {
    const { identifier, password } = req.body;

    try {
        // Check for user by email or employeeId
        const user = await User.findOne({
            $or: [{ email: identifier }, { employeeId: identifier }]
        }).populate('role').populate('permissions');

        if (user && (await bcrypt.compare(password, user.password))) {
            if (user.accountStatus === 'Disabled') {
                return res.status(403).json({ message: 'Account is disabled' });
            }

            const token = generateToken(user._id);

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000 // 1 day
            });

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                employeeId: user.employeeId,
                userType: user.userType,
                role: user.role,
                permissions: user.permissions,
                token
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const logoutUser = (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.json({ message: 'Logged out successfully' });
};

const getMe = async (req, res) => {
    const user = await User.findById(req.user._id).populate('role').populate('permissions');
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

module.exports = {
    loginUser,
    logoutUser,
    getMe
};
