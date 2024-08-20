'use client';
import React, { useState, useEffect } from 'react';
import Link from "next/link";

export default function Products() {
    const [data, setData] = useState([]);

    const fetchProducts = async () => {
        const res = await fetch("http://localhost:3000/products", {
            cache: 'no-store'
        });
        const newData = await res.json();
        setData(newData);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const deleteProduct = async (id) => {
        if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
            const res = await fetch(`http://localhost:3000/products/deleteproduct/${id}`, {
                method: 'DELETE',
            });
            const result = await res.json();
            if (result.message) {
                fetchProducts();
            }
        }
    };

    return (
        <div className="main-right-top-content">
            <h3>Sản Phẩm</h3>
            <div className="container-product-admin">
                <div className="container-product-admin-title">
                    <h3>
                        Sản Phẩm
                    </h3>
                    <Link href="/admin/Product/addProduct" id="openAppPage"><i className="fa-solid fa-plus"></i>Thêm sản phẩm</Link>

                </div>
                <div className="content-table-product-admin">
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên Sản Phẩm</th>
                                <th>Hình Ảnh</th>
                                <th>Giá</th>
                                <th>Giá Khuyến Mãi</th>
                                <th>Danh Mục</th>
                                <th>Thao Tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((product, index) => (
                                <tr key={product._id}>
                                    <td>{index + 1}</td>
                                    <td>{product.name}</td>
                                    <td><img src={`http://localhost:3000/images/ảnh 2/${product.image}`} width='100px' /></td>
                                    <td>{product.price}</td>
                                    <td>{product.priceSale}</td>
                                    <td>{product.category.tenLoai}</td>
                                    <td>
                                        <Link class="openEditPage admin-product-edit" href={`/admin/Product/edit/${product._id}`}><i class="fa-solid fa-pencil"></i></Link>
                                        <button className="detelePro admin-product-remove-item" onClick={() => deleteProduct(product._id)}><i class="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div id="editModal" className="modal">

                    </div>
                    <div id="addModal" className="modal">
                        <div className="modal-content">
                            <h3>Thêm Sản Phẩm</h3>
                            <span className="close">&times;</span>
                            <div className="form">
                                <label for="">Tên Sản Phẩm</label>
                                <input type="text" id="name" placeholder="Nhập Tên Sản Phẩm ..." />
                                <label for="">Hình Ảnh</label>
                                <input type="file" id="image" />
                                <label for="">Giá</label>
                                <input type="text" id="price" placeholder="Nhập Giá Sản phẩm ..." />
                                <label for="">Giá Khuyến Mãi</label>
                                <input type="text" id="sale" placeholder="Nhập Giá Sale..." />
                                <label for="">Danh Mục</label>
                                <select id="category">
                                    <option value="NIKE">NIKE</option>
                                    <option value="ADIDAS">ADIDAS</option>
                                </select>
                                <br />
                                {/* <button id="addPro">Thêm Sản Phẩm</button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}