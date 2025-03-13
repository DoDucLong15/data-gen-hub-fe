'use client';

import { ClassSideBar } from './_components/ClassSideBar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useMemo } from 'react';

export default function ClassDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Tạo breadcrumb items dựa trên pathname
  const breadcrumbItems = useMemo(() => {
    const paths = pathname.split('/').filter(Boolean);

    // Mặc định trả về "Classes"
    if (paths.length <= 1) {
      return [{ label: 'Classes', href: '/classes', isCurrentPage: true }];
    }

    // Tạo mảng breadcrumb
    return paths.map((path, index) => {
      // Tạo đường dẫn tương đối
      const href = `/${paths.slice(0, index + 1).join('/')}`;

      // Format tên hiển thị (viết hoa chữ cái đầu và thay thế dấu gạch ngang bằng khoảng trắng)
      const label = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');

      // Kiểm tra nếu là item cuối cùng
      const isCurrentPage = index === paths.length - 1;

      return { label, href, isCurrentPage };
    });
  }, [pathname]);

  return (
    <SidebarProvider>
      <ClassSideBar className='absolute top-15 w-60'/>
      <SidebarInset className='top-1'>
        <header className="flex h-10 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbItems.map((item, index) => (
                <React.Fragment key={`item-${index}`}>
                  {index > 0 && <BreadcrumbSeparator />}
                  <BreadcrumbItem className={index === 0 ? 'hidden md:block' : ''}>
                    {item.isCurrentPage ? (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
