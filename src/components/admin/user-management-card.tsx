import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical, Edit, Trash2, CheckCircle, XCircle, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserManagementCardProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: 'pharmacy' | 'medical_rep' | 'admin';
    avatarUrl?: string;
    region?: string;
    isApproved?: boolean; // For medical_rep
    isActive: boolean; // Account status
    companyName?: string; // For medical_rep
    pharmacyName?: string; // For pharmacy
  };
  onEdit: (userId: string) => void;
  onToggleActive: (userId: string, currentStatus: boolean) => void;
  onApprove?: (userId: string) => void; // For medical_rep
  onReject?: (userId: string) => void; // For medical_rep
}

const roleTranslations = {
  pharmacy: 'صيدلية',
  medical_rep: 'مندوب طبي',
  admin: 'مسؤول',
};

export default function UserManagementCard({ user, onEdit, onToggleActive, onApprove, onReject }: UserManagementCardProps) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-4 flex items-center space-x-4 space-x-reverse">
        <Avatar className="h-12 w-12">
          <AvatarImage src={user.avatarUrl || `https://placehold.co/48x48.png?text=${user.name.substring(0,1)}`} alt={user.name} data-ai-hint="profile person"/>
          <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0 text-end">
          <p className="text-sm font-semibold truncate">{user.name}</p>
          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          <p className="text-xs text-muted-foreground">
            {roleTranslations[user.role]}
            {user.role === 'medical_rep' && user.companyName && ` - ${user.companyName}`}
            {user.role === 'pharmacy' && user.pharmacyName && ` - ${user.pharmacyName}`}
            {user.region && ` (${user.region})`}
          </p>
        </div>
        <div className="flex flex-col items-end space-y-1 shrink-0">
          <Badge variant={user.isActive ? "default" : "destructive"} className={cn("text-xs py-0.5 px-1.5", user.isActive ? "bg-green-500/80" : "bg-red-500/80")}>
            {user.isActive ? <CheckCircle size={12} className="ms-1"/> : <XCircle size={12} className="ms-1"/>}
            {user.isActive ? 'نشط' : 'معطل'}
          </Badge>
          {user.role === 'medical_rep' && (
            <Badge variant={user.isApproved ? "outline" : "secondary"} className={cn("text-xs py-0.5 px-1.5", user.isApproved ? "border-green-500 text-green-600" : "border-yellow-500 text-yellow-600")}>
               {user.isApproved ? <CheckCircle size={12} className="ms-1"/> : <ShieldAlert size={12} className="ms-1"/>}
              {user.isApproved ? 'معتمد' : 'معلق'}
            </Badge>
          )}
        </div>
        <DropdownMenu dir="rtl">
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical size={18} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => onEdit(user.id)}>
              <Edit size={14} className="ms-2" /> تعديل التفاصيل
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onToggleActive(user.id, user.isActive)} className={user.isActive ? "text-red-600 focus:bg-red-50 focus:text-red-700" : "text-green-600 focus:bg-green-50 focus:text-green-700"}>
              {user.isActive ? <XCircle size={14} className="ms-2" /> : <CheckCircle size={14} className="ms-2" />}
              {user.isActive ? 'تعطيل الحساب' : 'تفعيل الحساب'}
            </DropdownMenuItem>
            {user.role === 'medical_rep' && !user.isApproved && onApprove && onReject && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onApprove(user.id)} className="text-green-600 focus:bg-green-50 focus:text-green-700">
                  <CheckCircle size={14} className="ms-2" /> اعتماد المندوب
                </DropdownMenuItem>
                 <DropdownMenuItem onClick={() => onReject(user.id)} className="text-red-600 focus:bg-red-50 focus:text-red-700">
                  <XCircle size={14} className="ms-2" /> رفض المندوب
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
}
