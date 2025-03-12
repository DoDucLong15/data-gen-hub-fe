import React from 'react';
import { ArrowRight, Database, FileText, Users } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

function Hero() {
  return (
    <div className="my-16 px-6 md:my-16">
      {/* Main Hero Section */}
      <div className="flex flex-col items-center justify-center text-center">
        <span className="text-primary mb-4 inline-block rounded-full bg-indigo-100 px-4 py-1 text-base font-medium">
          Hệ thống quản lý đồ án tốt nghiệp thông minh
        </span>
        <h1 className="mt-4 mb-6 text-4xl font-bold text-slate-800 md:text-5xl lg:text-6xl">
          Quản lý đồ án tốt nghiệp hiệu quả
        </h1>
        <p className="mb-8 max-w-3xl text-lg text-slate-600 md:text-xl">
          Nền tảng toàn diện giúp tổng hợp, sinh dữ liệu và quản lý đồ án tốt nghiệp, loại bỏ quy trình thủ công phức
          tạp và tối ưu hóa hiệu quả làm việc.
        </p>

        {/* CTA Buttons */}
        <div className="mb-12 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <Link href="/account/login">
            <Button className="transition-al flex cursor-pointer items-center justify-center rounded-lg px-6 py-3 text-base font-medium text-white md:px-8 md:py-4 md:text-lg">
              Bắt đầu ngay
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/demo">
            <Button className="flex cursor-pointer items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-base font-medium text-slate-700 transition-all hover:bg-slate-50 md:px-8 md:py-4 md:text-lg">
              Xem demo
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Overview */}
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 p-3">
            <Database className="text-primary h-6 w-6" />
          </div>
          <h3 className="mb-3 text-xl font-bold text-slate-800">Tổng hợp dữ liệu</h3>
          <p className="text-slate-600">
            Tự động tổng hợp và phân tích dữ liệu từ nhiều nguồn khác nhau, giúp quản lý thông tin đồ án hiệu quả.
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 p-3">
            <FileText className="text-primary h-6 w-6" />
          </div>
          <h3 className="mb-3 text-xl font-bold text-slate-800">Sinh dữ liệu thông minh</h3>
          <p className="text-slate-600">
            Công cụ sinh dữ liệu tự động cho báo cáo, thống kê và phân tích tiến độ đồ án.
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 p-3">
            <Users className="text-primary h-6 w-6" />
          </div>
          <h3 className="mb-3 text-xl font-bold text-slate-800">Hợp tác đa người dùng</h3>
          <p className="text-slate-600">
            Kết nối sinh viên, giảng viên và quản lý trên một nền tảng thống nhất, dễ dàng trao đổi và phối hợp.
          </p>
        </div>
      </div>

      {/* Trust Badge - Enhanced */}
      <div className="mt-20 rounded-2xl bg-gradient-to-r from-slate-200 to-slate-400 py-10">
        <h3 className="mb-8 text-center text-2xl font-bold text-slate-900">ĐƯỢC TIN DÙNG BỞI</h3>
        <div className="flex flex-wrap items-center justify-center gap-8 px-4">
          <div className="rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <Image src="/logo-dhqg.png" alt="Đại học Quốc gia TPHCM" width={180} height={180} />
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <Image src="/logo-hust.png" alt="Đại học Bách Khoa Hà Nội" width={80} height={80} />
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <Image src="/logo-fpt.png" alt="Đại học FPT" width={180} height={180} />
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <Image src="/logo-dhqghn.png" alt="Đại học Quốc gia Hà Nội" width={160} height={160} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
