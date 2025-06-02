
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { SlidersHorizontal, Mail, Shield } from 'lucide-react'; // Changed ShieldLock to Shield

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
         <SlidersHorizontal className="mx-auto h-12 w-12 text-primary mb-3" />
        <h1 className="text-3xl font-headline text-primary">إعدادات النظام</h1>
        <p className="text-muted-foreground">إدارة الإعدادات العامة لتطبيق MedConnect.</p>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-xl"><Mail className="ml-3 text-primary"/> إعدادات البريد الإلكتروني</CardTitle>
          <CardDescription>تكوين إعدادات خادم SMTP لإرسال رسائل البريد الإلكتروني من النظام.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="smtp-host">خادم SMTP</Label>
            <Input id="smtp-host" placeholder="smtp.example.com" defaultValue="smtp.gmail.com"/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="smtp-port">منفذ SMTP</Label>
            <Input id="smtp-port" type="number" placeholder="587" defaultValue="587"/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="smtp-user">اسم مستخدم SMTP</Label>
            <Input id="smtp-user" placeholder="user@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="smtp-password">كلمة مرور SMTP</Label>
            <Input id="smtp-password" type="password" />
          </div>
           <div className="flex items-center space-x-2 space-x-reverse">
            <Switch id="smtp-ssl" dir="ltr" />
            <Label htmlFor="smtp-ssl" className="font-normal">استخدام SSL/TLS</Label>
          </div>
          <Button>حفظ إعدادات البريد</Button>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-xl"><Shield className="ml-3 text-primary"/> إعدادات الأمان</CardTitle> {/* Changed ShieldLock to Shield */}
          <CardDescription>إدارة سياسات الأمان والوصول.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-md hover:bg-muted/50">
            <Label htmlFor="mfa-enabled" className="font-normal">تمكين المصادقة الثنائية للمسؤولين</Label>
            <Switch id="mfa-enabled" dir="ltr" defaultChecked />
          </div>
          <div className="space-y-2">
            <Label htmlFor="session-timeout">مهلة جلسة المستخدم (بالدقائق)</Label>
            <Input id="session-timeout" type="number" defaultValue="30" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="failed-login-attempts">عدد محاولات تسجيل الدخول الفاشلة قبل القفل</Label>
            <Input id="failed-login-attempts" type="number" defaultValue="5" />
          </div>
          <Button>حفظ إعدادات الأمان</Button>
        </CardContent>
      </Card>
       <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-xl">إعدادات عامة أخرى</CardTitle>
          <CardDescription>إعدادات متنوعة للنظام.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-md hover:bg-muted/50">
            <Label htmlFor="maintenance-mode" className="font-normal">وضع الصيانة</Label>
            <Switch id="maintenance-mode" dir="ltr"/>
          </div>
           <div className="space-y-2">
            <Label htmlFor="app-version">إصدار التطبيق الحالي</Label>
            <Input id="app-version" defaultValue="1.0.0" disabled />
          </div>
          <Button>حفظ الإعدادات العامة</Button>
        </CardContent>
      </Card>
    </div>
  );
}
