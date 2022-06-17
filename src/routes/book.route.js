import express from 'express';
import bookCtrl from '../controllers/book.controller.js';
import auth from '../middleware/auth.js';
import authAdmin from '../middleware/authAdmin.js';

const router = express.Router();

const bookRoute = (app) => {
    router.get('/book', bookCtrl.getBooks);

    router.post('/book', auth, authAdmin, bookCtrl.createBook);

    router.put('/book/:id', auth, authAdmin, bookCtrl.updateBook);

    router.delete('/book/:id', auth, authAdmin, bookCtrl.deleteBook);

    app.use('/api', router);
};

export default bookRoute;
