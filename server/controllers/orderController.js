const Order = require('../models/order-model');

module.exports = {
    async getAllOrders(req, res) {
        try {
            const orders = await Order.find()
                .populate('accountId', 'email name')
                .populate('items.productId', 'name price');
            res.status(200).json(orders);
        } catch (error) {
            console.error('Error fetching orders:', error);
            res.status(500).json({ message: 'Error fetching orders' });
        }
    },

    async updateOrderStatus(req, res) {
        const { orderId } = req.params;
        const { status } = req.body;

        try {
            const order = await Order.findByIdAndUpdate(
                orderId,
                { status },
                { new: true }
            );
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.status(200).json(order);
        } catch (error) {
            console.error('Error updating order:', error);
            res.status(500).json({ message: 'Error updating order' });
        }
    }
};
