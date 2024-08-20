"use client";
import React from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerSuccess, registerFailure } from '../../../../redux/slices/userSlices'; // Adjust the import path as necessary
import "../../../../public/css/register.css";
import { useRouter } from 'next/navigation';

const Register = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Schema xác thực với Yup
  const validationSchema = Yup.object({
    username: Yup.string()
      .required('Tên người dùng là bắt buộc'),
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
    phone: Yup.string()
      .required("Số điện thoại bắt buộc")
      .matches(/(\+84|0[3|5|7|8|9])+([0-9]{8,})\b/g, 'Số điện thoại không hợp lệ'),
    address: Yup.string()
      .required('Địa chỉ là bắt buộc'),
  });

  // Sử dụng Formik để quản lý form
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      role: 1,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post('http://localhost:3000/users/register', values);
        dispatch(registerSuccess(response.data));
      } catch (err) {
        const errorMessage = err.response?.data?.message || 'Đã xảy ra lỗi. Vui lòng thử lại.';
        dispatch(registerFailure(errorMessage));
      } finally {
        setSubmitting(false);
        router.push('/login');
        alert('Đăng ký thành công');
      }
    },
  });

  return (
    <div className="container">
      <div className="register-all">
        <div className="register">
          <h2>Đăng Ký</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="name-user">
              <label htmlFor="username" className="Name-lable">Tên người dùng</label><br />
              <input
                type="text"
                className="register-1"
                id="username"
                placeholder="Nhập tên người dùng"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="error">{formik.errors.username}</div>
              ) : null}
            </div>
            <div className="name-user">
              <label htmlFor="email" className="Name-lable">Địa chỉ Email</label><br />
              <input
                type="email"
                className="register-1"
                id="email"
                placeholder="Nhập email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error">{formik.errors.email}</div>
              ) : null}
            </div>

            <div className="name-user">
              <label htmlFor="password" className="Name-lable">Mật khẩu</label><br />
              <input
                type="password"
                className="register-1"
                id="password"
                placeholder="Mật khẩu"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                minLength={6}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error">{formik.errors.password}</div>
              ) : null}
            </div>

            <div className="name-user">
              <label htmlFor="phone" className="Name-lable">Số điện thoại</label><br />
              <input
                type="text"
                className="register-1"
                id="phone"
                placeholder="Nhập số điện thoại"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="error">{formik.errors.phone}</div>
              ) : null}
            </div>

            <div className="name-user">
              <label htmlFor="address" className="Name-lable">Địa chỉ</label><br />
              <input
                type="text"
                className="register-1"
                id="address"
                placeholder="Nhập địa chỉ"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.address && formik.errors.address ? (
                <div className="error">{formik.errors.address}</div>
              ) : null}
            </div>

            <button type="submit" className="register-2" disabled={formik.isSubmitting}>
              Đăng Ký
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;




// 'use client';
// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';

// // Trang đăng ký
// export default function Register() {
//   const formik = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//       rePassword: '',
//     },
//     validationSchema: Yup.object({
//       email: Yup.string().email('Email không hợp lệ').required('vui lòng nhập email'),
//       password: Yup.string()
//         .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, 'Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ và số')
//         .required('Vui lòng nhập mật khẩu'),
//       rePassword: Yup.string()
//         .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
//         .required('Vui lòng nhập lại password'),
//     }),
//     onSubmit: async (values, { setSubmitting, setFieldError }) => {
//       try {
//         const res = await fetch('http://localhost:3000/users/register', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ email: values.email, password: values.password }),
//         });
//         if (!res.ok) {
//           const errorData = await res.json();
//           if (res.status === 400 && errorData.message === "Email đã tồn tại") {
//             setFieldError('email', 'Email đã tồn tại');
//           } else {
//             throw new Error(errorData.message || 'Đăng ký thất bại');
//           }
//         }
//         // Xử lý thành công
//         alert('Đăng ký thành công');
//       } catch (error) {
//         setFieldError('general', error.message);
//       } finally {
//         setSubmitting(false);
//       }
//     },
//   });
//   return (
//     <div className="container mt-3">
//       <h2>Đăng ký tài khoản</h2>
//       <form onSubmit={formik.handleSubmit}>
//         <div className="form-group">
//           <label>Email</label>
//           <input
//             type="email"
//             className="form-control"
//             {...formik.getFieldProps('email')}
//           />
//           {formik.touched.email && formik.errors.email ? (
//             <div className="text-danger">{formik.errors.email}</div>
//           ) : null}
//         </div>
//         <div className="form-group">
//           <label>Mật khẩu</label>
//           <input
//             type="password"
//             className="form-control"
//             {...formik.getFieldProps('password')}
//           />
//           {formik.touched.password && formik.errors.password ? (
//             <div className="text-danger">{formik.errors.password}</div>
//           ) : null}
//         </div>
//         <div className="form-group">
//           <label>Nhập lại mật khẩu</label>
//           <input
//             type="password"
//             className="form-control"
//             {...formik.getFieldProps('rePassword')}
//           />
//           {formik.touched.rePassword && formik.errors.rePassword ? (
//             <div className="text-danger">{formik.errors.rePassword}</div>
//           ) : null}
//         </div>
//         <button type="submit" className="btn btn-primary my-3" disabled={formik.isSubmitting}>
//           Đăng ký
//         </button>
//         {formik.errors.general && (
//           <p className="my-3 text-danger">{formik.errors.general}</p>
//         )}
//       </form>
//     </div>
//   );
// }