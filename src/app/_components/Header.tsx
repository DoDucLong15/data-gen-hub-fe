'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth.context';
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
import { User, Users, Shield, LogOut, Sun, Moon, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { ESubject } from '@/utils/types/authorization.type';
import { EAction } from '@/utils/types/authorization.type';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import LanguageSwitcher from './LanguageSwitcher';
import { useI18n } from '@/i18n';
import { TNavbarContent } from '@/utils/types/nav-bar.type';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname(); // Lấy route hiện tại
  const { theme, setTheme } = useTheme();
  const { t, isReady } = useI18n();

  const NAVBAR_CONTENT: TNavbarContent[] = [
    { label: t('NAVBAR.HOME'), href: '/' },
    { label: t('NAVBAR.CLASSES'), href: '/classes' },
    { label: t('NAVBAR.ABOUT_US'), href: '/about-us' },
    { label: t('NAVBAR.CONTACT_US'), href: '/contact-us' },
  ];

  // Kiểm tra xem có đang ở trang chi tiết class không
  const isClassDetail = pathname.startsWith('/classes/') && pathname !== '/classes';

  if (!isReady) return null;

  return (
    <div className="border-b shadow-sm">
      <div className="flex h-12 items-center justify-between px-4">
        {/* Logo và Navigation */}
        <div className="flex h-full items-center">
          {isClassDetail ? (
            <div className="flex w-60 items-center justify-start border-r pr-4">
              <Image
                src="/logo.svg"
                alt="logo"
                width={60}
                height={60}
                className="h-10 cursor-pointer"
                onClick={() => router.push('/')}
              />
            </div>
          ) : (
            <div className="mr-6 ml-1 flex items-center">
              <Image
                src="/logo.svg"
                alt="logo"
                width={60}
                height={60}
                className="h-10 cursor-pointer"
                onClick={() => router.push('/')}
              />
            </div>
          )}

          <nav className="h-full">
            <ul className="flex h-full">
              {NAVBAR_CONTENT.map((item, index) => {
                const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/');
                return (
                  <Link
                    key={index}
                    href={item.href}
                    className={`relative flex h-full items-center px-5 ${
                      isActive
                        ? 'text-primary border-primary border-b-2 font-bold'
                        : 'hover:text-primary font-medium text-gray-700 transition-colors duration-200 hover:font-bold dark:text-gray-300'
                    }`}
                  >
                    <span className="text-sm md:text-base">{item.label}</span>
                  </Link>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* User Controls */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="cursor-pointer rounded-full p-1.5 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <Sun className="h-5 w-5 scale-100 rotate-0 text-yellow-500 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-5 w-5 scale-0 rotate-90 text-blue-500 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">{t('HEADER.TOGGLE_THEME')}</span>
          </Button>
          {!user ? (
            <Button>
              <Link href={'/account/login'} className="cursor-pointer text-base">
                {t('HEADER.LOGIN')}
              </Link>
            </Button>
          ) : (
            <>
              <div className="h-5 w-px bg-gray-300 dark:bg-gray-600" />
              <DropdownMenu>
                <DropdownMenuTrigger className="flex cursor-pointer items-center gap-2">
                  <Avatar className="border-background h-8 w-8 border-2">
                    <AvatarImage
                      src={user.avatar?.url || '/user.png'}
                      alt={user.name || t('USER_SIDEBAR.AVATAR.ALT')}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary text-base">
                      {user.name?.charAt(0) || t('USER_SIDEBAR.AVATAR.FALLBACK')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-base font-medium">{user?.name}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/my-account')}>
                    <User className="mr-2 h-5 w-5" />
                    <span className="text-sm">{t('HEADER.MY_ACCOUNT')}</span>
                  </DropdownMenuItem>
                  <ProtectedComponent permissions={[{ action: EAction.READ, subject: ESubject.System_Users }]}>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/admin/users-manage')}>
                      <Users className="mr-2 h-5 w-5" />
                      <span className="text-sm">{t('HEADER.MANAGE_USER')}</span>
                    </DropdownMenuItem>
                  </ProtectedComponent>
                  <ProtectedComponent
                    permissions={[
                      { action: EAction.READ, subject: ESubject.System_Roles },
                      { action: EAction.READ, subject: ESubject.System_Permissions },
                    ]}
                    logic="OR"
                  >
                    <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/admin/roles-manage')}>
                      <Shield className="mr-2 h-5 w-5" />
                      <span className="text-sm">{t('HEADER.MANAGE_ROLE')}</span>
                    </DropdownMenuItem>
                  </ProtectedComponent>
                  <ProtectedComponent permissions={[{ action: EAction.READ, subject: ESubject.System_Configuration }]}>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => router.push('/admin/system-config-manage')}
                    >
                      <Settings className="mr-2 h-5 w-5" />
                      <span className="text-sm">{t('HEADER.SETTINGS')}</span>
                    </DropdownMenuItem>
                  </ProtectedComponent>
                  <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                    <LogOut className="mr-2 h-5 w-5" />
                    <span className="text-sm">{t('HEADER.LOGOUT')}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default Header;
