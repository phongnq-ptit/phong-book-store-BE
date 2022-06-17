import express from 'express';
import userCtrl from '../controllers/user.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

const userRoute = (app) => {
    router.post('/register', userCtrl.register);

    router.post('/login', userCtrl.login);

    router.get('/logout', userCtrl.logout);

    router.get('/refresh_token', userCtrl.refreshToken);

    router.get('/info', auth, userCtrl.getUser);

    router.put('/update', auth, userCtrl.updateUser);

    router.patch('/addcart', auth, userCtrl.addCart);

    router.get('/history', userCtrl.history);

    return app.use('/user', router);
};

export default userRoute;