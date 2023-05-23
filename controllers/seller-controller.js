
//function to handle seller authentication:
const seller = require('../models/sellerData')
exports.authenticateUser = async (req, res) => {
    const {
        username,
        password
    } = req.body;

    try {
        const user = await User.findOne({
            username,
            password
        });

        if (user) {
            res.json({
                success: true,
                message: 'Login successful'
            });
        } else {
            res.json({
                success: false,
                message: 'Invalid username or password'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};