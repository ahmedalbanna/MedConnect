
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MessageSquare, CalendarDays, User, Settings, Bell, LogOut, ShieldCheck, ChevronLeft, PlusSquare, FileText, Repeat } from 'lucide-react'; // ChevronLeft for RTL next
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useRouter } from 'next/navigation';
import { useRole } from '@/contexts/role-context';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const baseNavItems = [
  { href: '/home', label: 'الرئيسية', icon: Home, roles: ['pharmacy', 'medical_rep'] },
  { href: '/chat', label: 'الرسائل', icon: MessageSquare, roles: ['pharmacy', 'medical_rep'] },
  { href: '/calendar', label: 'التقويم', icon: CalendarDays, roles: ['pharmacy', 'medical_rep'] },
];

const medicalRepNavItems = [
  { href: '/create-post', label: 'إنشاء منشور', icon: PlusSquare, roles: ['medical_rep'] },
  { href: '/my-posts', label: 'منشوراتي', icon: FileText, roles: ['medical_rep'] },
];

const pharmacyNavItems: never[] = [
  // يمكن إضافة روابط خاصة بالصيدليات هنا
];

const commonNavItemsEnd = [
  { href: '/notifications', label: 'الإشعارات', icon: Bell, roles: ['pharmacy', 'medical_rep'] },
];

const profileNavItems = [
  { href: '/profile', label: 'الملف الشخصي', icon: User, roles: ['pharmacy', 'medical_rep'] },
  { href: '/settings', label: 'الإعدادات', icon: Settings, roles: ['pharmacy', 'medical_rep'] },
  { href: '/settings/security-privacy', label: 'الأمان والخصوصية', icon: ShieldCheck, roles: ['pharmacy', 'medical_rep'] },
];


export default function MainSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUserRole, setCurrentUserRole } = useRole();

  const handleLogout = () => {
    console.log("Logging out...");
    router.push('/auth');
  };

  const handleRoleChange = (isRep: boolean) => {
    setCurrentUserRole(isRep ? 'medical_rep' : 'pharmacy');
  };

  const availableNavItems = [
    ...baseNavItems,
    ...(currentUserRole === 'medical_rep' ? medicalRepNavItems : []),
    ...(currentUserRole === 'pharmacy' ? pharmacyNavItems : []),
    ...commonNavItemsEnd,
  ].filter(item => item.roles.includes(currentUserRole));

  return (
    <aside className="hidden md:flex flex-col w-64 min-h-screen bg-card border-s border-border p-4 shadow-lg fixed top-0 end-0">
      <div className="flex items-center mb-8 p-2">
        <Image 
          src="https://placehold.co/40x40.png" 
          alt="MedConnect Logo" 
          width={40} 
          height={40} 
          className="ms-3 rounded-md"
          data-ai-hint="logo medical"
        />
        <h1 className="text-2xl font-headline text-primary">MedConnect</h1>
      </div>
      
      <nav className="flex-grow space-y-2 overflow-y-auto min-h-0">
        <h2 className="text-xs font-semibold text-muted-foreground px-2 uppercase tracking-wider">القائمة الرئيسية</h2>
        {availableNavItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/home' && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href} legacyBehavior>
              <a
                className={cn(
                  "flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors group",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className={cn("ms-3 h-5 w-5", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                {item.label}
                {isActive && <ChevronLeft className="ms-auto h-4 w-4 text-primary" />} {/* ChevronLeft for RTL 'next' indicator */}
              </a>
            </Link>
          );
        })}

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="profile-settings" className="border-none">
            <AccordionTrigger className="px-3 py-2.5 rounded-md text-sm font-medium text-foreground hover:bg-muted hover:no-underline hover:text-foreground [&[data-state=open]>svg]:text-primary">
                 <div className="flex items-center">
                    <User className="ms-3 h-5 w-5 text-muted-foreground group-hover:text-foreground data-[state=open]:text-primary" />
                    <span>الحساب والإعدادات</span>
                 </div>
            </AccordionTrigger>
            <AccordionContent className="pb-0">
              <div className="space-y-1 mt-1 ms-4 border-s-2 border-primary/20 ps-4">
                {profileNavItems.filter(item => item.roles.includes(currentUserRole)).map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link key={item.href} href={item.href} legacyBehavior>
                      <a
                        className={cn(
                          "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors group",
                          isActive
                            ? "text-primary"
                            : "text-foreground hover:text-primary/80"
                        )}
                      >
                        <item.icon className={cn("ms-3 h-5 w-5", isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary/80")} />
                        {item.label}
                      </a>
                    </Link>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </nav>

      <div className="p-2 mt-auto border-t border-border">
        <div className="flex items-center justify-between mb-2">
          <Label htmlFor="role-switcher" className="text-xs font-medium text-muted-foreground flex items-center">
            <Repeat size={14} className="ms-1" />
            تبديل الدور
          </Label>
          <span className="text-xs font-semibold text-primary">
            {currentUserRole === 'medical_rep' ? 'مندوب' : 'صيدلية'}
          </span>
        </div>
        <div className="flex items-center space-x-2 space-x-reverse">
           <Switch
            id="role-switcher"
            checked={currentUserRole === 'medical_rep'}
            onCheckedChange={handleRoleChange}
            dir="ltr" 
          />
          <span className="text-sm text-muted-foreground">
            {currentUserRole === 'medical_rep' ? 'مشاهدة كمندوب طبي' : 'مشاهدة كصيدلية'}
          </span>
        </div>
      </div>

      <div className="mt-2 pt-2 border-t border-border">
        <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:bg-destructive/10 hover:text-destructive" onClick={handleLogout}>
          <LogOut className="ms-3 h-5 w-5" />
          تسجيل الخروج
        </Button>
      </div>
    </aside>
  );
}
