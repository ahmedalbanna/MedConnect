"use client";

import Link from 'next/link';
import Image from 'next/image';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSkeleton,
  SidebarProvider,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { LogOut, LayoutDashboard, Users, UserCheck, BellPlus, MessageSquare, Settings } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const adminNavItems = [
  { href: '/admin/dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
  { href: '/admin/users', label: 'إدارة المستخدمين', icon: Users },
  { href: '/admin/membership-requests', label: 'طلبات العضوية', icon: UserCheck },
  { href: '/admin/send-notification', label: 'إرسال إشعار', icon: BellPlus },
  { href: '/admin/chat', label: 'رسائل مباشرة', icon: MessageSquare },
];

const settingsNavItems = [
 { href: '/admin/settings', label: 'إعدادات النظام', icon: Settings },
];

export default function AdminSidebarWrapper() {
  // Default open state can be managed by cookie or prop
  return (
    <SidebarProvider defaultOpen={true} open={true}>
      <ActualAdminSidebar />
    </SidebarProvider>
  );
}


function ActualAdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { open } = useSidebar(); // Get sidebar state

  const handleLogout = () => {
    console.log("Admin logging out...");
    router.push('/auth');
  };

  return (
    <Sidebar side="right" variant="sidebar" collapsible="icon" className="border-l">
      <SidebarHeader className="p-4 border-b items-center justify-between">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <Image 
            src="https://placehold.co/32x32.png" 
            alt="MedConnect Logo" 
            width={32} 
            height={32}
            data-ai-hint="logo medical"
            className="rounded-sm" 
          />
          {open && <h1 className="text-xl font-headline text-primary">MedConnect Admin</h1>}
        </Link>
        <SidebarTrigger className="md:hidden" />
      </SidebarHeader>

      <SidebarContent className="p-2 flex-grow">
        <SidebarMenu>
          {adminNavItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior>
                <SidebarMenuButton
                  isActive={pathname.startsWith(item.href)}
                  className="justify-start"
                  tooltip={!open ? item.label : undefined}
                >
                  <item.icon className="h-5 w-5" />
                  {open && <span>{item.label}</span>}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel>الإعدادات</SidebarGroupLabel>
          <SidebarMenu>
           {settingsNavItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior>
                  <SidebarMenuButton
                    isActive={pathname.startsWith(item.href)}
                    className="justify-start"
                    tooltip={!open ? item.label : undefined}
                  >
                    <item.icon className="h-5 w-5" />
                    {open && <span>{item.label}</span>}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

      </SidebarContent>

      <SidebarFooter className="p-2 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          {open && <span className="mr-2">تسجيل الخروج</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
