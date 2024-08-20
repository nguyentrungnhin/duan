'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import "../../../../../../public/css/addProduct.css";

export default function EditProduct({ params }) {
    const router = useRouter();
    const id = params.id;
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await fetch('http://localhost:3000/categories');
                const data = await res.json();
                setCategories(data);
            } catch (error) {
                console.error('Không tìm thấy danh mục:', error);
            }
        };

        const getProduct = async () => {
            try {
                const res = await fetch(`http://localhost:3000/categories/id/${id}`);
                const data = await res.json();
                setProduct(data);
                setValue('tenLoai', data.tenLoai);
                setValue('description', data.description);
            } catch (error) {
                console.error('Không tìm thấy sản phẩm:', error);
            }
        };

        if (id) {
            getProduct();
        }

        getCategories();
    }, [id, setValue]);

    const onSubmit = async (data) => {
        try {
            const res = await fetch(`http://localhost:3000/categories/updatecategory/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await res.json();
            if (!result.error) {
                router.push('/admin/Category');
            } else {
                console.error(result.error);
            }
        } catch (error) {
            console.error('Failed to update category:', error);
        }
    };

    return (
        <div className="container-2">
            <div className="addproduct-all">
                <h2>Chỉnh sửa danh mục</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="addproduct">
                        <div className="addproduct-1 shadow-sm">
                            <div className="form-group my-2">
                                <label className='form-label'>Tên danh mục</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    {...register('tenLoai', { required: 'Tên danh mục là bắt buộc' })}
                                />
                                {errors.tenLoai && <div className="text-danger">{errors.tenLoai.message}</div>}
                            </div>
                            <div className="form-group my-2">
                                <label className='form-label'>Mô tả</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    {...register('description', { required: 'Mô tả là bắt buộc' })}
                                />
                                {errors.description && <div className="text-danger">{errors.description.message}</div>}
                            </div>
                        </div>
                    </div>
                    <div className="container-product-admin-title">
                        <button type="submit" className="add-them">Cập nhật danh mục</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
