var express = require('express');
var router = express.Router();

//Imort model
const connectDb = require('../model/db');
const { ObjectId } = require('mongodb');

// Show danh mục
router.get('/', async (req, res) => {
    const db = await connectDb();
    const categoryCollection = db.collection('categories');

    try {
        const categories = await categoryCollection.find().toArray();
        if (categories.length > 0) {
            res.status(200).json(categories);
        } else {
            res.status(404).json({ message: "Không tìm thấy danh mục nào" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
    }
});

//thêm danh mục
router.post('/addcategory', async (req, res) => {
    const db = await connectDb();
    const categoryCollection = db.collection('categories');
    const { tenLoai, description } = req.body;
    const newCategory = { tenLoai, description };

    try {
        const result = await categoryCollection.insertOne(newCategory);
        if (result.insertedId) {
            res.status(200).json({ message: "Thêm danh mục thành công" });
        } else {
            res.status(500).json({ message: "Thêm danh mục thất bại" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
    }
});

//Sửa danh mục
router.put('/updatecategory/:id', async (req, res) => {
    const db = await connectDb();
    const categoryCollection = db.collection('categories');
    const id = new ObjectId(req.params.id);
    const { tenLoai, description } = req.body;
    let updatedCategory = { tenLoai, description };

    try {
        const result = await categoryCollection.updateOne({ _id: id }, { $set: updatedCategory });
        if (result.matchedCount) {
            res.status(200).json({ message: "Sửa danh mục thành công" });
        } else {
            res.status(404).json({ message: "Không tìm thấy danh mục" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
    }
});

//Xóa damh mục
router.delete('/deletecategory/:id', async (req, res) => {
    const db = await connectDb();
    const categoryCollection = db.collection('categories');
    const id = new ObjectId(req.params.id);

    try {
        const result = await categoryCollection.deleteOne({ _id: id });
        if (result.deletedCount) {
            res.status(200).json({ message: "Xóa danh mục thành công" });
        } else {
            res.status(404).json({ message: "Không tìm thấy danh mục" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
    }
});
//Lấy danh mục theo id
router.get("/id/:id", async (req, res, next) => {
    try {
        const db = await connectDb();
        const categoryCollection = db.collection("categories");

        const category = await categoryCollection.findOne({
            _id: new ObjectId(req.params.id),
        });

        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ message: "Không tìm thấy danh mục" });
        }
    } catch (error) {
        console.error("Error fetching category:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
