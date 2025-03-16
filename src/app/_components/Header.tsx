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
import { User, Users, Shield, LogOut, Sun, Moon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname(); // Lấy route hiện tại
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <div className="flex items-center justify-between px-6 shadow-md">
        <Image src="/logo.svg" alt="logo" width={60} height={60} className="w-[150px] md:w-[200px]" />
        <ul className="hidden gap-14 text-lg font-medium md:flex">
          {NAVBAR_CONTENT.map((item, index) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/');
            return (
              <Link
                key={index}
                href={item.href}
                className={`flex h-full items-center transition-all duration-300 ${
                  isActive ? 'bg-slate-200 hover:bg-slate-300' : 'hover:bg-slate-100'
                }`}
              >
                <li className="px-4 py-2">{item.label}</li>
              </Link>
            );
          })}
        </ul>
        <div className="flex gap-5">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-full"
          >
            <Sun className="h-5 w-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-5 w-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">Toggle theme</span>
          </Button>
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
                <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/my-account')}>
                  <User className="h-5 w-5" />
                  <span>My Account</span>
                </DropdownMenuItem>
                {user?.role === UserRole.ADMIN && (
                  <>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/admin/users-manage')}>
                      <Users className="h-5 w-5" />
                      <span>Manage User</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/admin/roles-manage')}>
                      <Shield className="h-5 w-5" />
                      <span>Manage Role</span>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
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
