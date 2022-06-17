import Banner from '../models/banner.model.js';

const bannerCtrl = {
    getAllBanner: async (req, res) => {
        try {
            const banners = await Banner.find();

            return res.status(200).json(banners);
        } catch (error) {
            return res.status(500).json({ msg: error });
        }
    },
    addBanner: async (req, res) => {
        try {
            const { image } = req.body;

            if (!image) return res.status(400).json({ msg: 'Không có ảnh nào được tải lên!' });

            const newBanner = new Banner({ image });

            await newBanner.save();

            return res.status(200).json({ msg: 'Thêm banner mới thành công!' });
        } catch (error) {
            return res.status(500).json({ msg: error });
        }
    },
    deleteBanner: async (req, res) => {
        try {
            await Banner.findByIdAndDelete(req.params.id);

            return res.status(200).json({ msg: 'Xóa Banner thành công!' });
        } catch (error) {
            return res.status(500).json({ msg: error });
        }
    }
};


export default bannerCtrl;