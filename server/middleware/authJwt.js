import jwt from 'jsonwebtoken';
var secret_key = 'shhhh';


const authJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        console.log("There is authHeader");
        const token = authHeader.split(' ')[1];

        jwt.verify(token, secret_key, (err, user) => {
            if (err) {
                console.log("Token verification error", err);
                return res.status(403).json({ message: 'Forbidden' });
            }
            req.user = user;
            console.log(user);
            next();
        });
    } else {
        res.status(401).json({ message: 'Authentication failed' });
    }
};

export default authJwt;