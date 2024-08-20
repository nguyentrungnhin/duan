import React from "react";
// import "../../../../public/css/home.css";
import "../../../../public/css/home.css";
import Bestselling from "../component/Bestselling";
import ProductCard from "../component/ProductCard";
import ProductHot from "../component/ProductHot";
import Sale from "../component/Sale";

export default async function Trangchu() {
    const res = await fetch('http://localhost:3000/products', { cache: 'no-store' });
    const data = await res.json();
    console.log(data);
    return (
        <>
            <div id="carouselExampleIndicators" class="carousel slide">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="https://giaysneaker.store/media/wysiwyg/slidershow/home-12/banner_NIKE.jpg" class="d-block w-100" alt="Laptop" />
                    </div>
                    <div class="carousel-item">
                        <img src="https://authenticfeet.vteximg.com.br/arquivos/AUTHENTIC-banner%20principal-desk.jpg?v=638168382188200000" class="d-block w-100" alt="Laptop" />
                    </div>
                    <div class="carousel-item">
                        <img src="https://i.pinimg.com/originals/d0/b6/5c/d0b65c5c53657f897af6862c44d8a5e2.jpg" class="d-block w-100" alt="ao" />
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
            <div className="container">
                <div>
                    <div class="name-all">
                        <h3 class="name-tieude">Sản Phẩm</h3>
                    </div>
                    <div className="row ">
                        <ProductCard data={data} />
                    </div>
                    <ProductHot />
                    <Bestselling />
                    <Sale />
                </div>
            </div>
        </>
    );
};

