"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MessageSquare, CalendarDays, User, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/home', label: 'الرئيسية', icon: Home },
  { href: '/chat', label: 'الرسائل', icon: MessageSquare },
  { href: '/calendar', label: 'التقويم', icon: CalendarDays },
  { href: '/notifications', label: 'الإشعارات', icon: Bell },
  { href: '/profile', label: 'الملف الشخصي', icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 right-0 left-0 bg-card border-t border-border shadow-t-lg md:hidden z-50">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/home' && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href} legacyBehavior>
              <a
                className={cn(
                  "flex flex-col items-center justify-center text-sm font-medium p-2 rounded-md transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-primary/80"
                )}
              >
                <item.icon className={cn("h-6 w-6 mb-0.5", isActive ? "fill-primary/20" : "")} />
                <span className="text-xs">{item.label}</span>
              </a>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
