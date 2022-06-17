import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

export default function () {
    // upload anh tren cloudinary
    cloudinary.v2.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET
    });
};