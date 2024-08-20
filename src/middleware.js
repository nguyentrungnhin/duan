import { NextResponse } from 'next/server';

export async function middleware(request) {
    const token = request.cookies.get('token');

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        // Gọi đến API xác thực token
        const res = await fetch('http://localhost:3000/users/checktoken', {
            headers: {
                Authorization: `Bearer ${token.value}`,
            },
        });

        // Kiểm tra phản hồi của API
        if (!res.ok) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        // Kiểm tra vai trò của người dùng
        const { role } = await res.json();

        if (role === 0) {
            // Nếu là admin, cho phép truy cập trang admin
            return NextResponse.next();
        } else if (role === 1) {
            // Nếu là người dùng thông thường, chuyển hướng đến trang chính
            return NextResponse.redirect(new URL('/', request.url));
        } else {
            // Nếu vai trò không hợp lệ hoặc không xác định, chuyển hướng đến trang không được phép
            return NextResponse.redirect(new URL('/unauthorized', request.url));
        }
    } catch (error) {
        // Xử lý lỗi khi gọi API
        console.error('Error in middleware:', error);
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: ['/info/:path*', '/admin/:path*'], // Bảo vệ tất cả các route cho admin và thông tin
};


