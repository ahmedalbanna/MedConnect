"use client";

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, LogIn, UserPlus, Briefcase, Building } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Changed from 'next/navigation'

const loginSchema = z.object({
  email: z.string().email({ message: "البريد الإلكتروني غير صالح" }),
  password: z.string().min(6, { message: "يجب أن تكون كلمة المرور 6 أحرف على الأقل" }),
});

const registerSchema = z.object({
  displayName: z.string().min(2, { message: "يجب أن يكون الاسم حرفين على الأقل" }),
  email: z.string().email({ message: "البريد الإلكتروني غير صالح" }),
  password: z.string().min(6, { message: "يجب أن تكون كلمة المرور 6 أحرف على الأقل" }),
  confirmPassword: z.string(),
  role: z.enum(['pharmacy', 'medical_rep'], { required_error: "الرجاء اختيار الدور" }),
  pharmacyName: z.string().optional(),
  companyName: z.string().optional(),
  licenseNumber: z.string().optional(),
  licenseImage: z.any().optional(), // For file upload
}).refine((data) => data.password === data.confirmPassword, {
  message: "كلمتا المرور غير متطابقتين",
  path: ["confirmPassword"],
}).refine((data) => data.role === 'pharmacy' ? !!data.pharmacyName : true, {
  message: "اسم الصيدلية مطلوب",
  path: ["pharmacyName"],
}).refine((data) => data.role === 'medical_rep' ? !!data.companyName : true, {
  message: "اسم الشركة مطلوب",
  path: ["companyName"],
}).refine((data) => data.role === 'medical_rep' ? !!data.licenseImage : true, {
  message: "صورة الترخيص مطلوبة",
  path: ["licenseImage"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function AuthForm() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'pharmacy' | 'medical_rep' | undefined>(undefined);
  const router = useRouter();

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });
  
  const onLoginSubmit: SubmitHandler<LoginFormValues> = (data) => {
    console.log('Login data:', data);
    // Mock login logic
    if (data.email === 'admin@medconnect.com') {
      router.push('/admin/dashboard');
    } else {
      router.push('/home');
    }
  };

  const onRegisterSubmit: SubmitHandler<RegisterFormValues> = (data) => {
    console.log('Register data:', data);
    // Mock register logic
    router.push('/home'); 
  };
  
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <Card className="w-full max-w-md shadow-xl">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'register')} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <LogIn className="ml-2 h-4 w-4" /> تسجيل الدخول
          </TabsTrigger>
          <TabsTrigger value="register" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <UserPlus className="ml-2 h-4 w-4" /> إنشاء حساب
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">تسجيل الدخول</CardTitle>
            <CardDescription>أدخل بياناتك للوصول إلى حسابك.</CardDescription>
          </CardHeader>
          <form onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">البريد الإلكتروني</Label>
                <Input id="login-email" type="email" placeholder="example@mail.com" {...loginForm.register('email')} />
                {loginForm.formState.errors.email && <p className="text-sm text-destructive">{loginForm.formState.errors.email.message}</p>}
              </div>
              <div className="space-y-2 relative">
                <Label htmlFor="login-password">كلمة المرور</Label>
                <Input id="login-password" type={showPassword ? "text" : "password"} placeholder="********" {...loginForm.register('password')} />
                <Button type="button" variant="ghost" size="icon" className="absolute left-1 top-7 h-7 w-7 text-muted-foreground" onClick={togglePasswordVisibility}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
                {loginForm.formState.errors.password && <p className="text-sm text-destructive">{loginForm.formState.errors.password.message}</p>}
              </div>
              <div className="text-sm">
                <Link href="#" className="text-primary hover:underline">
                  هل نسيت كلمة المرور؟
                </Link>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={loginForm.formState.isSubmitting}>
                {loginForm.formState.isSubmitting ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
        <TabsContent value="register">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">إنشاء حساب جديد</CardTitle>
            <CardDescription>املأ النموذج لإنشاء حسابك.</CardDescription>
          </CardHeader>
          <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-displayName">الاسم (للصيدلية أو الممثل)</Label>
                <Input id="register-displayName" placeholder="اسمك الكامل" {...registerForm.register('displayName')} />
                {registerForm.formState.errors.displayName && <p className="text-sm text-destructive">{registerForm.formState.errors.displayName.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">البريد الإلكتروني</Label>
                <Input id="register-email" type="email" placeholder="example@mail.com" {...registerForm.register('email')} />
                {registerForm.formState.errors.email && <p className="text-sm text-destructive">{registerForm.formState.errors.email.message}</p>}
              </div>
              <div className="space-y-2 relative">
                <Label htmlFor="register-password">كلمة المرور</Label>
                <Input id="register-password" type={showPassword ? "text" : "password"} placeholder="********" {...registerForm.register('password')} />
                 <Button type="button" variant="ghost" size="icon" className="absolute left-1 top-7 h-7 w-7 text-muted-foreground" onClick={togglePasswordVisibility}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
                {registerForm.formState.errors.password && <p className="text-sm text-destructive">{registerForm.formState.errors.password.message}</p>}
              </div>
              <div className="space-y-2 relative">
                <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                <Input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} placeholder="********" {...registerForm.register('confirmPassword')} />
                 <Button type="button" variant="ghost" size="icon" className="absolute left-1 top-7 h-7 w-7 text-muted-foreground" onClick={toggleConfirmPasswordVisibility}>
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
                {registerForm.formState.errors.confirmPassword && <p className="text-sm text-destructive">{registerForm.formState.errors.confirmPassword.message}</p>}
              </div>
              <div className="space-y-2">
                <Label>الدور</Label>
                <RadioGroup
                  onValueChange={(value) => {
                     setSelectedRole(value as 'pharmacy' | 'medical_rep');
                     registerForm.setValue('role', value as 'pharmacy' | 'medical_rep');
                  }}
                  className="flex gap-4"
                  dir="rtl"
                >
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="pharmacy" id="role-pharmacy" />
                    <Label htmlFor="role-pharmacy" className="font-normal flex items-center"><Building className="ml-2 h-4 w-4"/> صيدلية</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="medical_rep" id="role-medical_rep" />
                    <Label htmlFor="role-medical_rep" className="font-normal flex items-center"><Briefcase className="ml-2 h-4 w-4"/> مندوب طبي</Label>
                  </div>
                </RadioGroup>
                {registerForm.formState.errors.role && <p className="text-sm text-destructive">{registerForm.formState.errors.role.message}</p>}
              </div>

              {selectedRole === 'pharmacy' && (
                <div className="space-y-2">
                  <Label htmlFor="pharmacyName">اسم الصيدلية</Label>
                  <Input id="pharmacyName" placeholder="اسم صيدليتك" {...registerForm.register('pharmacyName')} />
                  {registerForm.formState.errors.pharmacyName && <p className="text-sm text-destructive">{registerForm.formState.errors.pharmacyName.message}</p>}
                </div>
              )}

              {selectedRole === 'medical_rep' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="companyName">اسم الشركة</Label>
                    <Input id="companyName" placeholder="اسم شركتك" {...registerForm.register('companyName')} />
                    {registerForm.formState.errors.companyName && <p className="text-sm text-destructive">{registerForm.formState.errors.companyName.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="licenseNumber">رقم الرخصة (اختياري)</Label>
                    <Input id="licenseNumber" placeholder="رقم الرخصة" {...registerForm.register('licenseNumber')} />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="licenseImage">صورة الرخصة</Label>
                    <Input id="licenseImage" type="file" {...registerForm.register('licenseImage')} />
                    {registerForm.formState.errors.licenseImage && <p className="text-sm text-destructive">{ typeof registerForm.formState.errors.licenseImage.message === 'string' ? registerForm.formState.errors.licenseImage.message : "خطأ في تحميل الصورة"}</p>}
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={registerForm.formState.isSubmitting}>
                {registerForm.formState.isSubmitting ? "جارٍ إنشاء الحساب..." : "إنشاء حساب"}
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
