"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Edit3, Shield, LogOut, MapPin, Phone, Mail, Building, Briefcase, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Mock user data - this would come from auth/database
const mockUser = {
  role: 'pharmacy' as 'pharmacy' | 'medical_rep', // 'pharmacy' or 'medical_rep'
  displayName: 'صيدلية الحياة الجديدة',
  email: 'pharmacy.life@example.com',
  photoUrl: 'https://placehold.co/128x128.png?text=LH',
  phoneNumber: '0501234567',
  region: 'الرياض',
  // Pharmacy specific
  pharmacyName: 'صيدلية الحياة الجديدة',
  address: 'شارع الملك فهد، حي العليا، الرياض',
  licenseNumber: 'PH-12345',
  // Rep specific
  companyName: 'شركة الأدوية المتحدة',
  specialty: 'أمراض القلب والأوعية الدموية',
  bio: 'مندوب طبي متخصص في أدوية القلب، خبرة 5 سنوات في المجال.',
  isApproved: true,
};


export default function ProfilePage() {
  const router = useRouter();
  const user = mockUser; // In a real app, get user data

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
            <AvatarImage src={user.photoUrl} alt={user.displayName} data-ai-hint="profile person" />
            <AvatarFallback className="text-4xl">{user.displayName.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl font-semibold">{user.displayName}</CardTitle>
            <CardDescription className="text-md">
              {user.role === 'pharmacy' ? 'صيدلية' : 'مندوب طبي'}
              {user.role === 'medical_rep' && (
                <Badge variant={user.isApproved ? "default" : "destructive"} className="mr-2 text-xs">
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

          {user.role === 'pharmacy' && (
            <div>
              <h3 className="text-lg font-semibold mb-3 text-primary">معلومات الصيدلية</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                <div className="flex items-center">
                  <Building size={16} className="ml-3 text-muted-foreground" />
                  <strong>اسم الصيدلية:</strong>
                  <span className="mr-2 text-muted-foreground">{user.pharmacyName}</span>
                </div>
                <div className="flex items-center md:col-span-2">
                  <MapPin size={16} className="ml-3 text-muted-foreground" />
                  <strong>العنوان:</strong>
                  <span className="mr-2 text-muted-foreground">{user.address}</span>
                </div>
                <div className="flex items-center">
                  <Shield size={16} className="ml-3 text-muted-foreground" />
                  <strong>رقم الترخيص:</strong>
                  <span className="mr-2 text-muted-foreground">{user.licenseNumber}</span>
                </div>
              </div>
            </div>
          )}

          {user.role === 'medical_rep' && (
             <div>
              <h3 className="text-lg font-semibold mb-3 text-primary">معلومات المندوب</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                <div className="flex items-center">
                  <Briefcase size={16} className="ml-3 text-muted-foreground" />
                  <strong>اسم الشركة:</strong>
                  <span className="mr-2 text-muted-foreground">{user.companyName}</span>
                </div>
                <div className="flex items-center">
                  <UserCircle size={16} className="ml-3 text-muted-foreground" />
                  <strong>التخصص:</strong>
                  <span className="mr-2 text-muted-foreground">{user.specialty}</span>
                </div>
                <div className="md:col-span-2">
                   <strong>نبذة تعريفية:</strong>
                   <p className="text-muted-foreground mt-1 bg-muted/50 p-3 rounded-md">{user.bio}</p>
                </div>
                 {user.licenseNumber && (
                    <div className="flex items-center">
                        <Shield size={16} className="ml-3 text-muted-foreground" />
                        <strong>رقم الرخصة:</strong>
                        <span className="mr-2 text-muted-foreground">{user.licenseNumber}</span>
                    </div>
                )}
              </div>
            </div>
          )}
          
          <Separator />

          <div className="space-y-3 pt-2">
             <Button variant="default" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
              <Edit3 className="ml-2 h-4 w-4" /> تعديل الملف الشخصي
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              تغيير كلمة المرور
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link href="/settings">
                    <Shield className="ml-2 h-4 w-4" /> إعدادات التطبيق
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
