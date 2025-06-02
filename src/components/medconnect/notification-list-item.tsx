import { Bell, MessageSquare, CalendarCheck, AlertTriangle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface NotificationListItemProps {
  notification: {
    id: string;
    type: 'new_message' | 'appointment_request' | 'post_update' | 'admin_announcement' | 'admin_approval';
    title: string;
    body: string;
    timestamp: string; // ISO string
    isRead: boolean;
    targetPage?: string;
    targetDocId?: string;
  };
}

const typeIcons = {
  new_message: MessageSquare,
  appointment_request: CalendarCheck,
  post_update: Bell,
  admin_announcement: AlertTriangle,
  admin_approval: CheckCircle,
};

const typeColors = {
  new_message: "text-blue-500 bg-blue-500/10",
  appointment_request: "text-purple-500 bg-purple-500/10",
  post_update: "text-green-500 bg-green-500/10",
  admin_announcement: "text-red-500 bg-red-500/10",
  admin_approval: "text-teal-500 bg-teal-500/10"
};

export default function NotificationListItem({ notification }: NotificationListItemProps) {
  const Icon = typeIcons[notification.type] || Bell;
  const formattedTime = new Date(notification.timestamp).toLocaleString('ar-EG', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });

  const content = (
    <div className={cn(
      "flex items-start space-x-4 space-x-reverse p-4 rounded-lg transition-colors",
      notification.isRead ? 'bg-card hover:bg-muted/50' : 'bg-primary/5 hover:bg-primary/10 border-s-4 border-primary'
    )}>
      <div className={cn("p-2 rounded-full", typeColors[notification.type])}>
        <Icon size={20} />
      </div>
      <div className="flex-1 text-end">
        <h4 className={cn("font-semibold text-sm", notification.isRead ? "text-foreground" : "text-primary")}>{notification.title}</h4>
        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{notification.body}</p>
        <p className="text-xs text-muted-foreground/70 mt-1">{formattedTime}</p>
      </div>
      {!notification.isRead && (
        <div className="h-2.5 w-2.5 bg-primary rounded-full self-center shrink-0"></div>
      )}
    </div>
  );

  if (notification.targetPage && notification.targetDocId) {
    const href = notification.targetPage.startsWith('/') 
      ? `${notification.targetPage}/${notification.targetDocId}`
      : `/${notification.targetPage}/${notification.targetDocId}`;
      
    return <Link href={href} legacyBehavior><a>{content}</a></Link>;
  }
  
  return content;
}
