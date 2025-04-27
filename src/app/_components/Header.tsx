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

  if (!isReady) return null;

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
        <div className="flex items-center gap-5">
          <LanguageSwitcher />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-full"
          >
            <Sun className="h-5 w-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-5 w-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">{t('HEADER.TOGGLE_THEME')}</span>
          </Button>
          {!user ? (
            <Button>
              <Link href={'/account/login'} className="cursor-pointer">
                {t('HEADER.LOGIN')}
              </Link>
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex cursor-pointer items-center gap-2">
                <Avatar className="border-background h-9 w-9 border-4">
                  <AvatarImage src={user.avatar?.url || '/user.png'} alt={user.name || t('USER_SIDEBAR.AVATAR.ALT')} />
                  <AvatarFallback className="bg-primary/10 text-primary text-lg">
                    {user.name?.charAt(0) || t('USER_SIDEBAR.AVATAR.FALLBACK')}
                  </AvatarFallback>
                </Avatar>
                {user?.name}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/my-account')}>
                  <User className="h-5 w-5" />
                  <span>{t('HEADER.MY_ACCOUNT')}</span>
                </DropdownMenuItem>
                <ProtectedComponent permissions={[{ action: EAction.READ, subject: ESubject.System_Users }]}>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/admin/users-manage')}>
                    <Users className="h-5 w-5" />
                    <span>{t('HEADER.MANAGE_USER')}</span>
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
                    <Shield className="h-5 w-5" />
                    <span>{t('HEADER.MANAGE_ROLE')}</span>
                  </DropdownMenuItem>
                </ProtectedComponent>
                <ProtectedComponent permissions={[{ action: EAction.READ, subject: ESubject.System_Configuration }]}>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => router.push('/admin/system-config-manage')}
                  >
                    <Settings className="h-5 w-5" />
                    <span>{t('HEADER.SETTINGS')}</span>
                  </DropdownMenuItem>
                </ProtectedComponent>
                <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                  <LogOut className="h-5 w-5" />
                  <span>{t('HEADER.LOGOUT')}</span>
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
