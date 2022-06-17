import express from 'express';
import uploadCtrl from '../controllers/upload.controller.js';
import auth from '../middleware/auth.js';
import authAdmin from '../middleware/authAdmin.js';

const router = express.Router();

const uploadRoute = (app) => {
    router.post('/upload', auth, authAdmin, uploadCtrl.upload);

    router.post('/destroy', auth, authAdmin, uploadCtrl.destroy);

    app.use('/api', router);
};

export default uploadRoute; 