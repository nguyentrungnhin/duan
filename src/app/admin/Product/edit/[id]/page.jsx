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
            const res = await fetch('http://localhost:3000/categories');
            const data = await res.json();
            setCategories(data);
        };

        getCategories();

        const getProduct = async () => {
            const res = await fetch(`http://localhost:3000/products/id/${id}`);
            const data = await res.json();
            setProduct(data);
            setValue('name', data.name);
            setValue('price', data.price);
            setValue('description', data.description);
            setValue('categoryId', data.categoryId);
            setValue('quantity', data.quantity);
            setValue('date', data.date);
            setValue('priceSale', data.priceSale);
            setValue('inventory', data.inventory);
            setValue('sale', data.sale);
        };

        if (id) {
            getProduct();
        }
    }, [id, setValue]);

    const onSubmit = async (data) => {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        if (data.image[0]) {
            formData.append('image', data.image[0]);
        }

        const res = await fetch(`http://localhost:3000/products/updateproduct/${id}`, {
            method: 'PUT',
            body: formData,
        });
        const result = await res.json();
        if (!result.error) {
            router.push('/admin/Product');
        } else {
            console.error(result.error);
        }
    };

    return (
        <div className="container-2">
            <div className="addproduct-all">
                <h2>Chỉnh sửa sản phẩm</h2>
                <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    <div className="addproduct">
                        <div className="addproduct-1 shadow-sm">
                            <div className="form-group my-2">
                                <label className='form-label'>Tên sản phẩm</label>
                                <input type="text" className="form-control" {...register('name', { required: 'Tên sản phẩm là bắt buộc' })} />
                                {errors.name && <div className="text-danger">{errors.name.message}</div>}
                            </div>
                            <div className="form-group my-2">
                                <label className='form-label'>Giá</label>
                                <input type="number" min="1" className="form-control" {...register('price', { required: 'Giá là bắt buộc', valueAsNumber: true })} />
                                {errors.price && <div className="text-danger">{errors.price.message}</div>}
                            </div>
                            <div className="form-group my-2">
                                <label className='form-label'>Mô tả</label>
                                <textarea className="form-control" {...register('description', { required: 'Mô tả là bắt buộc' })} />
                                {errors.description && <div className="text-danger">{errors.description.message}</div>}
                            </div>
                            <div className="form-group my-2 file-anh">
                                <label className='form-label'>Hình ảnh</label>
                                <br />
                                <img src={`http://localhost:3000/images/ảnh 2/${product?.image}`} />
                                <input type="file" className="form-control-anh" {...register('image')} />
                            </div>
                            <div className="form-group my-2">
                                <label className='form-label'>Danh mục</label>
                                <select className='form-control' {...register('categoryId', { required: 'Chọn một danh mục' })}>
                                    <option value="">Chọn danh mục</option>
                                    {categories.map((category) => (
                                        <option key={category._id} value={category._id}>
                                            {category.tenLoai}
                                        </option>
                                    ))}
                                </select>
                                {errors.categoryId && <div className="text-danger">{errors.categoryId.message}</div>}
                            </div>
                        </div>
                        <div className="addproduct-2 shadow-sm">
                            <div className="form-group my-2">
                                <label className='form-label'>Số lượng</label>
                                <input type="number" className="form-control" {...register('quantity', { valueAsNumber: true })} />
                            </div>
                            <div className="form-group my-2">
                                <label className='form-label'>Ngày nhập</label>
                                <input type="date" className="form-control" {...register('date')} />
                            </div>
                            <div className="form-group my-2">
                                <label className='form-label'>Giá khuyến mãi</label>
                                <input type="number" className="form-control" {...register('priceSale', { valueAsNumber: true })} />
                            </div>
                            <div className="form-group my-2">
                                <label className='form-label'>Tồn kho</label>
                                <input type="number" className="form-control" {...register('inventory', { valueAsNumber: true })} />
                            </div>
                            <div className="form-group my-2">
                                <label className='form-label'>Giảm giá (%)</label>
                                <input type="number" className="form-control" {...register('sale', { valueAsNumber: true })} />
                            </div>
                        </div>
                    </div>
                    <div className="container-product-admin-title">
                        <button type="submit" className="add-them">Cập nhật sản phẩm</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
