import React from "react";
import ProductCard from "../component/ProductCard";
export default async function ProductHot() {
    const res = await fetch('http://localhost:3000/products/hot', { cache: 'no-store' });
    const data = await res.json();
    console.log(data);
    return (
        <>
            <div className="row d-flex justify-content-between mx-1 ">
                <div class="name-all">
                    <h3 class="name-tieude">Sản Phẩm nổi bật</h3>
                </div>
            </div>
            <div className="row ">
                <ProductCard data={data} />
            </div>
        </>
    );
};