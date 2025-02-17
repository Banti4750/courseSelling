// const jwt = require('jsonwebtoken')
// const JWT_ADMIN ="ysdgf" 

// function adminmiddle(req , res , next){
//     const token =  req.headers.token;
//     const auth = jwt.verify(token , JWT_ADMIN)

//     if(auth){
//         req.userId = auth.id
//         next()
//     }
//     else{
//         res.json({
//             message:"you are not sign in  "
//         })
//     }
// }

// module.exports={
//     adminmiddle:adminmiddle
// }



const jwt = require('jsonwebtoken');
const JWT_ADMIN = "ysdgf";  // Use your actual JWT secret key for admin

function adminmiddle(req, res, next) {
    // Get token from the 'Authorization' header
    const authHeader = req.headers.authorization;
    
    if (authHeader) {
        const token = authHeader.split(' ')[1];  // Extract the token after 'Bearer'

        try {
            const auth = jwt.verify(token, JWT_ADMIN);  // Verify the token with admin secret
            
            // If token is valid, attach admin info to request
            req.userId = auth.id;
            next();  // Proceed to the next middleware/route handler
        } catch (err) {
            res.status(403).json({
                message: "Invalid or expired admin token"
            });
        }
    } else {
        // If no token is provided
        res.status(401).json({
            message: "Admin token is missing, please sign in"
        });
    }
}

module.exports = {
    adminmiddle
};
