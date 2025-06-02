import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ChatPreviewCardProps {
  chat: {
    id: string;
    otherPartyName: string;
    otherPartyAvatarUrl?: string;
    lastMessage: string;
    lastMessageTime: string; // Or Date object
    unreadCount: number;
  };
}

export default function ChatPreviewCard({ chat }: ChatPreviewCardProps) {
  return (
    <Link href={`/chat/${chat.id}`} legacyBehavior>
      <a className="block p-4 hover:bg-muted/50 transition-colors rounded-lg border-b last:border-b-0">
        <div className="flex items-center space-x-4 space-x-reverse">
          <Avatar className="h-12 w-12">
            <AvatarImage src={chat.otherPartyAvatarUrl || `https://placehold.co/48x48.png?text=${chat.otherPartyName.substring(0,1)}`} alt={chat.otherPartyName} data-ai-hint="profile person" />
            <AvatarFallback>{chat.otherPartyName.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0 text-right">
            <div className="flex justify-between items-center mb-0.5">
              <h3 className="text-sm font-semibold truncate">{chat.otherPartyName}</h3>
              <p className="text-xs text-muted-foreground">{new Date(chat.lastMessageTime).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
              {chat.unreadCount > 0 && (
                <Badge variant="default" className="px-2 py-0.5 text-xs bg-accent text-accent-foreground">{chat.unreadCount}</Badge>
              )}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
