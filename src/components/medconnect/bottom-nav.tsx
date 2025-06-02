
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MessageSquare, CalendarDays, User, Bell, PlusSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

// في تطبيق حقيقي، سيتم تحديد هذا الدور بناءً على بيانات المستخدم المسجل دخوله.
// لأغراض العرض، تم تعيينه إلى 'medical_rep'.
const currentUserRole: 'pharmacy' | 'medical_rep' = 'medical_rep';

const baseNavItems = [
  { href: '/home', label: 'الرئيسية', icon: Home, roles: ['pharmacy', 'medical_rep'] },
  { href: '/chat', label: 'الرسائل', icon: MessageSquare, roles: ['pharmacy', 'medical_rep'] },
];

const medicalRepNavItems = [
  { href: '/create-post', label: 'إنشاء منشور', icon: PlusSquare, roles: ['medical_rep'] },
];

const pharmacyNavItems = [
  // يمكن إضافة روابط خاصة بالصيدليات هنا
];

const commonNavItemsEnd = [
  { href: '/calendar', label: 'التقويم', icon: CalendarDays, roles: ['pharmacy', 'medical_rep'] },
  { href: '/notifications', label: 'الإشعارات', icon: Bell, roles: ['pharmacy', 'medical_rep'] },
  { href: '/profile', label: 'الشخصي', icon: User, roles: ['pharmacy', 'medical_rep'] },
];

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    ...baseNavItems,
    ...(currentUserRole === 'medical_rep' ? medicalRepNavItems : []),
    ...(currentUserRole === 'pharmacy' ? pharmacyNavItems : []),
    ...commonNavItemsEnd,
  ].filter(item => item.roles.includes(currentUserRole));


  return (
    <nav className="fixed bottom-0 right-0 left-0 bg-card border-t border-border shadow-t-lg md:hidden z-50">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/home' && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href} legacyBehavior>
              <a
                className={cn(
                  "flex flex-col items-center justify-center text-sm font-medium p-2 rounded-md transition-colors flex-1 min-w-0",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-primary/80"
                )}
              >
                <item.icon className={cn("h-5 w-5 mb-0.5", isActive ? "fill-primary/20" : "")} />
                <span className="text-xs truncate">{item.label}</span>
              </a>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

    