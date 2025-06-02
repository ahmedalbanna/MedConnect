"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Bell, Shield, Languages, Palette } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-2xl">
      <header className="mb-8">
        <h1 className="text-3xl font-headline text-primary text-center">إعدادات التطبيق</h1>
      </header>

      <div className="space-y-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Bell className="ml-3 text-primary" />
              تفضيلات الإشعارات
            </CardTitle>
            <CardDescription>تحكم في الإشعارات التي ترغب في استقبالها.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-md hover:bg-muted/50">
              <Label htmlFor="new-message-notifications" className="font-normal">إشعارات الرسائل الجديدة</Label>
              <Switch id="new-message-notifications" defaultChecked dir="ltr" />
            </div>
            <div className="flex items-center justify-between p-3 rounded-md hover:bg-muted/50">
              <Label htmlFor="appointment-notifications" className="font-normal">إشعارات المواعيد</Label>
              <Switch id="appointment-notifications" defaultChecked dir="ltr" />
            </div>
            <div className="flex items-center justify-between p-3 rounded-md hover:bg-muted/50">
              <Label htmlFor="post-update-notifications" className="font-normal">إشعارات المنشورات الجديدة</Label>
              <Switch id="post-update-notifications" dir="ltr" />
            </div>
            <div className="flex items-center justify-between p-3 rounded-md hover:bg-muted/50">
              <Label htmlFor="admin-announcement-notifications" className="font-normal">إعلانات الإدارة</Label>
              <Switch id="admin-announcement-notifications" defaultChecked dir="ltr" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Shield className="ml-3 text-primary" />
              الأمان والخصوصية
            </CardTitle>
            <CardDescription>إدارة إعدادات الأمان والخصوصية الخاصة بك.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/settings/security-privacy" legacyBehavior>
              <a className="flex items-center justify-between p-3 rounded-md hover:bg-muted/50 text-primary">
                <span>عرض سياسة الخصوصية وشروط الخدمة</span>
                <ChevronLeft size={20} />
              </a>
            </Link>
             <Button variant="outline" className="w-full mt-4">تغيير كلمة المرور</Button>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Languages className="ml-3 text-primary" />
              اللغة والمظهر
            </CardTitle>
            <CardDescription>تخصيص لغة التطبيق والمظهر العام.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center justify-between p-3 rounded-md hover:bg-muted/50">
              <Label htmlFor="language-select" className="font-normal">لغة التطبيق</Label>
              <Button variant="outline" size="sm">العربية <ChevronLeft size={16} className="mr-1" /></Button>
            </div>
            <div className="flex items-center justify-between p-3 rounded-md hover:bg-muted/50">
              <Label htmlFor="dark-mode-toggle" className="font-normal">الوضع الداكن</Label>
              <Switch id="dark-mode-toggle" dir="ltr" />
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
