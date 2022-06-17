import Book from "../models/book.model.js";
import APIfeatures from "../lib/features.js";

const bookCtrl = {
    getBooks: async (req, res) => {
        try {
            const features = new APIfeatures(Book.find(), req.query)
                .filtering()
                .paginating()
                .sorting()

            const books = await features.query;

            return res.status(200).json({
                result: books.length,
                books: books
            });

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    createBook: async (req, res) => {
        try {
            const { title, price, description, author, image, category } = req.body;

            if (!image)
                return res.status(400).json({ msg: 'Không có ảnh nào được tải lên!!' });

            const book = await Book.findOne({ title });

            if (book)
                return res.status(400).json({ msg: 'Sách đã tồn tại!!' });

            const newBook = new Book({ title: title.toLowerCase(), price, description, author, image, category });

            await newBook.save();

            return res.status(200).json({ msg: 'Thêm sách mới thành công!!' })
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    deleteBook: async (req, res) => {
        try {
            await Book.findByIdAndDelete(req.params.id);

            res.json({ msg: "Xóa sách khỏi hệ thống thành công!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateBook: async (req, res) => {
        try {
            const { title, price, description, author, image, category } = req.body;

            if (!image)
                return res.status(400).json({ msg: 'Không có ảnh nào được tải lên!!' });

            await Book.findOneAndUpdate(
                { _id: req.params.id },
                { title: title.toLowerCase(), price, description, author, image, category },
                { new: true }
            );

            res.json({ msg: "Cập nhật sách thành công!!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
};

export default bookCtrl;