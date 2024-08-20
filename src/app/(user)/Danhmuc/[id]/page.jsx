"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductCard from "../../component/ProductCard";

export default function Detail({ params }) {
    const [data, setProduct] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/categories/${params.id}`,
                    { cache: "no-store" }
                );
                const result = await response.json();
                console.log("Fetched data:", result);
                setProduct(Array.isArray(result) ? result : []);
            } catch (error) {
                console.error("Error fetching data:", error);
                setProduct([]); // Set to an empty array on error
            }
        };
        fetchData();
    }, [params.id, params.children]);

    return (
        <>
            <div className="row d-flex justify-content-between mx-1 ">
                <div class="name-all">
                    <h3 class="name-tieude">Danh mục {params.children}</h3>
                </div>
            </div>
            <div className="row">
                <ProductCard data={data} />
            </div>
        </>
    );
}