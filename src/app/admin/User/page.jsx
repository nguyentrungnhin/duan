"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import "../../../../public/css/user.css";

export default function User() {
    const [data, setData] = useState([]);

    const fetchUsers = async () => {
        const res = await fetch("http://localhost:3000/users", {
            cache: 'no-store'
        });
        const newData = await res.json();
        setData(newData);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const deleteUser = async (id) => {
        if (confirm('Bạn có chắc chắn muốn xóa người dùng này không?')) {
            const res = await fetch(`http://localhost:3000/users/deleteuser/${id}`, {
                method: 'DELETE',
            });
            const result = await res.json();
            if (result.message) {
                fetchUsers();
            }
        }
    };

    const toggleRole = async (id, currentRole) => {
        const newRole = currentRole === 0 ? 1 : 0;
        if (confirm(`Bạn có chắc chắn muốn ${newRole === 0 ? 'phân quyền Admin' : 'quay lại thành người dùng'} cho người dùng này không?`)) {
            const res = await fetch(`http://localhost:3000/users/updateuser/role/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role: newRole }),
            });
            const result = await res.json();
            if (res.ok) {
                fetchUsers();
            } else {
                console.error(result.message || 'Failed to update role');
            }
        }
    };

    return (
        <>
            <div className="main-right-top-content">
                <h3>Trang Người Dùng</h3>
                {data.map((user, index) => (
                    <div key={user._id} className="main-right-top-content-three-box">
                        <div className="main-right-top-content-three-box-1">
                            <div className="card-box-all-img-message">
                                <div className="card-box-all-img">
                                    <img src="http://localhost:3000/images/avart.jpg" alt="" />
                                    <span className="light"></span>
                                </div>
                                <div className="card-box-all-btn">
                                    <button className="btn-tiktok"> <i className='bx bxl-tiktok'></i> Follow</button>
                                    <button className="btn-facebook"><i className='bx bxl-facebook'></i>Message</button>
                                </div>
                                <div className="card-box-all-id">
                                    <span className="id-company">#{index + 1}</span>
                                </div>
                            </div>
                            <div className="card-box-all-content-information">
                                <div className="box-all-content-information-users">
                                    <h3>
                                        {user.username}
                                    </h3>
                                    <i>Website Design</i>
                                    <div className="content-information-user">
                                        <span className="age-user">Email: {user.email}</span>
                                        <span className="home-user">Địa chỉ : {user.address}</span>
                                        <span className="company-user">Số điện thoại: {user.phone}</span>
                                    </div>
                                    <div className="content-information-salary-nv-btn">
                                        <div className="content-information-salary-nv">
                                            <div className="content-information-salary">
                                                <span>Tên:</span>
                                                <b>{user.username}</b>
                                            </div>
                                            <div className="content-information-nv">
                                                <span>Chức Vụ</span>
                                                <b>{user.role === 0 ? 'Admin' : 'Người dùng'}</b>
                                            </div>
                                            <div className="content-information-nv">
                                                <span>Ngày tạo</span>
                                                <b>{new Date(user.createdAt).toLocaleDateString()}</b>
                                            </div>
                                        </div>
                                        <div className="content-information-btn">
                                            <button className="remove" onClick={() => deleteUser(user._id)}><i className='bx bx-trash'></i> Xóa Thông Tin</button>
                                            {/* <Link href={`/admin/User/edit/${user._id}`}><button className="edit"><i className='bx bxs-edit'></i>Sửa Thông Tin</button></Link> */}
                                            <button className="edit" onClick={() => toggleRole(user._id, user.role)}><i className='bx bxs-edit'></i>
                                                {user.role === 0 ? 'Role User' : 'Role Admin'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
