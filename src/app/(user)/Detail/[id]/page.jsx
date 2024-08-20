"use client";
import { addItem } from "../../../../../redux/slices/cartslices";
import { useDispatch } from "react-redux";
import "../../../../../public/css/chitietsanpham.css";
import "../../../../../public/css/home.css";
import { useState } from "react";
import Link from "next/link";
import useSWR from 'swr';
import AddCart from "../../component/addCart";


export default function DetailPage({ params }) {
    const fetcher = (...agrs) => fetch(...agrs).then((res) => res.json());
    const { data: product,
        error: errorProduct,
        isLoading: isLoadingProduct,
    } = useSWR(`http://localhost:3000/products/id/${params.id}`,
        fetcher
    );
    const dispatch = useDispatch();
    const [size, setSize] = useState("57");
    const [quantity, setQuantity] = useState(1);
    if (errorProduct) return <div>Lỗi load dữ liệu.</div>;
    if (isLoadingProduct) return <div>Đang tải</div>;

    return (
        <>
            <div className="container-all">
                <div className="container">
                    <div className="container-hihi">
                        <div className="title-dieu-huong">
                            TRANG CHỦ / TẤT CẢ SẢN PHẨM / Giày CÔNG SỞ D18202
                        </div>
                        <div className="detail-all">
                            <div className="detail-left-img">
                                <div className="detail-left-img-phu">
                                    <span className="detail-left-img-phu-top"><i className="fa-solid fa-chevron-up"></i></span>
                                    <span className="detail-left-img-phu-bottom"><i className="fa-solid fa-chevron-down"></i></span>
                                    <img src="/images/banner-giày2.jpeg" alt="" />
                                    <img src={`http://localhost:3000/images/ảnh 2/${product.image}`} alt={product.name} />
                                    <img src={`http://localhost:3000/images/ảnh 2/${product.image}`} alt={product.name} />
                                    <img src={`http://localhost:3000/images/ảnh 2/${product.image}`} alt={product.name} />
                                </div>
                                <div className="detail-left-img-main">
                                    <img src={`http://localhost:3000/images/ảnh 2/${product.image}`} alt={product.name} />
                                </div>
                            </div>
                            <div className="detail-information">
                                <div className="detail-information-main">
                                    <h4>
                                        {product.name}
                                        <br />
                                        <div className="danh-muc">
                                            Danh mục:{" "}
                                            <Link href={`/category/${product.categoryId}`}>{product.category.tenLoai}
                                            </Link>
                                        </div>
                                        <div className="text-warning">
                                            {
                                                [...Array(Math.floor(product.rating))].map((i) => {
                                                    return <i class="fa-solid fa-star"></i>
                                                })
                                            }
                                            {
                                                [...Array(5 - Math.floor(product.rating))].map((i) => {
                                                    return <i class="fa-regular fa-star"></i>
                                                })
                                            }
                                            <span className="text-dark">
                                                {product.rating}
                                            </span>
                                        </div>
                                    </h4>
                                    <span>
                                        Thương hiệu: NEM <br /> Mã SP: 182021412462120418
                                    </span>

                                    <div className="detail-price">
                                        <span>
                                            {product.price.toLocaleString()}Đ
                                        </span>
                                    </div>
                                    <div className="detail-kichthuoc">
                                        <span>
                                            Kích thước
                                        </span>
                                        <div class="detail-kt-items">
                                            <div class="detail-kt-item active">
                                                <button value="37" onClick={(e) => setSize(e.target.value)}>Size 37</button>
                                            </div>
                                            <div class="detail-kt-item">
                                                <button value="38" onClick={(e) => setSize(e.target.value)}>Size 38</button>
                                            </div>
                                            <div class="detail-kt-item">
                                                <button value="39" onClick={(e) => setSize(e.target.value)}>Size 39</button>
                                            </div>
                                            <div class="detail-kt-item">
                                                <button value="40" onClick={(e) => setSize(e.target.value)}>Size 40</button>
                                            </div>
                                            <div class="detail-kt-item">
                                                <button value="41" onClick={(e) => setSize(e.target.value)}>Size 41</button>
                                            </div>
                                            <div class="detail-kt-item">
                                                <button value="42" onClick={(e) => setSize(e.target.value)}>Size 42</button>
                                            </div>
                                            <div class="detail-kt-item">
                                                <button value="43" onClick={(e) => setSize(e.target.value)}>Size 43</button>
                                            </div>
                                        </div>
                                        {/* <div className="detail-kt-items">
                                            Size:
                                            <select className="form-select mb-3" onChange={(e) => setSize(e.target.value)}>
                                                <option value="57">57</option>
                                                <option value="58">58</option>
                                                <option value="59">59</option>
                                                <option value="60">60</option>
                                                <option value="61">61</option>
                                                <option value="62">62</option>
                                                <option value="63">63</option>
                                                <option value="64">64</option>
                                                <option value="65">65</option>
                                            </select>
                                        </div> */}
                                    </div>
                                    <div className="detail-color">
                                        <span>Màu Sắc</span>
                                        <span className="cricle-detail-1">
                                        </span>
                                    </div>
                                    <div className="detail-quality">
                                        <span>
                                            Số lượng
                                        </span>
                                        <form action="#">
                                            <button className="detail-giam"><i className="fa-solid fa-chevron-left"></i></button>
                                            <input min="1" type="number" defaultValue={1} onChange={(e) => setQuantity(e.target.value)} />
                                            <button className="detail-tang"><i className="fa-solid fa-chevron-right"></i></button>
                                        </form>
                                    </div>
                                    <div className="detail-btn-all">
                                        <button className="detail-add-to-cart" onClick={() => dispatch(addItem({ product, quantity, size }))} >Thêm Vào Giỏ Hàng</button>
                                        {/* <button className="detail-buy-now">Mua Ngay</button> */}
                                        <AddCart className="btn-them" product={product} quantity={quantity} size={size}>
                                            Mua Ngay
                                        </AddCart>
                                    </div>
                                    <div className="detail-product-detail">
                                        <span>
                                            <b>Chất liệu:</b> Giày của chúng tôi được làm từ những chất liệu cao cấp như da bò mềm mại, vải thô bền bỉ và lưới thoáng khí, mang đến sự kết hợp hoàn hảo. <br />
                                            <b>Thông tin sản phẩm:</b> {product.description} <br />
                                            <b>Sản phẩm thuộc dòng sản phẩm của:</b> <Link href={`http://localhost:3000/categories/${product.categoryId}`}>{product.category.tenLoai}
                                            </Link> <br />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};