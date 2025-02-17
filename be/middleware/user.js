const jwt = require('jsonwebtoken');
const JWT_USER = "hi";  // Use your actual JWT secret key

function usermiddle(req, res, next) {
    // Get token from the 'Authorization' header
    const authHeader = req.headers.authorization;
    
    if (authHeader) {
        const token = authHeader.split(' ')[1];  // Extract the token after 'Bearer'

        try {
            const auth = jwt.verify(token, JWT_USER);  // Verify the token
            
            // If token is valid, attach user info to request
            req.userId = auth.id;
            next();  // Proceed to the next middleware/route handler
        } catch (err) {
            res.status(403).json({
                message: "Invalid or expired token"
            });
        }
    } else {
        // If no token is provided
        res.status(401).json({
            message: "Token is missing, please sign in"
        });
    }
}

module.exports = {
    usermiddle
};
