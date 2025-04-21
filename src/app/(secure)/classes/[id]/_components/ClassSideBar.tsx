import * as React from 'react';
import { GalleryVerticalEnd, Minus, Plus, Circle } from 'lucide-react';
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
import { useParams, usePathname } from 'next/navigation';
import { EAction, ESubject } from '@/utils/types/authorization.type';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { useI18n } from '@/i18n';

export function ClassSideBar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const params = useParams();
  const pathname = usePathname();
  const id = params?.id as string;
  const getUrlWithId = (url: string) => {
    return id ? `/classes/${id}/${url}` : `/${url}`;
  };

  const isCurrentPath = (url: string) => {
    const fullUrl = getUrlWithId(url);
    return pathname === fullUrl;
  };

  const isParentPath = (url: string) => {
    const fullUrl = getUrlWithId(url);
    const segments = fullUrl.split('/');
    const parentPath = segments.slice(0, -1).join('/');
    return pathname.startsWith(parentPath) && pathname !== fullUrl;
  };

  const { t, isReady } = useI18n();

  const data = {
    navMain: [
      {
        title: t('CLASSES.SIDEBAR.MENU.DASHBOARD'),
        url: 'dashboard',
        action: EAction.READ,
        subject: ESubject.Classes,
      },
      {
        title: t('CLASSES.SIDEBAR.MENU.STUDENT_LIST'),
        url: 'student-list',
        action: EAction.READ,
        subject: ESubject.Students,
      },
      {
        title: t('CLASSES.SIDEBAR.MENU.ASSIGNMENT.TITLE'),
        isActive: false,
        url: 'assignment/generate',
        action: EAction.READ,
        subject: ESubject.Thesis_AssignmentSheets,
        items: [
          {
            title: t('CLASSES.SIDEBAR.MENU.ASSIGNMENT.GENERATE'),
            url: 'assignment/generate',
          },
          {
            title: t('CLASSES.SIDEBAR.MENU.ASSIGNMENT.IMPORT'),
            url: 'assignment/import',
          },
        ],
      },
      {
        title: t('CLASSES.SIDEBAR.MENU.REVIEW.TITLE'),
        isActive: false,
        url: 'review/generate',
        action: EAction.READ,
        subject: ESubject.Thesis_GuidanceReviews,
        items: [
          {
            title: t('CLASSES.SIDEBAR.MENU.REVIEW.GENERATE'),
            url: 'review/generate',
          },
          {
            title: t('CLASSES.SIDEBAR.MENU.REVIEW.IMPORT'),
            url: 'review/import',
          },
        ],
      },
      {
        title: t('CLASSES.SIDEBAR.MENU.SUPERVISE.TITLE'),
        isActive: false,
        url: 'supervise/generate',
        action: EAction.READ,
        subject: ESubject.Thesis_SupervisoryComments,
        items: [
          {
            title: t('CLASSES.SIDEBAR.MENU.SUPERVISE.GENERATE'),
            url: 'supervise/generate',
          },
          {
            title: t('CLASSES.SIDEBAR.MENU.SUPERVISE.IMPORT'),
            url: 'supervise/import',
          },
        ],
      },
      {
        title: t('CLASSES.SIDEBAR.MENU.OTHER_DOCUMENTS'),
        isActive: false,
        url: 'other-documents',
        action: EAction.MANAGE,
        subject: ESubject.Thesis_OtherDocuments,
      },
      {
        title: t('CLASSES.SIDEBAR.MENU.DRIVE_INFO'),
        isActive: false,
        url: 'drive-info',
        action: EAction.READ,
        subject: ESubject.Thesis_Drive,
      },
    ],
  };

  if (!isReady) return null;

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
                  <span className="font-semibold">{t('CLASSES.SIDEBAR.THESIS.TITLE')}</span>
                  <span className="">{t('CLASSES.SIDEBAR.THESIS.SUBTITLE')}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item, index) => {
              const active = isCurrentPath(item.url);
              const hasActiveChild = item.items?.some((subItem) => isCurrentPath(subItem.url)) || false;

              return (
                <ProtectedComponent key={item.title} permissions={[{ action: item.action, subject: item.subject }]}>
                  <Collapsible defaultOpen={index === 1 || active || hasActiveChild} className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton isActive={active || hasActiveChild}>
                          <div className="flex w-full items-center">
                            {active ? (
                              <div className="bg-primary mr-2 h-4 w-1 rounded-full"></div>
                            ) : hasActiveChild ? (
                              <div className="bg-primary/50 mr-2 h-4 w-1 rounded-full"></div>
                            ) : (
                              <div className="mr-2 h-4 w-1"></div>
                            )}
                            <Link
                              href={getUrlWithId(item?.url ?? '#')}
                              className={`flex-1 ${active ? 'text-primary font-medium' : ''}`}
                            >
                              {item.title}
                            </Link>
                          </div>
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
                            {item.items.map((subItem) => {
                              const subActive = isCurrentPath(subItem.url);
                              return (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton asChild isActive={subActive}>
                                    <div className="flex w-full items-center">
                                      {subActive && <Circle className="fill-primary text-primary mr-2 size-2" />}
                                      <Link
                                        href={getUrlWithId(subItem.url)}
                                        className={`flex-1 ${subActive ? 'text-primary font-medium' : ''}`}
                                      >
                                        {subItem.title}
                                      </Link>
                                    </div>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              );
                            })}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      ) : null}
                    </SidebarMenuItem>
                  </Collapsible>
                </ProtectedComponent>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
