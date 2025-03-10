'use client';

import { Button } from '@/components/ui/button';
import { NAVBAR_CONTENT } from '@/utils/constants/navbar-content.const';
import Image from 'next/image';
import Link from 'next/link';

function Header() {
  return (
    <div>
      <div className="flex items-center justify-between p-5 shadow-sm">
        <Image src="/logo.svg" alt="logo" width={100} height={100} className="w-[150px] md:w-[200px]" />
        <ul className="hidden gap-14 text-lg font-medium md:flex">
          {NAVBAR_CONTENT.map((item, index) => (
            <Link key={index} href={item.href}>
              <li className="cursor-pointer transition-all duration-300 hover:text-blue-500">{item.label}</li>
            </Link>
          ))}
        </ul>
        <div className="flex gap-5">
          <Button variant="ghost">Login</Button>
          <Button>Register</Button>
        </div>
      </div>
    </div>
  );
}
export default Header;
