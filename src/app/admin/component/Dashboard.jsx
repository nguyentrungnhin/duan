import Link from "next/link";

export default function Dashboard() {
    return (
        <>
            <div className="main-right-top-content-1">
                <h3>Dashboard</h3>
                <div className="main-right-top-content-three-box">
                    <div className="main-right-top-content-three-box-1">
                        <div className="main-right-top-content-three-box-icon">
                            <i className="fa-solid fa-user"></i>
                        </div>
                        <div className="main-right-top-content-three-box-icon-information">
                            <h4>1.890.000 $</h4>
                            <span>Tổng Danh Thu Tháng</span>
                        </div>
                    </div>
                    <div className="main-right-top-content-three-box-1">
                        <div className="main-right-top-content-three-box-icon">
                            <i className="fa-solid fa-envelope icon-thu"></i>
                        </div>
                        <div className="main-right-top-content-three-box-icon-information">
                            <h4>3+</h4>
                            <span>Thành Viên (Đang Tuyển)</span>
                        </div>
                    </div>
                    <div className="main-right-top-content-three-box-1 child-cuoi-thongke">
                        <div className="main-right-top-content-three-box-icon">
                            <i className="fa-solid fa-tags icon-tag"></i>
                        </div>
                        <div className="main-right-top-content-three-box-icon-information">
                            <h4>1555 </h4>
                            <span>Tổng Đơn Hàng</span>
                        </div>
                    </div>
                </div>
                <div className="main-right-map-container-all">
                    <div className="main-right-map-container">
                        <div className="main-right-map-container-khung">
                            <h5>Bản Đồ Thế Giới</h5>
                            <div className="main-right-map-img">
                                <img src="http://localhost:3000/images/admin/Map.png" alt="" />
                                <div className="dinhvi">
                                    <div className="main-dinhvi-cho-vui">
                                        <ul className="ul-tamgiac-map">
                                            <div className="main-dinhvi-cho-vui-1">
                                                <div className="main-dinhvi-cho-vui-1-img">
                                                    <img src="http://localhost:3000/images/admin/Raica.jpg" alt="" />
                                                </div>
                                                <div className="main-dinhvi-cho-vui-1-vitri-here">
                                                    <div className="main-dinhvi-cho-vui-1-vitri-here-world">
                                                        <img src="http://localhost:3000/images/admin/Flag_VietNam.png" alt="" />
                                                    </div>
                                                    <span className="vitri-here"><strong>Việt Nam</strong></span>
                                                </div>
                                            </div>
                                            <div className="main-dinhvi-cho-vui-2">
                                                <li>
                                                    <Link href="#"><strong>Tên :</strong> Trương Công Khang</Link>
                                                </li>
                                                <li>
                                                    <Link href="#"><strong>Age :</strong>19 <strong className="chieucao-myself">Cao:</strong> 170 (Cm)</Link>
                                                </li>
                                                <li>
                                                    <Link href="#"><strong>Nghề Nghiệp :</strong> Sinh Viên</Link>
                                                </li>
                                                <li>
                                                    <Link href="#">
                                                        <strong>Link FB:</strong>
                                                        <span>Trương Khang</span>
                                                    </Link>
                                                </li>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                                <div className="dinhvi2">
                                    <div className="main-dinhvi-cho-vui">
                                        <ul className="ul-tamgiac-map">
                                            <div className="main-dinhvi-cho-vui-1">
                                                <div className="main-dinhvi-cho-vui-1-img">
                                                    <img src="http://localhost:3000/images/admin/avart-meo2.jpg" alt="" />
                                                </div>
                                                <div className="main-dinhvi-cho-vui-1-vitri-here">
                                                    <div className="main-dinhvi-cho-vui-1-vitri-here-world">
                                                        <img src="http://localhost:3000/images/admin/Flag_US.PNG" alt="" />
                                                    </div>
                                                    <span className="vitri-here"><strong>HaWaii (Mỹ)</strong></span>
                                                </div>
                                            </div>
                                            <div className="main-dinhvi-cho-vui-2">
                                                <li><Link href="#"><strong>Tên :</strong> Nguyễn Trung Nhịn</Link>
                                                </li>
                                                <li><Link href="#"><strong>Age :</strong>19 <strong
                                                    className="chieucao-myself">Cao:</strong> 175 (Cm)</Link>
                                                </li>
                                                <li><Link href="#"><strong>Nghề Nghiệp :</strong> Lập Trình </Link>
                                                </li>
                                                <li>
                                                    <Link href="#">
                                                        <strong>Link FB:</strong>
                                                        <span href="#">Không Biết</span>
                                                    </Link>
                                                </li>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                                <div className="dinhvi3">
                                    <div className="main-dinhvi-cho-vui">
                                        <ul className="ul-tamgiac-map">
                                            <div className="main-dinhvi-cho-vui-1">
                                                <div className="main-dinhvi-cho-vui-1-img">
                                                    <img src="http://localhost:3000/images/admin/avart-meo3.jpg" alt="" />
                                                </div>
                                                <div className="main-dinhvi-cho-vui-1-vitri-here">
                                                    <div className="main-dinhvi-cho-vui-1-vitri-here-world">
                                                        <img src="http://localhost:3000/images/admin/Flag_Nga.png" alt="" />
                                                    </div>
                                                    <span className="vitri-here"><strong>Mát-xcơ-va
                                                        (Nga)</strong></span>
                                                </div>
                                            </div>
                                            <div className="main-dinhvi-cho-vui-2">
                                                <li><Link href="#"><strong>Tên :</strong> Nguyễn Công Bền</Link></li>
                                                <li><Link href="#"><strong>Age :</strong>19 <strong
                                                    className="chieucao-myself">Cao:</strong> 172 (Cm)</Link>
                                                </li>
                                                <li><Link href="#"><strong>Nghề Nghiệp :</strong> Lập Trình </Link>
                                                </li>
                                                <li>
                                                    <Link href="#">
                                                        <strong>Link FB:</strong>
                                                        <span href="#">Nguyễn Công Bền</span>
                                                    </Link>
                                                </li>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                                <div className="dinhvi4">
                                    <div className="main-dinhvi-cho-vui">
                                        <ul className="ul-tamgiac-map">
                                            <div className="main-dinhvi-cho-vui-1">
                                                <div className="main-dinhvi-cho-vui-1-img">
                                                    <img src="http://localhost:3000/images/admin/avart-meo3.jpg" alt="" />
                                                </div>
                                                <div className="main-dinhvi-cho-vui-1-vitri-here">
                                                    <div className="main-dinhvi-cho-vui-1-vitri-here-world">
                                                        <img src="http://localhost:3000/images/admin/Flag_Nga.png" alt="" />
                                                    </div>
                                                    <span className="vitri-here"><strong>Mát-xcơ-va
                                                        (Nga)</strong></span>
                                                </div>
                                            </div>
                                            <div className="main-dinhvi-cho-vui-2">
                                                <li><Link href="#"><strong>Tên :</strong> Nguyễn Công Bền</Link></li>
                                                <li>
                                                    <Link href="#">
                                                        <strong>Age :</strong>19
                                                        <strong className="chieucao-myself">Cao:</strong> 172 (Cm)
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="#">
                                                        <strong>Nghề Nghiệp :</strong>
                                                        <span>Lập Trình</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="#">
                                                        <strong>Link FB:</strong>
                                                        <span href="#">Nguyễn Công Bền</span>
                                                    </Link>
                                                </li>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}