"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "../component/ProductCard";
import "../../../../public/css/sanpham.css"
import Link from "next/link";
import useSWR from "swr";

export default function Products({ params }) {
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [showSale, setShowSale] = useState(false);
  const [showHot, setShowHot] = useState(false);
  const [showBestselling, setShowBestselling] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("http://localhost:3000/products", {
        cache: "no-store",
      });
      const data = await res.json();
      const processedData = data.map((product) => ({
        ...product,
        finalPrice:
          product.sale > 0
            ? (product.price * (1 - product.sale / 100)).toFixed(2)
            : product.price,
      }));
      setProducts(processedData);

      const uniqueCategories = [
        ...new Set(data.map((product) => product.categoryId)),
      ];
      setCategories(uniqueCategories);
    };

    fetchProducts();
  }, []);
  const fetcher = (...agrs) => fetch(...agrs).then((res) => res.json());
  const {
    data: categoryList,
    error: errorCategory,
    isLoading: isLoadingCategory,
  } = useSWR(`http://localhost:3000/categories`, fetcher);
  if (errorCategory) return <strong>Có lối xảy ra</strong>
  if (isLoadingCategory) return <strong>Đang tải dữ liệu...</strong>

  const getFilteredProducts = () => {
    let filteredProducts = [...products];

    if (!showAll) {
      if (showSale) {
        filteredProducts = filteredProducts.filter(
          (product) => product.sale > 0
        );
      }
      if (showHot) {
        filteredProducts = filteredProducts.filter(
          (product) => product.view > 100
        );
      }
      if (showBestselling) {
        filteredProducts = filteredProducts.sort(
          (a, b) => b.inventory - a.inventory
        );
      }
    }

    if (priceRange.min || priceRange.max) {
      const min = parseFloat(priceRange.min) || 0;
      const max = parseFloat(priceRange.max) || Infinity;
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= min && product.price <= max
      );
    }

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.categoryId === selectedCategory
      );
    }

    filteredProducts.sort((a, b) => {
      if (sortOrder === "desc") {
        return b.price - a.price;
      } else {
        return a.price - b.price;
      }
    });

    return filteredProducts;
  };

  const HAHAHA = getFilteredProducts();

  return (
    <>
      <div className="container mt-5">
        <h5 className="text-success">SẢN PHẨM</h5>
        <div className="row">
          <div className="col-sm-3">
            <div class="card-3 mb-3">
              <div class="card-header">
                <h5 className="mb-0">Sắp xếp</h5>
              </div>
              <div className="fist">
                <select
                  id="categorySelect"
                  className="form-select w-auto mt-2"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Tất cả danh mục</option>
                  {categoryList.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.tenLoai}
                    </option>
                  ))}
                </select>
                <select
                  className="form-select w-auto mt-2"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="asc">Giá tăng dần</option>
                  <option value="desc">Giá giảm dần</option>
                </select>
              </div>
            </div>
            <div className="card-1 mb-3">
              <div class="card-header">
                <h5 className="mb-0">Show sản phẩm</h5>
              </div>
              <div className="huhu">
                <label htmlFor="showAll" className="hihi" >Hiển thị tất cả</label>
                <input type="checkbox" id="showAll" checked={showAll} onChange={(e) => {
                  setShowAll(e.target.checked);
                  setShowSale(false);
                  setShowHot(false);
                  setShowBestselling(false);
                  setPriceRange({ min: "", max: "" });
                  setSelectedCategory("");
                }}
                  className="hihi"
                />
              </div>
              <div className="huhu">
                <label htmlFor="showsale" className="hihi">Sản phẩm sale</label>
                <input type="checkbox" id="showsale" checked={showSale} onChange={(e) => setShowSale(e.target.checked)} className="hehe" />
              </div>
              <div className="huhu">
                <label htmlFor="showhot" className="hihi">Sản phẩm hot</label>
                <input type="checkbox" id="showhot" checked={showHot} onChange={(e) => setShowHot(e.target.checked)} className="hihi" />
              </div>
              <div className="hi-1">
                <label htmlFor="showbestselling" className="hihi"> Sản phẩm bán chạy</label>
                <input type="checkbox" id="showbestselling" checked={showBestselling} onChange={(e) => setShowBestselling(e.target.checked)} className="hihi" />
              </div>
            </div>
            <div className="card-2 mb-3">
              <div class="card-header">
                <h5 className="mb-0">Khoảng giá</h5>
              </div>
              <div className="card-body">
                <div className="input-group">
                  <div className="no-name">
                    <button
                      onClick={() => setPriceRange({ min: 20000, max: 50000 })}
                      className="btn btn-outline-success me-2"
                    >
                      20,000 - 50,000
                    </button>
                    <button
                      onClick={() => setPriceRange({ min: 50000, max: 100000 })}
                      className="btn btn-outline-success me-2"
                    >
                      50,000 - 100,000
                    </button>
                    <button
                      onClick={() => setPriceRange({ min: 100000, max: 400000 })}
                      className="btn btn-outline-success me-2"
                    >
                      100,000 - 400,000
                    </button>
                    <button
                      onClick={() => setPriceRange({ min: 500000, max: 2000000 })}
                      className="btn btn-outline-success me-2"
                    >
                      500,000 - 2,000,000
                    </button>
                    <button
                      onClick={() => setPriceRange({ min: "", max: "" })}
                      className="btn btn-outline-success me-2"
                    >
                      Xóa khoảng giá
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-9">
            <div className="row">
              {HAHAHA.length === 0 ? (
                <p> sản phẩm chưa đáp ứng đủ các yếu tố trên .</p>
              ) : (
                <ProductCard data={HAHAHA}  />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}