const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).send('A token is required for authentication');
    }

    const token = authHeader.split(' ')[1]; // Extract the token part
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            // console.log('Invalid Token:', token);
            return res.status(401).send('Invalid Token');
        }
        req.user = user;
        next();
    });
};

exports.isAdmin = (req, res, next) => {
    const authHeader = req.header('Authorization');
    // console.log('authHaeder', authHeader);

    if (!authHeader) return res.status(403).json({ message: 'Access Denied' });
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YzU0ZGE5ODRmOWE2MWVhNDgyZThiZiIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTc0MTI2MTQzNiwiZXhwIjoxNzQxMjY1MDM2fQ.k1t5M5c7SgTcQ80PoOINGNO3BpmsV5gmKgo7RaMfYrk";
    const token = authHeader.split(' ')[1];
    // console.log("token ", token)    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("decoded",decoded)
        if (decoded.role !== 'Admin') {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        req.admin = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid Token' });
    }
};


