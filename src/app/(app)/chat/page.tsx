import ChatPreviewCard from '@/components/medconnect/chat-preview-card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const mockChats = [
  {
    id: 'chat1',
    otherPartyName: 'صيدلية الشفاء',
    otherPartyAvatarUrl: 'https://placehold.co/48x48.png?text=S',
    lastMessage: 'تمام، شكراً لك على التوضيح!',
    lastMessageTime: new Date().toISOString(),
    unreadCount: 2,
  },
  {
    id: 'chat2',
    otherPartyName: 'مندوب شركة الأمل الطبية',
    otherPartyAvatarUrl: 'https://placehold.co/48x48.png?text=A',
    lastMessage: 'بالتأكيد، سأرسل لك الكتالوج الجديد.',
    lastMessageTime: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    unreadCount: 0,
  },
  {
    id: 'chat3',
    otherPartyName: 'صيدلية الأندلس',
    lastMessage: 'هل لديكم كمية كافية من المنتج Y؟',
    lastMessageTime: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    unreadCount: 5,
  },
];

export default function ChatListPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-3xl">
      <header className="mb-6">
        <h1 className="text-3xl font-headline text-primary">الرسائل</h1>
        <p className="text-muted-foreground">جميع محادثاتك في مكان واحد.</p>
      </header>
      
      <div className="relative mb-6">
        <Input type="search" placeholder="ابحث في المحادثات..." className="pr-10" />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      </div>

      <div className="bg-card rounded-lg shadow">
        {mockChats.length > 0 ? (
          mockChats.map((chat) => (
            <ChatPreviewCard key={chat.id} chat={chat} />
          ))
        ) : (
          <p className="p-6 text-center text-muted-foreground">لا توجد محادثات حالياً.</p>
        )}
      </div>
    </div>
  );
}
