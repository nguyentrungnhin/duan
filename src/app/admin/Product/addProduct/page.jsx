'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import *as Yup from 'yup';
import "../../../../../public/css/addProduct.css";

export default function AddProduct() {
    const router = useRouter();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            const res = await fetch('http://localhost:3000/categories');
            const data = await res.json();
            setCategories(data);
        };
        getCategories();
    }, []);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const validationSchema = Yup.object({
        name: Yup.string()
            .trim()
            .required('Tên sản phẩm là bắt buộc')
            .min(3, 'Tên sản phẩm phải có ít nhất 3 ký tự')
            .max(50, 'Tên sản phẩm không được vượt quá 50 ký tự'),
        price: Yup.number()
            .required('Giá là bắt buộc')
            .positive('Giá phải lớn hơn 0'),
        description: Yup.string()
            .required('Mô tả là bắt buộc')
            .min(10, 'Mô tả phải có ít nhất 10 ký tự'),
        image: Yup.mixed()
            .required('Hình ảnh là bắt buộc'),
        category: Yup.string()
            .required('Danh mục là bắt buộc'),
        quantity: Yup.number()
            .required('Số lượng là bắt buộc')
            .positive('Số lượng phải lớn hơn 0'),
        date: Yup.date()
            .required('Ngày là bắt buộc')
            .min(today, 'Ngày phải từ hôm nay trở đi')
            .typeError('Giá trị phải là ngày hợp lệ'),
        priceSale: Yup.number()
            .required('Giá khuyến mãi là bắt buộc')
            .positive('Giá khuyến mãi phải lớn hơn 0')
            .when('price', (price, schema) => {
                return schema.max(price, 'Giá khuyến mãi phải nhỏ hơn hoặc bằng giá tiền gốc');
            }),
        inventory: Yup.number()
            .required('Tồn kho là bắt buộc')
            .positive('Tồn kho phải lớn hơn 0')
            .when('quantity', (quantity, schema) => {
                return schema.max(quantity, 'Tồn kho phải bằng hoặc nhỏ hơn số lượng sản phẩm');
            }),
        sale: Yup.number()
            .required('Giảm giá là bắt buộc').min(0, 'Giảm giá phải từ 0 đến 100').max(100, 'Giảm giá phải từ 0 đến 100')
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            price: "",
            description: "",
            image: null,
            category: "",
            quantity: "",
            date: "",
            priceSale: "",
            inventory: "",
            sale: ""
        },
        validationSchema,
        onSubmit: async (values) => {
            const data = new FormData();
            data.append('name', values.name);
            data.append('price', values.price);
            data.append('description', values.description);
            data.append('categoryId', values.category);
            data.append('image', values.image);
            data.append('quantity', values.quantity);
            data.append('date', values.date);
            data.append('priceSale', values.priceSale);
            data.append('inventory', values.inventory);
            data.append('sale', values.sale);

            const res = await fetch('http://localhost:3000/products/addproduct', {
                method: 'POST',
                body: data,
            });

            const result = await res.json();
            if (result.error) {
                formik.setFieldError('general', result.error);
            } else {
                router.push('/admin/Product');
            }
        },
    });

    return (
        <div className="container-2">
            <div className="addproduct-all">
                <h2>Thêm sản phẩm</h2>
                <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                    <div className="addproduct">
                        <div className="addproduct-1 shadow-sm">
                            <div className="form-group my-2">
                                <label className='form-label'>Tên sản phẩm</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                />
                                {formik.touched.name && formik.errors.name ? (
                                    <div className="text-danger">{formik.errors.name}</div>
                                ) : null}
                            </div>
                            <div className="form-group my-2">
                                <label className='form-label'>Giá</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="price"
                                    min="1"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.price}
                                />
                                {formik.touched.price && formik.errors.price ? (
                                    <div className="text-danger">{formik.errors.price}</div>
                                ) : null}
                            </div>
                            <div className="form-group my-2">
                                <label className='form-label'>Mô tả</label>
                                <textarea
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
                            <div className="form-group my-2">
                                <label className='form-label'>Hình ảnh</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="image"
                                    onChange={(event) => {
                                        formik.setFieldValue("image", event.currentTarget.files[0]);
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.image && formik.errors.image ? (
                                    <div className="text-danger">{formik.errors.image}</div>
                                ) : null}
                            </div>
                            <div className="form-group my-2">
                                <label className='form-label'>Danh mục</label>
                                <select
                                    className='form-control'
                                    name="category"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.category}
                                >
                                    <option value="" label="Chọn danh mục" />
                                    {categories.map((category) => (
                                        <option key={category._id} value={category._id}>
                                            {category.tenLoai}
                                        </option>
                                    ))}
                                </select>
                                {formik.touched.category && formik.errors.category ? (
                                    <div className="text-danger">{formik.errors.category}</div>
                                ) : null}
                            </div>
                        </div>
                        <div className="addproduct-2 shadow-sm">
                            <div className="form-group my-2">
                                <label className='form-label'>Số lượng</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="quantity"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.quantity}
                                />
                                {formik.touched.quantity && formik.errors.quantity ? (
                                    <div className="text-danger">{formik.errors.quantity}</div>
                                ) : null}
                            </div>
                            <div className="form-group my-2">
                                <label className='form-label'>Ngày</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="date"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.date}
                                />
                                {formik.touched.date && formik.errors.date ? (
                                    <div className="text-danger">{formik.errors.date}</div>
                                ) : null}
                            </div>
                            <div className="form-group my-2">
                                <label className='form-label'>Giá khuyến mãi</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="priceSale"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.priceSale}
                                />
                                {formik.touched.priceSale && formik.errors.priceSale ? (
                                    <div className="text-danger">{formik.errors.priceSale}</div>
                                ) : null}
                            </div>
                            <div className="form-group my-2">
                                <label className='form-label'>Tồn kho</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="inventory"
                                    min="1"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.inventory}
                                />
                                {formik.touched.inventory && formik.errors.inventory ? (
                                    <div className="text-danger">{formik.errors.inventory}</div>
                                ) : null}
                            </div>
                            <div className="form-group my-2">
                                <label className='form-label'>Giảm giá (%)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="sale"
                                    min="0"
                                    max="100"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.sale}
                                />
                                {formik.touched.sale && formik.errors.sale ? (
                                    <div className="text-danger">{formik.errors.sale}</div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                    <div className="container-product-admin-title">
                        <button type="submit" className="add-them">Thêm sản phẩm</button>
                        {formik.errors.general && (
                            <div className="text-danger">{formik.errors.general}</div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}