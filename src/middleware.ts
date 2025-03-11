import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get('accessToken')?.value;
  const refreshToken = req.cookies.get('refreshToken')?.value;

  // Các route cần xác thực
  const protectedRoutes = ['/dashboard', '/admin'];

  // Các route cho người dùng chưa đăng nhập
  const authRoutes = ['/account/login'];

  // Kiểm tra nếu đang truy cập vào protected route mà chưa đăng nhập
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  if (isProtectedRoute && !accessToken && !refreshToken) {
    // Chuyển hướng đến trang đăng nhập và lưu URL để redirect sau khi đăng nhập
    const url = new URL('/account/login', req.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  // Nếu đã đăng nhập mà truy cập trang đăng nhập, đăng ký
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

// Các paths cần áp dụng middleware
export const config = {
  matcher: [
    // Các routes cần bảo vệ
    '/dashboard/:path*',
    '/admin/:path*',
    // Auth routes
    '/account/login',
  ],
};
