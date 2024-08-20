"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "../../../public/css/header.css";
import Danhmuc from './Danhmuc/page';
import { logout } from '../../../redux/slices/userSlices';
import { useEffect, useState } from 'react';


export default function Header() {
    const user = useSelector(state => state.auth.user);
    console.log(user);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch()
    const totalItem = useMemo(() => {
        return cart.reduce((total, item) => total + Number(item.quantity), 0);
    }, [cart]);
    const router = useRouter()
    const handleLogout = () => {
        dispatch(logout());
        router.push('/');
    };
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    // useEffect(() => {
    //     const token = document.cookie.split(';').find((c) => c.trim().startsWith('token='));
    //     if (token) {
    //         setIsLoggedIn(true);
    //     }
    // }, []);
    return (
        <>
            <div className="hethong">
                <div className="hethong-1">
                    <p><i className="fa-solid fa-house"></i> <span>Hệ thống Showroom</span></p>
                </div>
                <div className="lienhe">
                    <p>Mua hàng online: 0377 935 964</p>
                </div>
            </div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                    <Link className="navbar-brand" href="/">
                        <img src="/images/ảnh 2/logo.png" alt="" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" href="/trangchu" >Trang chủ</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/blog">Giới thiệu</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/sanpham">Sản phẩm</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    Danh mục
                                </a>
                                <Danhmuc />
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/lienhe">Liên hệ</Link>
                            </li>
                            <form className="d-flex ms-4" action="/timkiem">
                                <input className="form-control me-2" name="keyword" placeholder="Bạn muốn tìm giày gì" />
                            </form>
                            <li className="nav-item dropdown taikhoan-icon">
                                <a className="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fa-solid fa-circle-user"></i>
                                    <span>Tài khoản: <span className="user-name">{user ? user.username : ""}</span></span>
                                    {/* <Link href={isLoggedIn ? '/info' : '/login'}>
                                        <i class={isLoggedIn ? "bi bi-person fs-5  fw-bolder text-dark" : "bi bi-box-arrow-in-right fs-5  fw-bolder text-dark"} />
                                    </Link> */}
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="/register">Đăng ký</a></li>
                                    <li><a className="dropdown-item" href="/login">Đăng nhập</a></li>
                                    <li><a className="dropdown-item" href="#" onClick={handleLogout}>Thoát</a></li>
                                </ul>
                            </li>
                            <div className="cart-icon">
                                <Link href="/cart">
                                    <i className="fa-solid fa-cart-shopping"></i><span>Giỏ hàng {totalItem}</span>
                                </Link>
                            </div>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
