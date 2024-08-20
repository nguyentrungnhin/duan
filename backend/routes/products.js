var express = require('express');
var router = express.Router();

//Imort model
const connectDb = require('../model/db');
const { ObjectId } = require('mongodb');
const multer = require('multer');


//Thiết lập nơi lưu trữ và tên file
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
//Kiểm tra file upload
function checkFileUpLoad(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|avif)$/)) {
        return cb(new Error('Bạn chỉ được upload file ảnh'));
    }
    cb(null, true);
}
//Upload file
let upload = multer({ storage: storage, fileFilter: checkFileUpLoad });




//thêm sản phẩm
router.post('/addproduct', upload.single('image'), async (req, res, next) => {
    const db = await connectDb();
    const productCollection = db.collection('products');
    const { name, price, description, categoryId, quantity, date, priceSale, inventory, sale } = req.body;
    const image = req.file.originalname;
    const newProduct = { name, price, description, categoryId, image, quantity, date, priceSale, inventory, sale };

    try {
        const result = await productCollection.insertOne(newProduct);
        if (result.insertedId) {
            res.status(200).json({ message: "Thêm sản phẩm thành công" });
        } else {
            res.status(500).json({ message: "Thêm sản phẩm thất bại" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
    }
});

//Xóa sản phẩm
router.delete('/deleteproduct/:id', async (req, res, next) => {
    const db = await connectDb();
    const productCollection = db.collection('products');
    const id = new ObjectId(req.params.id);
    try {
        const result = await productCollection.deleteOne({ _id: id });
        if (result.deletedCount) {
            res.status(200).json({ message: "Xóa sản phẩm thành công" });
        } else {
            res.status(404).json({ message: "Không tìm thấy sản phẩm" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
    }
});

//Sửa sản phẩm
router.put('/updateproduct/:id', upload.single('image'), async (req, res, next) => {
    const db = await connectDb();
    const productCollection = db.collection('products');
    const id = new ObjectId(req.params.id);
    const { name, price, description, categoryId, quantity, date, priceSale, inventory, sale } = req.body;
    let updatedProduct = { name, price, description, categoryId, quantity, date, priceSale, inventory, sale };

    if (req.file) {
        const image = req.file.originalname;
        updatedProduct.image = image;
    }

    try {
        const result = await productCollection.updateOne({ _id: id }, { $set: updatedProduct });
        if (result.matchedCount) {
            res.status(200).json({ message: "Sửa sản phẩm thành công" });
        } else {
            res.status(404).json({ message: "Không tìm thấy sản phẩm" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
    }
});


//lấy chi tiết 1 sản phẩm
router.get("/products/id/:id", async (req, res, next) => {
    const db = await connectDb();
    const productCollection = db.collection("products");
    const product = await productCollection.findOne({
        _id: new ObjectId(req.params.id),
    });

    const categoryCollection = db.collection("categories");
    const category = await categoryCollection.findOne({
        _id: new ObjectId(product.categoryId),
    });

    if (product) {
        product.category = category;
        res.status(200).json(product);
    } else {
        res.status(404).json({ message: "Không tìm thấy" });
    }
});


module.exports = router;
