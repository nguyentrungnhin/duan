'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Orders() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch orders from the API
    const fetchOrders = async () => {
        try {
            const res = await fetch('http://localhost:3000/orders', {
                cache: 'no-store'
            });
            if (res.ok) {
                const newData = await res.json();
                setData(newData);
            } else {
                setError('Lỗi khi lấy danh sách đơn hàng');
            }
        } catch (error) {
            setError('Lỗi mạng: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Handle order status change
    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:3000/orders/${orderId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Update status locally
            setData(data.map(order =>
                order._id === orderId ? { ...order, status: newStatus } : order
            ));
        } catch (error) {
            console.error('Error updating order status:', error);
            setError('Failed to update status');
        }
    };

    // Handle order deletion
    const deleteOrder = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này không?')) {
            try {
                const res = await fetch(`http://localhost:3000/orders/deleteorder/${id}`, {
                    method: 'DELETE',
                });
                const result = await res.json();
                if (result.message) {
                    setData(data.filter(order => order._id !== id));
                }
            } catch (error) {
                console.error('Lỗi khi xóa đơn hàng:', error);
                setError('Failed to delete order');
            }
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="main-right-top-content">
            <h3>Đơn Hàng</h3>
            <div className="container-product-admin">
                <div className="container-product-admin-title">
                    <h3>Đơn Hàng</h3>
                    <Link href="/admin/Order/addOrder" id="openAppPage">
                        <i className="fa-solid fa-plus"></i> Xem chi tiết
                    </Link>
                </div>
                <div className="content-table-product-admin">
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã Đơn Hàng</th>
                                <th>Khách Hàng</th>
                                <th>Số Điện Thoại</th>
                                <th>Địa Chỉ</th>
                                <th>Trạng Thái</th>
                                <th>Thao Tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((order, index) => (
                                <tr key={order._id}>
                                    <td>{index + 1}</td>
                                    <td>{order._id}</td>
                                    <td>{order.user?.fullname}</td>
                                    <td>{order.user?.phone}</td>
                                    <td>{order.user?.address}</td>
                                    <td>{order.status}</td>
                                    <td>
                                        <select
                                            className="form-select"
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                        >
                                            <option value="">Chọn trạng thái</option>
                                            <option value="pending">Đang chờ xử lý</option>
                                            <option value="processing">Đang xử lý</option>
                                            <option value="shipped">Đã giao hàng</option>
                                            <option value="delivered">Đã giao tận nơi</option>
                                            <option value="cancelled">Đã hủy</option>
                                        </select>
                                    </td>
                                    <td>
                                        <Link className="openEditPage admin-product-edit" href={`/admin/Order/edit/${order._id}`}>
                                            <i className="fa-solid fa-pencil"></i>
                                        </Link>
                                        <button className="detelePro admin-product-remove-item" onClick={() => deleteOrder(order._id)}>
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
