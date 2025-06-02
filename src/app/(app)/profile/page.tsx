
"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Edit3, Shield, LogOut, MapPin, Phone, Mail, Building, Briefcase, CheckCircle, Clock, UserCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRole, UserRole } from '@/contexts/role-context';

const mockPharmacyUser = {
  role: 'pharmacy' as UserRole, 
  displayName: 'صيدلية الأمل', 
  email: 'alamal@pharmacy.com', 
  photoUrl: 'https://placehold.co/128x128.png?text=PA',
  dataAiHint: "pharmacy building",
  phoneNumber: '0112345678', 
  region: 'الرياض', 
  pharmacyName: 'صيدلية الأمل', 
  address: 'شارع الملك فهد، الرياض',
  licenseNumber: 'PH-12345',
  isApproved: true, // Not directly used for pharmacy in this UI but good for consistency
};

const mockMedicalRepUser = {
  role: 'medical_rep' as UserRole,
  displayName: 'أحمد خليل (مندوب)',
  email: 'ahmed.k@rep.com',
  photoUrl: 'https://placehold.co/128x128.png?text=AK',
  dataAiHint: "medical representative",
  phoneNumber: '0501234567',
  region: 'جدة',
  companyName: 'شركة الدواء المبتكر',
  specialty: 'أمراض القلب',
  bio: 'مندوب طبي متخصص في أدوية أمراض القلب والأوعية الدموية. أعمل في هذا المجال منذ 5 سنوات وأسعى لتقديم أفضل الحلول للمرضى والأطباء.',
  licenseNumber: 'REP-00789',
  isApproved: true,
};


export default function ProfilePage() {
  const router = useRouter();
  const { currentUserRole } = useRole();
  
  const user = currentUserRole === 'pharmacy' ? mockPharmacyUser : mockMedicalRepUser;

  const handleLogout = () => {
    console.log("Logging out...");
    router.push('/auth');
  };
  
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-headline text-primary">الملف الشخصي</h1>
      </header>

      <Card className="shadow-xl overflow-hidden">
        <CardHeader className="bg-muted/30 p-6 flex flex-col items-center text-center space-y-4">
          <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
            <AvatarImage src={user.photoUrl} alt={user.displayName} data-ai-hint={user.dataAiHint || "profile person"} />
            <AvatarFallback className="text-4xl">{user.displayName.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl font-semibold">{user.displayName}</CardTitle>
            <CardDescription className="text-md flex items-center justify-center space-x-1 space-x-reverse">
              <span>{user.role === 'pharmacy' ? 'صيدلية' : 'مندوب طبي'}</span>
              {user.role === 'medical_rep' && (
                <Badge variant={user.isApproved ? "default" : "destructive"} className="mr-2 text-xs bg-green-500/80 text-white">
                  {user.isApproved ? <CheckCircle className="ml-1 h-3 w-3" /> : <Clock className="ml-1 h-3 w-3" />}
                  {user.isApproved ? 'معتمد' : 'في انتظار الموافقة'}
                </Badge>
              )}
            </CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Edit3 className="ml-2 h-4 w-4" /> تعديل الصورة
          </Button>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-primary">المعلومات الأساسية</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm">
              <div className="flex items-center">
                <Mail size={16} className="ml-3 text-muted-foreground" />
                <strong>البريد الإلكتروني:</strong>
                <span className="mr-2 text-muted-foreground">{user.email}</span>
              </div>
              <div className="flex items-center">
                <Phone size={16} className="ml-3 text-muted-foreground" />
                <strong>رقم الهاتف:</strong>
                <span className="mr-2 text-muted-foreground">{user.phoneNumber || 'غير متوفر'}</span>
              </div>
              <div className="flex items-center">
                <MapPin size={16} className="ml-3 text-muted-foreground" />
                <strong>المنطقة:</strong>
                <span className="mr-2 text-muted-foreground">{user.region || 'غير محدد'}</span>
              </div>
            </div>
          </div>
          
          <Separator />

          {currentUserRole === 'pharmacy' && (
            <div>
              <h3 className="text-lg font-semibold mb-3 text-primary">معلومات الصيدلية</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                <div className="flex items-center">
                  <Building size={16} className="ml-3 text-muted-foreground" />
                  <strong>اسم الصيدلية:</strong>
                  <span className="mr-2 text-muted-foreground">{mockPharmacyUser.pharmacyName}</span>
                </div>
                <div className="flex items-center md:col-span-2">
                  <MapPin size={16} className="ml-3 text-muted-foreground" />
                  <strong>العنوان:</strong>
                  <span className="mr-2 text-muted-foreground">{mockPharmacyUser.address}</span>
                </div>
                <div className="flex items-center">
                  <Shield size={16} className="ml-3 text-muted-foreground" />
                  <strong>رقم الترخيص:</strong>
                  <span className="mr-2 text-muted-foreground">{mockPharmacyUser.licenseNumber}</span>
                </div>
              </div>
            </div>
          )}

          {currentUserRole === 'medical_rep' && (
             <div>
              <h3 className="text-lg font-semibold mb-3 text-primary">معلومات المندوب</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                <div className="flex items-center">
                  <Briefcase size={16} className="ml-3 text-muted-foreground" />
                  <strong>اسم الشركة:</strong>
                  <span className="mr-2 text-muted-foreground">{mockMedicalRepUser.companyName}</span>
                </div>
                <div className="flex items-center">
                  <UserCircle size={16} className="ml-3 text-muted-foreground" />
                  <strong>التخصص:</strong>
                  <span className="mr-2 text-muted-foreground">{mockMedicalRepUser.specialty}</span>
                </div>
                 {mockMedicalRepUser.licenseNumber && (
                    <div className="flex items-center">
                        <Shield size={16} className="ml-3 text-muted-foreground" />
                        <strong>رقم الرخصة:</strong>
                        <span className="mr-2 text-muted-foreground">{mockMedicalRepUser.licenseNumber}</span>
                    </div>
                )}
                {mockMedicalRepUser.bio && (
                  <div className="md:col-span-2">
                    <strong>نبذة تعريفية:</strong>
                    <p className="text-muted-foreground mt-1 bg-muted/50 p-3 rounded-md text-xs leading-relaxed">{mockMedicalRepUser.bio}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <Separator />

          <div className="space-y-3 pt-2 flex flex-wrap gap-2">
             <Button variant="default" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
              <Edit3 className="ml-2 h-4 w-4" /> تعديل الملف الشخصي
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              تغيير كلمة المرور
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link href="/settings">
                    <Settings className="ml-2 h-4 w-4" /> إعدادات التطبيق
                </Link>
            </Button>
            <Button variant="destructive" onClick={handleLogout} className="w-full sm:w-auto">
              <LogOut className="ml-2 h-4 w-4" /> تسجيل الخروج
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
