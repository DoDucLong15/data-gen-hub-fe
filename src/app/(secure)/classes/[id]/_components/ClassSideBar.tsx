import * as React from 'react';
import { GalleryVerticalEnd, Minus, Plus } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { EAction, ESubject } from '@/utils/types/authorization.type';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: 'dashboard',
      action: EAction.READ,
      subject: ESubject.Classes,
    },
    {
      title: 'Student List',
      url: 'student-list',
      action: EAction.READ,
      subject: ESubject.Students,
    },
    {
      title: 'Assignment',
      isActive: false,
      url: 'assignment/generate',
      action: EAction.READ,
      subject: ESubject.Thesis_AssignmentSheets,
      items: [
        {
          title: 'Generate',
          url: 'assignment/generate',
        },
        {
          title: 'Import',
          url: 'assignment/import',
        },
      ],
    },
    {
      title: 'Review',
      isActive: false,
      url: 'review/generate',
      action: EAction.READ,
      subject: ESubject.Thesis_GuidanceReviews,
      items: [
        {
          title: 'Generate',
          url: 'review/generate',
        },
        {
          title: 'Import',
          url: 'review/import',
        },
      ],
    },
    {
      title: 'Supervise',
      isActive: false,
      url: 'supervise/generate',
      action: EAction.READ,
      subject: ESubject.Thesis_SupervisoryComments,
      items: [
        {
          title: 'Generate',
          url: 'supervise/generate',
        },
        {
          title: 'Import',
          url: 'supervise/import',
        },
      ],
    },
    {
      title: 'Other documents',
      isActive: false,
      url: 'other-documents',
      action: EAction.MANAGE,
      subject: ESubject.Thesis_OtherDocuments,
    },
    {
      title: 'Drive Info',
      isActive: false,
      url: 'drive-info',
      action: EAction.READ,
      subject: ESubject.Thesis_Drive,
    },
  ],
};

export function ClassSideBar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const params = useParams();
  const id = params?.id as string;
  const getUrlWithId = (url: string) => {
    return id ? `/classes/${id}/${url}` : `/${url}`; // Thêm id vào các URL khác nếu cần
  };
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Thesis</span>
                  <span className="">Manage Document</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item, index) => (
              <ProtectedComponent key={item.title} permissions={[{ action: item.action, subject: item.subject }]}>
                <Collapsible defaultOpen={index === 1} className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton isActive={item.isActive}>
                        <Link href={getUrlWithId(item?.url ?? '#')}>{item.title}</Link>{' '}
                        {item.items?.length && (
                          <>
                            <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                            <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                          </>
                        )}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    {item.items?.length ? (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((item) => (
                            <SidebarMenuSubItem key={item.title}>
                              <SidebarMenuSubButton asChild>
                                <Link href={getUrlWithId(item.url)}>{item.title}</Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    ) : null}
                  </SidebarMenuItem>
                </Collapsible>
              </ProtectedComponent>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
