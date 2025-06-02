import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clock, MessageSquare, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppointmentCardProps {
  appointment: {
    id: string;
    otherPartyName: string;
    otherPartyAvatarUrl?: string;
    otherPartyRole: 'pharmacy' | 'medical_rep';
    date: string; // ISO string
    time: string; // e.g., "10:00 AM"
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  };
  userRole: 'pharmacy' | 'medical_rep'; // Role of the current user viewing the card
}

const statusStyles = {
  pending: 'bg-yellow-500/20 text-yellow-700 border-yellow-500/50',
  confirmed: 'bg-green-500/20 text-green-700 border-green-500/50',
  cancelled: 'bg-red-500/20 text-red-700 border-red-500/50',
  completed: 'bg-blue-500/20 text-blue-700 border-blue-500/50',
};

const statusTranslations = {
  pending: 'معلق',
  confirmed: 'مؤكد',
  cancelled: 'ملغى',
  completed: 'مكتمل',
};


export default function AppointmentCard({ appointment, userRole }: AppointmentCardProps) {
  const formattedDate = new Date(appointment.date).toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-4 border-b">
        <div className="flex items-center space-x-3 space-x-reverse">
          <Avatar className="h-10 w-10">
            <AvatarImage src={appointment.otherPartyAvatarUrl || `https://placehold.co/40x40.png?text=${appointment.otherPartyName.substring(0,1)}`} alt={appointment.otherPartyName} data-ai-hint="profile person" />
            <AvatarFallback>{appointment.otherPartyName.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="text-end">
            <CardTitle className="text-md font-semibold">{appointment.otherPartyName}</CardTitle>
            <p className="text-xs text-muted-foreground">
              {appointment.otherPartyRole === 'pharmacy' ? 'صيدلية' : 'مندوب طبي'}
            </p>
          </div>
          <Badge variant="outline" className={cn("ms-auto text-xs py-1 px-2 border", statusStyles[appointment.status])}>
            {statusTranslations[appointment.status]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-3 text-sm">
        <div className="flex items-center text-muted-foreground">
          <CalendarDays size={16} className="ms-2 text-primary" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center text-muted-foreground">
          <Clock size={16} className="ms-2 text-primary" />
          <span>{appointment.time}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-end space-x-2 space-x-reverse">
        {userRole === 'pharmacy' && appointment.status === 'pending' && (
          <>
            <Button variant="outline" size="sm" className="border-green-500 text-green-600 hover:bg-green-500/10">الموافقة</Button>
            <Button variant="outline" size="sm" className="border-red-500 text-red-600 hover:bg-red-500/10">الرفض</Button>
          </>
        )}
         {userRole === 'medical_rep' && appointment.status === 'pending' && (
          <Button variant="outline" size="sm" className="border-destructive text-destructive hover:bg-destructive/10">إلغاء الطلب</Button>
        )}
        {(appointment.status === 'confirmed' || appointment.status === 'completed') && (
          <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
            <MessageSquare size={16} className="ms-2" />
            مراسلة
          </Button>
        )}
         {appointment.status !== 'pending' && appointment.status !== 'cancelled' && (
           <Button variant="outline" size="sm">عرض التفاصيل</Button>
         )}
      </CardFooter>
    </Card>
  );
}
