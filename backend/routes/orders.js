var express = require('express');
var router = express.Router();

//Imort model
const connectDb = require('../model/db');
const { ObjectId } = require('mongodb');


//Lấy tất cả đơn hàng dạng json
// router.get("/", async (req, res, next) => {
//     const db = await connectDb();
//     const productCollection = db.collection("orders");
//     const orders = await productCollection.find().toArray();
//     if (orders) {
//         res.status(200).json(orders);
//     } else {
//         res.status(404).json({ message: "Không tìm thấy" });
//     }
// });
router.get("/", async (req, res, next) => {
    try {
        const db = await connectDb();
        const ordersCollection = db.collection("orders");
        const orders = await ordersCollection.find().toArray();
        if (orders.length > 0) {
            res.status(200).json(orders);
        } else {
            res.status(404).json({ message: "Không tìm thấy đơn hàng" });
        }
    } catch (error) {
        next(error);
    }
});
// router.put('/updatestatus/:id', async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const { status } = req.body;

//         const db = await connectDb();
//         const ordersCollection = db.collection('orders');
//         const result = await ordersCollection.updateOne(
//             { _id: new require('mongodb').ObjectID(id) },
//             { $set: { status: status } }
//         );

//         if (result.matchedCount === 0) {
//             return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
//         }

//         return res.json({ message: 'Cập nhật trạng thái thành công' });
//     } catch (error) {
//         next(error);
//     }
// });
router.put('/:orderId/status', async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
        // Check for invalid status value
        const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status value' });
        }

        const db = await connectDb();
        const ordersCollection = db.collection('orders');

        const result = await ordersCollection.updateOne(
            { _id: new ObjectId(orderId) },
            { $set: { status } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }

        const updatedOrder = await ordersCollection.findOne({ _id: new ObjectId(orderId) });
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
//show chi tiết đơn hàng
// router.get('/:id', async (req, res, next) => {
//     try {
//         const db = await connectDb();
//         const ordersCollection = db.collection('orders');
//         const orderId = req.params.id;

//         // Tìm đơn hàng theo ID
//         const order = await ordersCollection.findOne({ _id: new require('mongodb').ObjectId(orderId) });

//         if (order) {
//             res.status(200).json(order);
//         } else {
//             res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
//         }
//     } catch (error) {
//         next(error);
//     }
// });
router.get('/:id', async (req, res) => {
    try {
        const db = await connectDb();
        const ordersCollection = db.collection('orders');
        const orderId = req.params.id;

        // Tìm đơn hàng theo ID
        const order = await ordersCollection.findOne({ _id: new ObjectId(orderId) });

        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Đã xảy ra lỗi' });
    }
});

//chi tiết user
router.get('/user/:id', async (req, res, next) => {
    try {
        const db = await connectDb();
        const ordersCollection = db.collection('orders');
        const orderId = req.params.id;

        // Find order by ID
        const order = await ordersCollection.findOne({ _id: new ObjectId(orderId) });

        if (order) {
            // Extract user details from the order
            const user = order.user;
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        next(error);
    }
});

//Thêm mới đơn hàng
router.post("/", async (req, res, next) => {
    const db = await connectDb();
    const productCollection = db.collection("orders");
    const data = req.body;
    const result = await productCollection.insertOne(data);
    if (result.insertedId) {
        res.status(200).json(result);
    } else {
        res.status(404).json({ message: "Không tìm thấy" });
    }
});

module.exports = router;
