import express from 'express';
import paymentCtrl from '../controllers/payment.controller.js';
import authAdmin from '../middleware/authAdmin.js';
import auth from '../middleware/auth.js';

const router = express.Router();

const paymentRoute = (app) => {
    router.get('/payment', auth, authAdmin, paymentCtrl.getPayments);

    router.post('/payment', auth, paymentCtrl.createPayment);

    router.patch('/payment/:id', auth, authAdmin, paymentCtrl.updateStatus);

    app.use('/api', router);
};

export default paymentRoute;