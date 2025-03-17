'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, User, Phone, Building, BookOpen, Briefcase, ArrowLeft, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import axios from 'axios';

type UserRegistration = {
  email: string;
  name?: string;
  phone?: string;
  school?: string;
  department?: string;
  position?: string;
};

export default function Register() {
  const [formData, setFormData] = useState<UserRegistration>({
    email: '',
    name: '',
    phone: '',
    school: '',
    department: '',
    position: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate email (required field)
      if (!formData.email || !formData.email.includes('@')) {
        throw new Error('Email hợp lệ là bắt buộc');
      }

      // Call API to request admin to add the user
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, formData);

      if (response.status !== 201) {
        const errorData = response.data;
        throw new Error(errorData.message || 'Đăng ký không thành công');
      }

      // Registration request successful
      setSuccess(true);

      // Optional: Reset form
      setFormData({
        email: '',
        name: '',
        phone: '',
        school: '',
        department: '',
        position: '',
      });

      // Wait 3 seconds then redirect to login
      setTimeout(() => {
        router.push('/account/login');
      }, 3000);
    } catch (err: any) {
      setError(err?.response?.data?.message ?? err?.message ?? 'Đã xảy ra lỗi khi gửi yêu cầu đăng ký');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-slate-100 px-4 pt-8 md:pt-16">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center">
            <Link
              href="/account/login"
              className="text-primary mr-auto inline-flex items-center text-sm font-medium hover:underline"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Quay lại đăng nhập
            </Link>
          </div>
          <CardTitle className="mt-4 text-center text-2xl font-bold">Đăng ký tài khoản</CardTitle>
          <CardDescription className="text-center">
            Điền thông tin của bạn để gửi yêu cầu tới quản trị viên
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive" className="border-red-300 bg-red-50 text-red-800">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-300 bg-green-50 text-green-800">
              <AlertDescription>
                Yêu cầu đăng ký đã được gửi thành công! Quản trị viên sẽ xem xét và phê duyệt tài khoản của bạn. Bạn sẽ
                được chuyển hướng đến trang đăng nhập trong vài giây...
              </AlertDescription>
            </Alert>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email - Required */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Mail className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Họ và tên
              </Label>
              <div className="relative">
                <User className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Nguyễn Văn A"
                  className="pl-10"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Số điện thoại
              </Label>
              <div className="relative">
                <Phone className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="0912345678"
                  className="pl-10"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* School */}
            <div className="space-y-2">
              <Label htmlFor="school" className="text-sm font-medium">
                Trường học
              </Label>
              <div className="relative">
                <BookOpen className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                <Input
                  id="school"
                  name="school"
                  type="text"
                  placeholder="Đại học ABC"
                  className="pl-10"
                  value={formData.school}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Department */}
            <div className="space-y-2">
              <Label htmlFor="department" className="text-sm font-medium">
                Khoa/Phòng ban
              </Label>
              <div className="relative">
                <Building className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                <Input
                  id="department"
                  name="department"
                  type="text"
                  placeholder="Khoa Công nghệ thông tin"
                  className="pl-10"
                  value={formData.department}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Position */}
            <div className="space-y-2">
              <Label htmlFor="position" className="text-sm font-medium">
                Chức vụ
              </Label>
              <div className="relative">
                <Briefcase className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                <Input
                  id="position"
                  name="position"
                  type="text"
                  placeholder="Giảng viên/Sinh viên/..."
                  className="pl-10"
                  value={formData.position}
                  onChange={handleChange}
                />
              </div>
            </div>

            <Button type="submit" className="mt-6 w-full" disabled={loading}>
              {loading ? (
                <>
                  <svg
                    className="mr-2 h-4 w-4 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Đang xử lý...
                </>
              ) : (
                'Gửi yêu cầu đăng ký'
              )}
            </Button>
          </form>

          <p className="mt-4 text-center text-xs text-gray-500">
            Bằng việc đăng ký, bạn đồng ý với các điều khoản sử dụng và chính sách bảo mật của chúng tôi.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
