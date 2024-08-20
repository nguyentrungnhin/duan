import Link from "next/link";
export default function Leftbar() {
    return (
        <>
            <div className="container-left-all">
                <div className="ct-left-content-temple-top">
                    <div className="content-temple-top-img">
                        <div className="content-temple-top-img-vien">
                            <Link href="index.html">
                                <img src="http://localhost:3000/images/admin/Raica.jpg" alt="" />
                            </Link>
                        </div>
                    </div>
                    <h3>Rái Cá Đỏ</h3>
                    <div className="content-temple-top-icon-thongke">
                        <div className="content-temple-top-icon-thongke-1">
                            <i className="fa-regular fa-eye"></i> <br />
                            <span>2,594</span>
                        </div>
                        <div className="content-temple-top-icon-thongke-1">
                            <i className="fa-regular fa-comment"></i> <br />
                            <span>465</span>
                        </div>
                        <div className="content-temple-top-icon-thongke-1">
                            <i className="fa-regular fa-heart"></i> <br />
                            <span>551</span>
                        </div>
                    </div>
                    <div className="content-temple-top-button">
                        <button>Follow</button>
                        <button>Message</button>
                    </div>
                </div>
                <div className="ct-left-content-temple-bottom">
                    <div className="ct-left-content-temple-bottom-menu">
                        <ul>
                            <li><Link href="/admin"><i className="fa-solid fa-house"></i> <span>Dashboard</span></Link></li>
                            <li><Link href="/admin/Product"><i className="fa-brands fa-slack"></i> <span>Sản Phẩm</span></Link>
                            </li>
                            <li><Link href="/admin/User"><i className="fa-solid fa-briefcase"></i><span>Thành Viên</span></Link></li>
                            <li><Link href="/admin/Orders"><i className="fa-solid fa-inbox"></i> <span>Đơn hàng</span></Link></li>
                            <li><Link href="/admin/Category"><i className="fa-solid fa-handshake"></i> <span>Danh mục</span></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}