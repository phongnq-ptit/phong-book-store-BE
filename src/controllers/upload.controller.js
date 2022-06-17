import cloudinary from 'cloudinary';
import fs from 'fs';
import cloudinaryConfig from '../config/cloudinaryConfig.js';

// cau hinh cloudinay
cloudinaryConfig();

// sau khi upload se sinh ra mot file trong folder tmp
// luc nay can xoa no di
const removeTmp = (path) => {
    fs.unlink(path, (err) => {
        if (err) throw err;
    });
};

const uploadCtrl = {
    upload: (req, res) => {
        try {
            if (!req.files || Object.keys(req.files) === 0)
                return res.status(400).json({ msg: 'Không có file nào được tải lên!' });

            const file = req.files.file;
            /**
             * 1024 * 1024 = 1Mb
             */
            if (file.size > 1024 * 1024) {
                removeTmp(file.tempFilePath);

                return res.status(400).json({ msg: 'Ảnh có dung lượng lớn hơn 1Mb!' });
            }

            if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
                removeTmp(file.tempFilePath);

                return res.status(400).json({ msg: 'Ảnh cần dùng định dạng JPG hoặc PNG!!' });
            }

            cloudinary.v2.uploader.upload(
                file.tempFilePath,
                { folder: "phong-book-store" },
                async (err, result) => {
                    if (err) throw err;

                    removeTmp(file.tempFilePath);

                    res.json({
                        public_id: result.public_id,
                        url: result.secure_url
                    });
                });

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    destroy: (req, res) => {
        try {
            const { public_id } = req.body;

            if (!public_id) return res.status(400).json({ msg: 'Không có file nào được chọn!!' });

            cloudinary.v2.uploader.destroy(
                public_id,
                async (err, result) => {
                    if (err) throw err;

                    res.json({ msg: 'Xóa ảnh thành công!' });
                }
            );

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }
}

export default uploadCtrl;