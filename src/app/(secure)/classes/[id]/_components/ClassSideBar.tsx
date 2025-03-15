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

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: 'dashboard',
    },
    {
      title: 'Student List',
      url: 'student-list',
    },
    {
      title: 'Assignment',
      isActive: false,
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
      title: 'Supervise',
      isActive: false,
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
      title: 'Review',
      isActive: false,
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
  ],
};

export function ClassSideBar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
              <Collapsible key={item.title} defaultOpen={index === 1} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton isActive={item.isActive}>
                      <Link href={item?.url ?? '#'}>{item.title}</Link>{' '}
                      <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                      <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton asChild>
                              <Link href={item.url}>{item.title}</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
