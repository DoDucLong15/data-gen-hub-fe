// app/about/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GraduationCap, Clock, BarChart, Layers, ChevronRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="from-primary bg-gradient-to-r to-transparent py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
            <div className="space-y-6 md:w-1/2">
              <h1 className="text-4xl font-bold md:text-5xl">Về Chúng Tôi</h1>
              <p className="text-xl text-blue-100 md:text-2xl">
                Chúng tôi đam mê giúp sinh viên và giảng viên quản lý đồ án tốt nghiệp một cách hiệu quả
              </p>
              <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                <Link href="/contact">
                  Liên hệ ngay <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="flex justify-center md:w-1/2">
              <div className="relative aspect-video w-full max-w-md rounded-lg bg-white/10 p-1">
                <div className="absolute inset-0 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm">
                  <div className="flex h-full items-center justify-center">
                    <GraduationCap className="h-24 w-24 text-white/80" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold">Sứ Mệnh Của Chúng Tôi</h2>
            <p className="text-lg text-gray-600">
              Chúng tôi ra đời với sứ mệnh đơn giản hóa quy trình quản lý đồ án tốt nghiệp, giúp sinh viên tập trung vào
              nghiên cứu thay vì lo lắng về quy trình thủ công phức tạp, đồng thời hỗ trợ giảng viên theo dõi và đánh
              giá hiệu quả.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-gray-50 p-8">
              <div className="mb-4 inline-flex rounded-full bg-blue-100 p-3 text-blue-700">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Tiết Kiệm Thời Gian</h3>
              <p className="text-gray-600">
                Tự động hóa các quy trình thủ công, giảm thời gian xử lý và quản lý tài liệu.
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-8">
              <div className="mb-4 inline-flex rounded-full bg-blue-100 p-3 text-blue-700">
                <BarChart className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Hiệu Quả Cao</h3>
              <p className="text-gray-600">
                Tổng hợp và phân tích dữ liệu một cách toàn diện, giúp ra quyết định tốt hơn.
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-8">
              <div className="mb-4 inline-flex rounded-full bg-blue-100 p-3 text-blue-700">
                <Layers className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Tích Hợp Toàn Diện</h3>
              <p className="text-gray-600">
                Một nền tảng duy nhất cho mọi nhu cầu quản lý đồ án từ lưu trữ đến đánh giá.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold">Đội Ngũ Chúng Tôi</h2>
            <p className="text-lg text-gray-600">
              Chúng tôi là những chuyên gia trong lĩnh vực công nghệ và giáo dục, luôn đặt trải nghiệm người dùng và
              hiệu quả làm trọng tâm phát triển.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: 'Nguyễn Văn A',
                role: 'Giám đốc điều hành',
                image: '/api/placeholder/300/300',
              },
              {
                name: 'Trần Thị B',
                role: 'Giám đốc công nghệ',
                image: '/api/placeholder/300/300',
              },
              {
                name: 'Lê Văn C',
                role: 'Trưởng phòng phát triển',
                image: '/api/placeholder/300/300',
              },
            ].map((member, index) => (
              <div key={index} className="rounded-lg bg-white p-6 text-center shadow-sm">
                <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full">
                  <Image src={member.image} alt={member.name} width={128} height={128} className="object-cover" />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-slate-800">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-700 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold">Sẵn sàng tối ưu hóa quy trình đồ án?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-blue-100">
            Hãy để chúng tôi giúp bạn quản lý đồ án tốt nghiệp hiệu quả hơn, tiết kiệm thời gian và công sức.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-white text-slate-700 hover:bg-blue-50">
              <Link href="/contact">Liên hệ ngay</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-slate-700 hover:bg-blue-50">
              <Link href="/features">Tìm hiểu thêm</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
