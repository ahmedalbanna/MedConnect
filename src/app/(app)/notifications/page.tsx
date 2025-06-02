import NotificationListItem from '@/components/medconnect/notification-list-item';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { CheckCheck } from 'lucide-react';

const mockNotifications = [
  {
    id: '1',
    type: 'new_message' as 'new_message',
    title: 'رسالة جديدة من صيدلية النور',
    body: 'استفسار بخصوص توافر دواء أملور 5 ملغ...',
    timestamp: new Date().toISOString(),
    isRead: false,
    targetPage: '/chat',
    targetDocId: 'chatXYZ123'
  },
  {
    id: '2',
    type: 'appointment_request' as 'appointment_request',
    title: 'طلب موعد جديد',
    body: 'مندوب شركة الشفاء يطلب موعداً يوم الثلاثاء القادم.',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
    isRead: false,
    targetPage: '/calendar'
  },
  {
    id: '3',
    type: 'admin_approval' as 'admin_approval',
    title: 'تم اعتماد حسابك',
    body: 'مرحباً بك في MedConnect! تم مراجعة طلبك والموافقة عليه.',
    timestamp: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    isRead: true,
  },
  {
    id: '4',
    type: 'post_update' as 'post_update',
    title: 'منشور جديد من شركة الأدوية المتحدة',
    body: 'اكتشف أحدث منتجاتنا للعناية بالبشرة الحساسة...',
    timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    isRead: true,
    targetPage: '/home' // Or a specific post page
  },
   {
    id: '5',
    type: 'admin_announcement' as 'admin_announcement',
    title: 'إعلان هام من الإدارة',
    body: 'يرجى تحديث بياناتكم الشخصية قبل نهاية الأسبوع لضمان استمرارية الخدمة.',
    timestamp: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
    isRead: true,
  },
];

export default function NotificationsPage() {
  const unreadNotifications = mockNotifications.filter(n => !n.isRead);
  const readNotifications = mockNotifications.filter(n => n.isRead);

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-3xl">
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-headline text-primary">الإشعارات</h1>
          <p className="text-muted-foreground">تابع آخر التنبيهات والتحديثات الخاصة بك.</p>
        </div>
        <Button variant="outline" size="sm">
          <CheckCheck className="ml-2 h-4 w-4" />
          وضع علامة "مقروء" للكل
        </Button>
      </header>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 mb-4">
          <TabsTrigger value="all">الكل ({mockNotifications.length})</TabsTrigger>
          <TabsTrigger value="unread">غير مقروءة ({unreadNotifications.length})</TabsTrigger>
          <TabsTrigger value="read" className="hidden sm:inline-flex">مقروءة ({readNotifications.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          {mockNotifications.length > 0 ? (
            <div className="space-y-3">
              {mockNotifications.map((notification) => (
                <NotificationListItem key={notification.id} notification={notification} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">لا توجد إشعارات.</p>
          )}
        </TabsContent>
        <TabsContent value="unread">
           {unreadNotifications.length > 0 ? (
            <div className="space-y-3">
              {unreadNotifications.map((notification) => (
                <NotificationListItem key={notification.id} notification={notification} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">لا توجد إشعارات غير مقروءة.</p>
          )}
        </TabsContent>
         <TabsContent value="read">
           {readNotifications.length > 0 ? (
            <div className="space-y-3">
              {readNotifications.map((notification) => (
                <NotificationListItem key={notification.id} notification={notification} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">لا توجد إشعارات مقروءة.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
