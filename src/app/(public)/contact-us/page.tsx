// app/contact/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { MailIcon, PhoneIcon, MapPinIcon, CheckCircle, Send } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Giả lập gửi form - trong thực tế sẽ gọi API
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-600 to-slate-700 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">Liên Hệ Với Chúng Tôi</h1>
          <p className="mx-auto max-w-2xl text-xl text-blue-100">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn về mọi vấn đề liên quan đến nền tảng quản lý đồ án tốt
            nghiệp của chúng tôi.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="h-full rounded-lg bg-white p-8 shadow-sm">
                <h2 className="mb-6 text-2xl font-bold text-slate-700">Thông Tin Liên Hệ</h2>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="mr-4 rounded-full bg-blue-100 p-3 text-slate-700">
                      <MailIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <Link href="mailto:info@gradproject.vn" className="text-slate-600 hover:underline">
                        info@gradproject.vn
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 rounded-full bg-blue-100 p-3 text-slate-700">
                      <PhoneIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Điện Thoại</h3>
                      <Link href="tel:+84912345678" className="text-slate-600 hover:underline">
                        +84 912 345 678
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 rounded-full bg-blue-100 p-3 text-slate-700">
                      <MapPinIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Địa Chỉ</h3>
                      <p className="text-gray-600">
                        Tòa nhà Innovation, 123 Nguyễn Văn Linh
                        <br />
                        Quận 7, TP. Hồ Chí Minh
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="mb-3 font-semibold text-gray-900">Giờ Làm Việc</h3>
                  <p className="text-gray-600">
                    Thứ 2 - Thứ 6: 8:00 - 17:30
                    <br />
                    Thứ 7: 8:00 - 12:00
                    <br />
                    Chủ nhật: Nghỉ
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardContent className="p-8">
                  {submitted ? (
                    <div className="py-12 text-center">
                      <div className="mb-4 flex justify-center">
                        <CheckCircle className="h-16 w-16 text-green-500" />
                      </div>
                      <h2 className="mb-2 text-2xl font-bold">Gửi thành công!</h2>
                      <p className="mb-8 text-gray-600">
                        Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong thời gian sớm nhất.
                      </p>
                      <Button onClick={() => setSubmitted(false)}>Gửi tin nhắn khác</Button>
                    </div>
                  ) : (
                    <>
                      <h2 className="mb-6 text-2xl font-bold text-slate-700">Gửi Tin Nhắn</h2>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                          <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">
                              Họ và tên
                            </label>
                            <Input
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              placeholder="Nhập họ và tên của bạn"
                            />
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">
                              Email
                            </label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              placeholder="example@domain.com"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="subject" className="text-sm font-medium">
                            Tiêu đề
                          </label>
                          <Input
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            placeholder="Tiêu đề tin nhắn của bạn"
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="message" className="text-sm font-medium">
                            Nội dung
                          </label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            placeholder="Nhập nội dung tin nhắn của bạn"
                            rows={5}
                          />
                        </div>

                        <Button type="submit" size="lg" className="w-full md:w-auto">
                          <Send className="mr-2 h-4 w-4" /> Gửi Tin Nhắn
                        </Button>
                      </form>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold">Câu Hỏi Thường Gặp</h2>
            <p className="text-lg text-gray-600">
              Dưới đây là những câu hỏi mà chúng tôi thường xuyên nhận được. Nếu bạn không tìm thấy câu trả lời, hãy
              liên hệ với chúng tôi.
            </p>
          </div>

          <div className="mx-auto max-w-3xl">
            <div className="space-y-6">
              {[
                {
                  question: 'Hệ thống có hỗ trợ tích hợp với phần mềm quản lý đào tạo hiện có của trường không?',
                  answer:
                    'Có, nền tảng của chúng tôi được thiết kế để tích hợp linh hoạt với các hệ thống quản lý đào tạo hiện có thông qua API và các giải pháp đồng bộ dữ liệu.',
                },
                {
                  question: 'Làm thế nào để giảng viên theo dõi tiến độ của sinh viên?',
                  answer:
                    'Giảng viên có thể theo dõi tiến độ của sinh viên thông qua bảng điều khiển trực quan, nhận thông báo về các mốc quan trọng và tạo báo cáo tùy chỉnh về tiến độ của từng sinh viên hoặc nhóm sinh viên.',
                },
                {
                  question: 'Hệ thống có hỗ trợ quản lý phiên bản cho tài liệu đồ án không?',
                  answer:
                    'Có, hệ thống của chúng tôi cung cấp tính năng quản lý phiên bản toàn diện, cho phép sinh viên và giảng viên theo dõi lịch sử thay đổi, so sánh các phiên bản và khôi phục phiên bản trước đó khi cần thiết.',
                },
                {
                  question: 'Nền tảng có cung cấp tính năng kiểm tra đạo văn không?',
                  answer:
                    'Có, chúng tôi tích hợp công cụ kiểm tra đạo văn để đảm bảo tính nguyên bản của đồ án và hỗ trợ sinh viên tuân thủ các tiêu chuẩn học thuật.',
                },
              ].map((faq, index) => (
                <div key={index} className="rounded-lg bg-gray-50 p-6">
                  <h3 className="mb-2 text-lg font-semibold">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-700 py-12 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-2xl font-bold">Bắt đầu quản lý đồ án hiệu quả ngay hôm nay</h2>
          <p className="mx-auto mb-6 max-w-2xl text-lg text-blue-100">
            Đăng ký dùng thử miễn phí 30 ngày và khám phá sự khác biệt mà nền tảng của chúng tôi mang lại.
          </p>
          <Button asChild size="lg" className="bg-white text-slate-700 hover:bg-blue-50">
            <Link href="/signup">Đăng ký dùng thử</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
