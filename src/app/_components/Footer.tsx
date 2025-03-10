import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Thông tin liên hệ */}
          <div className="md:col-span-1">
            <h4 className="mb-4 text-lg font-semibold text-white">Liên hệ</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mt-0.5 mr-2 h-5 w-5 text-indigo-400" />
                <span>Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-indigo-400" />
                <span>(+84) 123 456 789</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-indigo-400" />
                <span>contact@thesismanager.vn</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Phần copyright và người tạo */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-slate-700 pt-8 md:flex-row">
          <p className="text-base text-slate-400">
            © {currentYear} ThesisManager. Bản quyền thuộc về công ty Do Duc Long.
          </p>
          <div className="mt-4 text-base text-slate-400 md:mt-0">
            <p>
              Thiết kế & Phát triển bởi <span className="font-medium text-indigo-400">ddlong07</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
