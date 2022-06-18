import Payment from "../models/payment.model.js";
import User from "../models/user.model.js";
import Book from "../models/book.model.js";

const paymentCtrl = {
    getPayments: async (req, res) => {
        try {
            const payments = await Payment.find();

            res.status(200).json(payments);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    createPayment: async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select('name email');

            if (!user) return res.status(400).json({ msg: "Người dùng không tồn tại!." });

            const { cart, address } = req.body;

            const { _id, name, email } = user;

            const newPayment = new Payment({
                user_id: _id, name, email, cart, address
            });

            cart.filter(item => {
                return update_sold(item._id, item.quantity, item.sold)
            });

            await newPayment.save();

            res.json({ msg: "Thanh toán thành công!", newPayment });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateStatus: async (req, res) => {
        try {
            await Payment.findByIdAndUpdate(
                { _id: req.params.id },
                { status: true }
            );

            return res.status(200).json({ msg: 'Xác nhận đơn hàng thành công!' });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }
};

const update_sold = async (book_id, quantity, old_sold) => {
    await Book.findByIdAndUpdate(
        { _id: book_id },
        { sold: quantity + old_sold }
    );
}

export default paymentCtrl;