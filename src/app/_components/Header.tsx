'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth.context';
import { NAVBAR_CONTENT } from '@/utils/constants/navbar-content.const';
import Image from 'next/image';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserRole } from '@/configs/role.config';
import { useRouter } from 'next/navigation';

function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  return (
    <div>
      <div className="flex items-center justify-between p-5 shadow-sm">
        <Image src="/logo.svg" alt="logo" width={60} height={60} className="w-[150px] md:w-[200px]" />
        <ul className="hidden gap-14 text-lg font-medium md:flex">
          {NAVBAR_CONTENT.map((item, index) => (
            <Link key={index} href={item.href}>
              <li className="cursor-pointer transition-all duration-300 hover:text-blue-500">{item.label}</li>
            </Link>
          ))}
        </ul>
        <div className="flex gap-5">
          {!user ? (
            <Button>
              <Link href={'/account/login'} className="cursor-pointer">
                Login
              </Link>
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex cursor-pointer items-center gap-2">
                <Image src="/user.png" alt="avatar" width={30} height={30} />
                {user?.name}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="cursor-pointer">Account</DropdownMenuItem>
                {user?.role === UserRole.ADMIN && (
                  <>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/admin/users')}>
                      Manage User
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">Manage Role</DropdownMenuItem>
                  </>
                )}
                <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </div>
  );
}
export default Header;
