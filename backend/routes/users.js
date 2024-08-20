var express = require('express');
var router = express.Router();
const connectDb = require('../model/db');
// const bcrypt = require('bcrypt');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const JWT_SECRET = 'your_jwt_secret_key'; // Replace with your actual JWT secret key

//show user
router.get('/', async (req, res) => {
    try {
        const db = await connectDb();
        const userCollection = db.collection('users');

        // Lấy tất cả người dùng
        const users = await userCollection.find({}).toArray();

        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Lỗi khi lấy người dùng' });
    }
});

//xóa user
router.delete('/deleteuser/:id', async (req, res) => {
    const db = await connectDb();
    const userCollection = db.collection('users');
    const id = new ObjectId(req.params.id);

    try {
        const result = await userCollection.deleteOne({ _id: id });
        if (result.deletedCount) {
            res.status(200).json({ message: "Xóa người dùng thành công" });
        } else {
            res.status(404).json({ message: "Không tìm thấy người dùng" });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
    }
});

//sửa user
// router.put('/updateuser/:id', async (req, res) => {
//     const db = await connectDb();
//     const userCollection = db.collection('users');
//     const id = new ObjectId(req.params.id);
//     const { email, username, phone, address, role } = req.body;

//     // Tạo đối tượng chứa thông tin cần cập nhật
//     let updatedUser = { email, username, phone, address, role };

//     try {
//         // Cập nhật thông tin người dùng trong cơ sở dữ liệu
//         const result = await userCollection.updateOne({ _id: id }, { $set: updatedUser });

//         if (result.matchedCount) {
//             // Nếu tìm thấy người dùng và cập nhật thành công
//             res.status(200).json({ message: "Sửa thông tin người dùng thành công" });
//         } else {
//             // Nếu không tìm thấy người dùng với id tương ứng
//             res.status(404).json({ message: "Không tìm thấy người dùng" });
//         }
//     } catch (error) {
//         // Xử lý lỗi
//         console.error(error);
//         res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
//     }
// });

router.put('/updateuser/role/:id', async (req, res) => {
    const db = await connectDb();
    const userCollection = db.collection('users');
    const id = new ObjectId(req.params.id);
    const { role } = req.body;

    // Tạo đối tượng chỉ chứa thông tin cần cập nhật
    const updatedUser = { role };

    try {
        // Cập nhật vai trò người dùng trong cơ sở dữ liệu
        const result = await userCollection.updateOne({ _id: id }, { $set: updatedUser });

        if (result.matchedCount) {
            // Nếu tìm thấy người dùng và cập nhật thành công
            res.status(200).json({ message: "Cập nhật vai trò người dùng thành công" });
        } else {
            // Nếu không tìm thấy người dùng với id tương ứng
            res.status(404).json({ message: "Không tìm thấy người dùng" });
        }
    } catch (error) {
        // Xử lý lỗi
        console.error(error);
        res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
    }
});


//lấy user theo id
router.get("/user/:id", async (req, res) => {
    try {
        // Kết nối đến cơ sở dữ liệu
        const db = await connectDb();
        const userCollection = db.collection("users");

        // Tìm người dùng theo ID
        const user = await userCollection.findOne({
            _id: new ObjectId(req.params.id),
        });

        if (user) {
            // Nếu tìm thấy người dùng, trả về thông tin
            res.status(200).json(user);
        } else {
            // Nếu không tìm thấy người dùng, trả về lỗi 404
            res.status(404).json({ message: "Không tìm thấy người dùng" });
        }
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Đăng ký
router.post('/register', async (req, res) => {
    try {
        const { email, password, username, phone, address, role } = req.body;

        const db = await connectDb();
        const usersCollection = db.collection('users');

        // Check if the email is already registered
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email đã tồn tại.' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            email,
            password: hashedPassword,
            username,
            phone,
            address,
            role,
            createdAt: new Date(),
        };

        // Insert the new user into the database
        const result = await usersCollection.insertOne(newUser);

        if (result.insertedCount === 1) {
            res.status(201).json({ message: 'Đăng ký thành công.' });
        } else {
            res.status(500).json({ message: 'Đã xảy ra lỗi khi đăng ký.' });
        }
    } catch (error) {
        console.error("Error during user registration:", error);
        res.status(500).json({ message: "Đã xảy ra lỗi máy chủ" });
    }
});

//Đăng nhập
router.post('/login', async (req, res) => {
    const db = await connectDb();
    const userCollection = db.collection('users');
    const { email, password } = req.body;

    const user = await userCollection.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: "Email không tồn tại" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        return res.status(400).json({ message: "Mật khẩu không chính xác" });
    }

    const token = jwt.sign({
        email: user.email,
        role: user.role, // Đảm bảo rằng vai trò được lưu trong token
        username: user.username
    }, 'secret', { expiresIn: '1h' });

    res.status(200).json({ token });
});
//Checktoken
router.get('/checktoken', async (req, res) => {
    // Lấy token từ header Authorization
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Token không được cung cấp" });
    }

    // Xác thực token
    jwt.verify(token, 'secret', async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token không hợp lệ" });
        }

        // Token hợp lệ, lấy thông tin người dùng từ token
        const { email } = decoded;

        // Kết nối đến cơ sở dữ liệu để lấy thông tin người dùng
        const db = await connectDb();
        const userCollection = db.collection('users');
        const user = await userCollection.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Người dùng không tìm thấy" });
        }

        // Trả về thông tin người dùng và vai trò
        res.status(200).json({
            message: "Token hợp lệ",
            role: user.role
        });
    });
});

//lấy thông tin chi tiết user qua token
router.get('/detailuser', async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'secret', async (err, user) => {
        if (err) {
            return res.status(401).json({ message: "Token không hợp lệ" });
        }
        const db = await connectDb();
        const userCollection = db.collection('users');
        const userInfo = await userCollection.findOne({ email: user.email });
        if (userInfo) {
            res.status(200).json(userInfo);
        } else {
            res.status(404).json({ message: "Không tìm thấy user" });
        }
    });
});




module.exports = router;
