'use client';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../../../redux/slices/userSlices';
import { useRouter } from 'next/navigation';
import "../../../../public/css/login.css";

export default function Login() {
    const dispatch = useDispatch();
    const router = useRouter(); // Initialize useRouter

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Email không hợp lệ")
                .required("Email là bắt buộc")
                .matches(
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    "Email phải chứa ký tự hợp lệ"
                ),
            password: Yup.string()
                .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
                .required("Mật khẩu là bắt buộc")
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{6,}$/,
                    "Mật khẩu phải chứa ít nhất một chữ hoa, chữ thường, số và ký tự đặc biệt"
                ),
        }),
        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            try {
                const res = await fetch('http://localhost:3000/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: values.email, password: values.password }),
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message || 'Đăng nhập thất bại');
                }

                const { token } = await res.json();

                // Lưu token vào cookie với đường dẫn được đặt thành root
                Cookies.set('token', token, { expires: 1, path: '/' });

                // Giải mã token để lấy payload
                const payload = JSON.parse(atob(token.split('.')[1]));

                // Điều phối hành động để cập nhật trạng thái Redux
                dispatch(loginSuccess(payload));

                // Chuyển hướng dựa trên vai trò
                if (payload.role === 0) {
                    router.push('/admin'); // Redirect to admin page
                } else {
                    router.push('/'); // Redirect to home page
                }
            } catch (error) {
                setFieldError('general', error.message);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="container">
            <div className="login-all">
                <div className="login">
                    <h2>Đăng nhập</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <input
                            className="login-1"
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="error">{formik.errors.email}</div>
                        ) : null}

                        <input
                            className="login-1"
                            type="password"
                            placeholder="Mật khẩu"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="error">{formik.errors.password}</div>
                        ) : null}

                        {formik.errors.general ? (
                            <div className="error">{formik.errors.general}</div>
                        ) : null}

                        <button
                            className="login-2"
                            type="submit"
                            disabled={formik.isSubmitting}
                        >
                            Đăng nhập
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}




// 'use client';
// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import Cookies from 'js-cookie';
// import { useDispatch } from 'react-redux';
// import { useRouter } from 'next/navigation';
// import { loginSuccess } from '../../../../redux/slices/userSlices';

// export default function Login() {
//     const dispatch = useDispatch();
//     const router = useRouter();

//     const formik = useFormik({
//         initialValues: {
//             email: '',
//             password: '',
//         },
//         validationSchema: Yup.object({
//             email: Yup.string().email('Email không hợp lệ').required('Bắt buộc'),
//             password: Yup.string().required('Bắt buộc'),
//         }),
//         onSubmit: async (values, { setSubmitting, setFieldError }) => {
//             try {
//                 const res = await fetch('http://localhost:3000/users/login', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({ email: values.email, password: values.password }),
//                 });

//                 if (!res.ok) {
//                     const errorData = await res.json();
//                     throw new Error(errorData.message || 'Đăng nhập thất bại');
//                 }

//                 const data = await res.json();
//                 console.log(data);
//                 localStorage.setItem('token', data.token);
//                 // Save the token in cookies and localStorage
//                 Cookies.set('token', data.token, { expires: 1, path: '/' });


//                 // Decode the token to get the payload
//                 const payload = JSON.parse(atob(data.token.split('.')[1]));

//                 // Dispatch login success action with payload
//                 dispatch(loginSuccess(payload));

//                 // Redirect based on role
//                 if (payload.role === 0) {
//                     router.push('http://localhost:3001');
//                 } else {
//                     router.push('/');
//                 }
//             } catch (error) {
//                 setFieldError('general', error.message);
//             } finally {
//                 setSubmitting(false);
//             }
//         },
//     });

//     return (
//         <div className="container mt-3">
//             <h2>Đăng nhập</h2>
//             <form onSubmit={formik.handleSubmit}>
//                 <div className="form-group">
//                     <label>Email</label>
//                     <input
//                         type="email"
//                         name="email"
//                         className="form-control"
//                         {...formik.getFieldProps('email')}
//                     />
//                     {formik.touched.email && formik.errors.email ? (
//                         <div className="text-danger">{formik.errors.email}</div>
//                     ) : null}
//                 </div>
//                 <div className="form-group">
//                     <label>Mật khẩu</label>
//                     <input
//                         type="password"
//                         name="password"
//                         className="form-control"
//                         {...formik.getFieldProps('password')}
//                     />
//                     {formik.touched.password && formik.errors.password ? (
//                         <div className="text-danger">{formik.errors.password}</div>
//                     ) : null}
//                 </div>
//                 <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
//                     Đăng nhập
//                 </button>
//                 {formik.errors.general && (
//                     <div className="text-danger mt-2">{formik.errors.general}</div>
//                 )}
//             </form>
//         </div>
//     );
// }

