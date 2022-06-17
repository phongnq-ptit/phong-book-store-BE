import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization");

        if (!token) return res.status(400).json({ msg: 'Xác thực không hợp lệ!' });

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(400).json({ msg: 'Xác thực không hợp lệ!' });

            req.user = user;

            next();
        });

    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

export default auth;