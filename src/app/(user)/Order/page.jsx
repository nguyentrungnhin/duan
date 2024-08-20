"use client";
import React, { useEffect, useState } from 'react';
import { Table, Container } from 'react-bootstrap';

function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const response = await fetch('http://localhost:3000/orders'); // URL API lấy danh sách đơn hàng
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        fetchOrders();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <Container>
            <h1 className="my-4">Order History</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th>User Details</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <OrderRow key={order._id} order={order} />
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

function OrderRow({ order }) {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchUserDetails() {
            try {
                // Giả sử thông tin người dùng đã được nhúng vào đơn hàng
                // Không cần gọi thêm API nếu thông tin đã có sẵn
                setUserDetails(order.user);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }

        fetchUserDetails();
    }, [order]);

    if (loading) return <td>Loading...</td>;
    if (error) return <td>Error: {error.message}</td>;

    return (
        <tr>
            <td>{order._id}</td>
            <td>{order.ngay}</td>
            <td>{order.status}</td>
            <td>{order.total_money.toLocaleString()} đ</td>
            <td>{userDetails?.fullname}</td>
        </tr>
    );
}

export default OrderHistory;
