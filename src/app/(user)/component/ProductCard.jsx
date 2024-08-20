"use client";
import React from 'react';
import Link from 'next/link';
import "../../../../public/css/home.css";
import AddCart from './addCart';


function ProductCard(props) {
  return (
    <>
      {props.data.map((products) => {
        const { _id, name, image, price, priceSale, sale } = products;
        return (
          <>
            <div class="col-md-3 sanpham-all" key={_id}>
              <div class="card">
                <div class="sanpham-1">
                  <Link href={`/Detail/${_id}`}>
                    <img src={`http://localhost:3000/images/ảnh 2/${image}`} class="card-img-top" alt={name} />
                  </Link>
                </div>
                <div class="card-body">
                  <h5 class="card-title">{name}</h5>
                  <div class="price">
                    <del class="card-price-1">{price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</del>
                    <span class="card-price">{priceSale.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                  </div>
                </div>
                <div class="card_btn">
                  {/* <button class="btn-them">thêm vào giỏ hàng</button> */}
                  <AddCart className="btn-them" product={products} quantity={1} size={"63"}>thêm vào giỏ hàng</AddCart>
                </div>
                <div class="card_items-icon">
                  <i class="eye fa-regular fa-eye"></i>
                  <i class="heart fa-solid fa-heart"></i>
                  <i class="share fa-solid fa-share-nodes"></i>
                </div>
                <div class="card_brand">
                  <span>Sale {sale}%</span>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}

export default ProductCard;