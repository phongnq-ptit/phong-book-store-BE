import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export default function () {
    const URI = process.env.MONGO_URL;

    mongoose.connect(URI, {
        autoIndex: false
    }, (err) => {
        if (err) throw err;

        console.log('Ket noi thanh cong voi MONGODB!');
    });
}