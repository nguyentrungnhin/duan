"use client";
import React from "react";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
export default function Category() {
    const { data, error } = useSWR("http://localhost:3000/categories", fetcher, { revalidateOnFocus: false });
    if (error) return <p>Error: {error.message}</p>;
    if (!data) return <p>Loading...</p>;
    return (
        <ul className="loai-all dropdown-menu">
            {data.map(category => (
                <li className="loại">
                    <Link className="nav-link" key={category._id} href={`/Danhmuc/${category._id}`}>
                        {category.tenLoai}
                    </Link>
                </li>
            ))}
        </ul>
    )
}