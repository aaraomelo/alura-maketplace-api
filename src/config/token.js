import jwt from 'jsonwebtoken';

module.exports = app => {
    app.authenticationToken = (req, res, next) => {
        const token = req.headers['authorization'];
        if (token == null) return res.status(401).json({ message: 'É necessário informar um token' });
        jwt.verify(token, process.env.ACCESS_TOKEN_SUPERSECRET, (err, user) => {
            if(err) return res.status(401).json({ message: 'Token inválido' });
            req.user = user;
            next();
        })
    }

};