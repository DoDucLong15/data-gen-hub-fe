import * as React from 'react';
import { GalleryVerticalEnd, Minus, Plus } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { EAction, ESubject } from '@/utils/types/authorization.type';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { CLASSES } from '@/configs/messages.config';

const data = {
  navMain: [
    {
      title: CLASSES.SIDEBAR.MENU.DASHBOARD,
      url: 'dashboard',
      action: EAction.READ,
      subject: ESubject.Classes,
    },
    {
      title: CLASSES.SIDEBAR.MENU.STUDENT_LIST,
      url: 'student-list',
      action: EAction.READ,
      subject: ESubject.Students,
    },
    {
      title: CLASSES.SIDEBAR.MENU.ASSIGNMENT.TITLE,
      isActive: false,
      url: 'assignment/generate',
      action: EAction.READ,
      subject: ESubject.Thesis_AssignmentSheets,
      items: [
        {
          title: CLASSES.SIDEBAR.MENU.ASSIGNMENT.GENERATE,
          url: 'assignment/generate',
        },
        {
          title: CLASSES.SIDEBAR.MENU.ASSIGNMENT.IMPORT,
          url: 'assignment/import',
        },
      ],
    },
    {
      title: CLASSES.SIDEBAR.MENU.REVIEW.TITLE,
      isActive: false,
      url: 'review/generate',
      action: EAction.READ,
      subject: ESubject.Thesis_GuidanceReviews,
      items: [
        {
          title: CLASSES.SIDEBAR.MENU.REVIEW.GENERATE,
          url: 'review/generate',
        },
        {
          title: CLASSES.SIDEBAR.MENU.REVIEW.IMPORT,
          url: 'review/import',
        },
      ],
    },
    {
      title: CLASSES.SIDEBAR.MENU.SUPERVISE.TITLE,
      isActive: false,
      url: 'supervise/generate',
      action: EAction.READ,
      subject: ESubject.Thesis_SupervisoryComments,
      items: [
        {
          title: CLASSES.SIDEBAR.MENU.SUPERVISE.GENERATE,
          url: 'supervise/generate',
        },
        {
          title: CLASSES.SIDEBAR.MENU.SUPERVISE.IMPORT,
          url: 'supervise/import',
        },
      ],
    },
    {
      title: CLASSES.SIDEBAR.MENU.OTHER_DOCUMENTS,
      isActive: false,
      url: 'other-documents',
      action: EAction.MANAGE,
      subject: ESubject.Thesis_OtherDocuments,
    },
    {
      title: CLASSES.SIDEBAR.MENU.DRIVE_INFO,
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
    return id ? `/classes/${id}/${url}` : `/${url}`;
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
                  <span className="font-semibold">{CLASSES.SIDEBAR.THESIS.TITLE}</span>
                  <span className="">{CLASSES.SIDEBAR.THESIS.SUBTITLE}</span>
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
