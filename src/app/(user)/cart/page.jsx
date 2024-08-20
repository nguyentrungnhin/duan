"use client";
import { useSelector, useDispatch } from 'react-redux';
import { removeCart, removeItem, updateItem } from '../../../../redux/slices/cartslices';
import { useRef, useState } from 'react';
import "../../../../public/css/cart.css";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Cart() {
    let cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    const router = useRouter();
    const [fullname, setFullname] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const closeBtn = useRef();
    const submit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user: {
                    fullname,
                    phone,
                    address,
                },
                dateil: cart,
                total_money: total,
            }),
        }).then(res => {
            alert("Đặt hàng thành công!");
            dispatch(removeCart());
            closeBtn.current.click();
            router.push("/")
        })
    };
    return (
        <>
            < div class="container" >
                <h3>giỏ hàng của bạn</h3>
                <div class="thongtin-sp">
                    <ul class="thongtin-all">
                        <li>
                            Sản phẩm
                        </li>
                        <li>
                            Đơn giá
                        </li>
                        <li>
                            Số lượng
                        </li>
                        <li>
                            Thành tiền
                        </li>
                        <li>
                            Xóa
                        </li>
                    </ul>
                </div>
                <form action="#">
                    <table>
                        <tbody>
                            {cart.map(product => (
                                < tr class="thanhtoan-all" key={product._id} >
                                    <td class="thanhtoan-1">
                                        <img src={`http://localhost:3000/images/ảnh 2/${product.image}`} alt={product.name} />
                                    </td>
                                    <td class="thanhtoan-2">
                                        <span class="ten-sp">{product.name}</span>
                                        <span class="size-th">Size: {product.size}</span>
                                        <span class="size-th">Thương hiệu: NEM</span>
                                    </td>
                                    <td class="thanhtoan-3">
                                        <p>{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                    </td>
                                    <td class="thanhtoan-4">
                                        <div class="thanhtoan-4-1">
                                            <input min="1"
                                                type="number"
                                                defaultValue={product.quantity}
                                                onChange={(e) =>
                                                    dispatch(
                                                        updateItem({
                                                            product,
                                                            quantity: e.target.value,
                                                            size: product.size,
                                                        })
                                                    )} />
                                        </div>
                                    </td>
                                    <td class="thanhtoan-5">
                                        {(product.price * product.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                    </td>
                                    <td class="thanhtoan-6">
                                        <button className="btn btn-danger" onClick={() =>
                                            dispatch(removeItem({ product, size: product.size }))}>
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>
                <div class="ghichu-all">
                    <div class="ghichu">
                        <div class="ghichu-1">
                            <textarea id="note" name="note" rows="4" cols="50" placeholder="Ghi chú"></textarea>
                        </div>
                        <div class="ghichu-2">
                            <div class="tong-all">
                                <p class="tong">Tổng: <span>{total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                </p>
                            </div>
                            <div class="thanhtoan-btn">
                                <button className="thanhtoan-btn-1"
                                    onClick={() => dispatch(removeCart())}>
                                    <i class="fa-solid fa-xmark"></i> xóa tất cả
                                </button>
                                {/* <button class="thanhtoan-btn-2">tiến hành thanh toán</button> */}
                                <button type="button" className="thanhtoan-btn-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Đặt hàng
                                </button>
                                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <form className="modal-dialog" onSubmit={submit}>
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">THông tin giao hàng</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={closeBtn}></button>
                                            </div>
                                            <div className="modal-body">
                                                <div class="mb-3">
                                                    <label for="fullname" class="form-label">Họ tên</label>
                                                    <input type="text" class="form-control" id="fullname" onChange={(e) => setFullname(e.target.value)} />
                                                </div>
                                                <div class="mb-3">
                                                    <label for="phone" class="form-label">Số điện thoại</label>
                                                    <input type="text" class="form-control" id="phone" onChange={(e) => setPhone(e.target.value)} />
                                                </div>
                                                <div class="mb-3">
                                                    <label for="address" class="form-label">Địa chỉ</label>
                                                    <input type="text" class="form-control" id="address" onChange={(e) => setAddress(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                                                <button type="submit" className="btn btn-dark">Xác nhận</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tieptuc">
                    <Link href="/">
                        <p><i class="fa-solid fa-reply"></i>Tiếp tục mua hàng</p>
                    </Link>
                </div>
            </div >
        </>
    );
};