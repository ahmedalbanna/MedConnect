import StatsCard from '@/components/admin/stats-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, BellPlus, MessageSquare, Activity, DollarSign, ShoppingCart, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const regionData = [
  { name: 'الرياض', users: 1200 },
  { name: 'جدة', users: 950 },
  { name: 'الدمام', users: 780 },
  { name: 'مكة', users: 600 },
  { name: 'المدينة', users: 450 },
  { name: 'أخرى', users: 1100 },
];


export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-headline text-primary">لوحة تحكم المسؤول</h1>
        <p className="text-muted-foreground">نظرة عامة على نظام MedConnect.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="إجمالي الصيدليات" value="1,250" icon={ShoppingCart} colorClass="text-green-500" description="+20 هذا الشهر" />
        <StatsCard title="إجمالي المندوبين" value="340" icon={Users} colorClass="text-blue-500" description="+5 معتمدين جدد" />
        <StatsCard title="طلبات عضوية معلقة" value="12" icon={UserCheck} colorClass="text-yellow-500" />
        <StatsCard title="مستخدمون نشطون اليوم" value="480" icon={Activity} colorClass="text-purple-500" />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="ml-2 h-5 w-5 text-primary" />
              توزيع المستخدمين حسب المنطقة
            </CardTitle>
            <CardDescription>عدد المستخدمين (صيدليات ومندوبين) في المناطق الرئيسية.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionData} layout="vertical" margin={{ right: 30 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" 환경="rtl" />
                <YAxis dataKey="name" type="category" width={80} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--muted))' }}
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', direction: 'rtl' }}
                  itemStyle={{ direction: 'rtl' }}
                />
                <Bar dataKey="users" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle>إجراءات سريعة</CardTitle>
            <CardDescription>اختصارات للمهام الإدارية الشائعة.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/admin/users">
                <Users className="ml-2 h-4 w-4" /> إدارة المستخدمين
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/admin/membership-requests">
                <UserCheck className="ml-2 h-4 w-4" /> إدارة طلبات العضوية
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/admin/send-notification">
                <BellPlus className="ml-2 h-4 w-4" /> إرسال إشعار عام
              </Link>
            </Button>
             <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/admin/chat">
                <MessageSquare className="ml-2 h-4 w-4" /> إرسال رسالة مباشرة
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
