import express from 'express';
import bannerCtrl from '../controllers/banner.controller.js';
import auth from '../middleware/auth.js';
import authAdmin from '../middleware/authAdmin.js';

const router = express.Router();

const bannerRoute = (app) => {
    router.get('/banner', bannerCtrl.getAllBanner);

    router.post('/banner', auth, authAdmin, bannerCtrl.addBanner);

    router.delete('/banner/:id', auth, authAdmin, bannerCtrl.deleteBanner);

    app.use('/api', router);
}

export default bannerRoute;