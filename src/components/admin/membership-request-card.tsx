import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';
import { CheckCircle, XCircle, Eye } from 'lucide-react';

interface MembershipRequestCardProps {
  request: {
    id: string;
    repName: string;
    repAvatarUrl?: string;
    companyName: string;
    licenseImageUrl: string; // URL to the license image
    submissionDate: string; // ISO string
  };
  onApprove: (requestId: string) => void;
  onReject: (requestId: string) => void;
}

export default function MembershipRequestCard({ request, onApprove, onReject }: MembershipRequestCardProps) {
  const formattedDate = new Date(request.submissionDate).toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="p-3 flex flex-row items-center space-x-3 space-x-reverse">
        <Avatar className="h-10 w-10">
          <AvatarImage src={request.repAvatarUrl || `https://placehold.co/40x40.png?text=${request.repName.substring(0,1)}`} alt={request.repName} data-ai-hint="profile person medical" />
          <AvatarFallback>{request.repName.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0 text-right">
          <CardTitle className="text-sm font-semibold">{request.repName}</CardTitle>
          <p className="text-xs text-muted-foreground">{request.companyName}</p>
          <p className="text-xs text-muted-foreground">تاريخ التقديم: {formattedDate}</p>
        </div>
      </CardHeader>
      <CardContent className="p-3 border-t">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="w-full text-primary border-primary hover:bg-primary/10">
              <Eye size={16} className="ml-2" /> عرض صورة الرخصة
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg p-0" dir="rtl">
            <DialogHeader className="p-4 border-b">
              <DialogTitle>صورة رخصة المندوب: {request.repName}</DialogTitle>
              <DialogDescription>الرجاء مراجعة الرخصة بعناية قبل الموافقة.</DialogDescription>
            </DialogHeader>
            <div className="p-4 max-h-[70vh] overflow-auto">
              <Image 
                src={request.licenseImageUrl} 
                alt={`رخصة ${request.repName}`} 
                width={800} 
                height={600} 
                className="rounded-md object-contain w-full h-auto"
                data-ai-hint="license document"
              />
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
      <CardFooter className="p-3 flex justify-end space-x-2 space-x-reverse">
        <Button variant="destructive" size="sm" onClick={() => onReject(request.id)}>
          <XCircle size={16} className="ml-2" /> رفض
        </Button>
        <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => onApprove(request.id)}>
          <CheckCircle size={16} className="ml-2" /> موافقة
        </Button>
      </CardFooter>
    </Card>
  );
}
