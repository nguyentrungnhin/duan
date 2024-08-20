'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "../../../../../public/css/addProduct.css";

export default function AddCategory() {
    const router = useRouter();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await fetch('http://localhost:3000/categories');
                // if (!res.ok) throw new Error('Failed to fetch categories');
                const data = await res.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        getCategories();
    }, []);

    const validationSchema = Yup.object({
        tenLoai: Yup.string()
            .trim()
            .required('Tên sản phẩm là bắt buộc')
            .matches(
                /^[A-ZÀ-Ỵ][a-zA-ZÀ-ỹ\s]*$/,
                "Chữ cái đầu tiên của tên sản phẩm phải là chữ in hoa"
            ),
        description: Yup.string()
            .trim()
            .required('Mô tả sản phẩm là bắt buộc')
            .min(3, 'Mô tả sản phẩm phải có ít nhất 3 ký tự')
            .max(50, 'Mô tả sản phẩm không được vượt quá 50 ký tự')
            .matches(
                /^[A-ZÀ-Ỵ][a-zA-ZÀ-ỹ\s]*$/,
                "Chữ cái đầu tiên của mô tả sản phẩm phải là chữ in hoa"
            ),
    });

    const formik = useFormik({
        initialValues: {
            tenLoai: "",
            description: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const res = await fetch('http://localhost:3000/categories/addcategory', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                const result = await res.json();
                if (result.error) {
                    formik.setFieldError('general', result.error);
                } else {
                    router.push('/admin/Category');
                }
            } catch (error) {
                formik.setFieldError('general', 'An error occurred. Please try again.');
            }
        },
    });

    return (
        <div className="container-2">
            <div className="addproduct-all">
                <h2>Thêm Danh Mục</h2>
                <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                    <div className="addproduct">
                        <div className="addproduct-1 shadow-sm">
                            <div className="form-group my-2">
                                <label className='form-label'>Tên danh mục</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="tenLoai"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.tenLoai}
                                />
                                {formik.touched.tenLoai && formik.errors.tenLoai ? (
                                    <div className="text-danger">{formik.errors.tenLoai}</div>
                                ) : null}
                            </div>
                            <div className="form-group my-2">
                                <label className='form-label'>Mô tả</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="description"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.description}
                                />
                                {formik.touched.description && formik.errors.description ? (
                                    <div className="text-danger">{formik.errors.description}</div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                    <div className="container-product-admin-title">
                        <button type="submit" className="add-them">Thêm danh mục</button>
                        {formik.errors.general && (
                            <div className="text-danger">{formik.errors.general}</div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
