'use client';
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import "../../../../public/css/adminDanhmuc.css";

export default function Products() {
    const [data, setData] = useState([]);

    const fetchProducts = async () => {
        const res = await fetch("http://localhost:3000/categories", {
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
            const res = await fetch(`http://localhost:3000/categories/deletecategory/${id}`, {
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
            <h3>Danh mục</h3>
            <div className="container-product-admin">
                <div className="container-product-admin-title">
                    <h3>
                        Danh mục
                    </h3>
                    {/* <button id="openAppPage"> <i className="fa-solid fa-plus"></i> Thêm Sản Phẩm</button> */}
                    <Link href="/admin/Category/addCategories" id="openAppPage"><i className="fa-solid fa-plus"></i>Thêm danh mục</Link>
                </div>
                <div className="content-table-product-admin">
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên Danh Mục</th>
                                <th>Mô tả</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((categories, index) => (
                                <tr key={categories._id}>
                                    <td>{index + 1}</td>
                                    <td>{categories.tenLoai}</td>
                                    <td>{categories.description}</td>
                                    <td>
                                        <Link class="openEditPage admin-product-edit" href={`/admin/Category/edit/${categories._id}`}><i class="fa-solid fa-pencil"></i></Link>
                                        <button className="detelePro admin-product-remove-item" onClick={() => deleteProduct(categories._id)}><i class="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div id="editModal" className="modal">

                    </div>
                    <div id="addModal" className="modal">
                        <div className="modal-content">
                            <h3>Thêm Danh Mục</h3>
                            <span className="close">&times;</span>
                            <div className="form">
                                <label for="">Tên Sản Phẩm</label>
                                <input type="text" id="name" placeholder="Nhập Tên Sản Phẩm ..." />
                                <label for="">Mô tả</label>
                                <input type="number" id="description" placeholder="Nhập mô tả ..." />
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