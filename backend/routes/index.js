var express = require('express');
var router = express.Router();

//Imort model
const connectDb = require('../model/db');
const { ObjectId } = require('mongodb');
const multer = require('multer');


//Thiết lập nơi lưu trữ và tên file
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/img')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
//Kiểm tra file upload
function checkFileUpLoad(req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Bạn chỉ được upload file ảnh'));
  }
  cb(null, true);
}
//Upload file
let upload = multer({ storage: storage, fileFilter: checkFileUpLoad });

//Thêm sản phẩm
router.post('/addproduct', upload.single('image'), async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection('products');
  const { name, price, description, categoryId } = req.body;
  const image = req.file.originalname;
  const newProduct = { name, price, description, categoryId, image };

  try {
    const result = await productCollection.insertOne(newProduct);
    // Check if insertedId exists (indicates successful insertion)
    if (result.insertedId) {
      res.status(200).json({ message: "Thêm sản phẩm thành công" });
    } else {
      res.status(500).json({ message: "Thêm sản phẩm thất bại" }); // Consider using 500 for unexpected errors
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" }); // Generic error message for user
  }
});

//Lấy tất cả sản phẩm dạng json
router.get('/products', async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection("products");
  const products = await productCollection.find().toArray();

  const categoryCollection = db.collection("categories");
  const categories = await categoryCollection.find().toArray();
  if (products) {
    products.map((item) => {
      category = categories.find(
        (cate) => cate._id.toString() == item.categoryId.toString()
      );
      item.category = category;
      return item;
    })
    res.status(200).json(products);
  } else {
    res.status(404).json({ message: "Không tìm thấy" });
  }
});
//Lấy sản phẩm theo danh mục
router.get('/categories', async (req, res, next) => {
  const db = await connectDb();
  const categoryCollection = db.collection('categories');
  const categories = await categoryCollection.find().toArray();
  if (categories) {
    res.status(200).json(categories);
  } else {
    res.status(404).json({ message: "Không tìm thấy" })
  }
});
//Lấy danh mục theo idcate
router.get('/categories/:idcate', async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection('products');
  const products = await productCollection.find({ categoryId: req.params.idcate }).toArray();
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(404).json({ message: "Không tìm thấy" })
  }
}
);
//Lấy sản phẩm hot
router.get('/products/hot', async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection('products');
  const products = await productCollection.find().sort({ view: -1 }).limit(4).toArray();
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(404).json({ message: "Không tìm thấy" })
  }
});
//sản phẩm bán chạy
router.get('/products/bestselling', async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection('products');
  const products = await productCollection.find().sort({ iventory: 1 }).limit(4).toArray();
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(404).json({ message: "Không tìm thấy" })
  }
});
//sản phẩm sale
router.get('/products/sale', async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection('products');
  const products = await productCollection.find({ sale: { $gt: 0 } }).sort({ sale: -1 }).limit(4).toArray();
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(404).json({ message: "Không tìm thấy" })
  }
});
//Tìm kiếm theo sản phẩm
router.get('/search/:keyword', async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection('products');
  const products = await productCollection.find({ name: new RegExp(req.params.keyword, 'i') }).toArray();
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(404).json({ message: "Không tìm thấy" })
  }
}
);
// //lấy chi tiết 1 sản phẩm
// router.get('/products/:id', async (req, res, next) => {
//   let id = new ObjectId(req.params.id);
//   const db = await connectDb();
//   const productCollection = db.collection('products');
//   const product = await productCollection.findOne({ _id: id });
//   if (product) {
//     res.status(200).json(product);
//   } else {
//     res.status(404).json({ message: "Không tìm thấy" })
//   }
// }
// );
//Lấy sản phẩm theo id
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
//Top 10 sản phẩm đánh giá tốt nhất
router.get("/topRating", async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection("products");
  const products = await productCollection
    .find()
    .sort({ rating: -1 })
    .limit(10)
    .toArray();
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(404).json({ message: "Không tìm thấy" });
  }
});

module.exports = router;
