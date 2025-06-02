"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BellPlus, Send, Users, Building, Briefcase, MapPin, User } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';

const notificationSchema = z.object({
  title: z.string().min(5, { message: "يجب أن يكون العنوان 5 أحرف على الأقل" }),
  message: z.string().min(10, { message: "يجب أن تكون الرسالة 10 أحرف على الأقل" }),
  target: z.enum(['all_users', 'all_pharmacies', 'all_reps', 'specific_region', 'specific_user']),
  specificValue: z.string().optional(), // For region name or user ID
}).refine(data => {
  if (data.target === 'specific_region' || data.target === 'specific_user') {
    return !!data.specificValue && data.specificValue.trim() !== '';
  }
  return true;
}, {
  message: "الرجاء تحديد القيمة المستهدفة",
  path: ['specificValue'],
});

type NotificationFormValues = z.infer<typeof notificationSchema>;

export default function SendNotificationPage() {
  const { toast } = useToast();
  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      target: "all_users",
    }
  });

  const selectedTarget = form.watch('target');

  const onSubmit: SubmitHandler<NotificationFormValues> = (data) => {
    console.log('Sending notification:', data);
    // Mock sending notification
    toast({
      title: "تم إرسال الإشعار بنجاح!",
      description: `العنوان: ${data.title}`,
      variant: "default", 
    });
    form.reset();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <header className="mb-8 text-center">
        <BellPlus className="mx-auto h-12 w-12 text-primary mb-3" />
        <h1 className="text-3xl font-headline text-primary">إرسال إشعار</h1>
        <p className="text-muted-foreground">أرسل إشعارات جماعية أو مستهدفة لمستخدمي التطبيق.</p>
      </header>

      <Card className="shadow-xl">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">عنوان الإشعار</Label>
              <Input id="title" placeholder="مثال: تحديث هام للسياسات" {...form.register('title')} />
              {form.formState.errors.title && <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">نص الإشعار</Label>
              <Textarea id="message" placeholder="اكتب محتوى الإشعار هنا..." rows={5} {...form.register('message')} />
              {form.formState.errors.message && <p className="text-sm text-destructive">{form.formState.errors.message.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="target">الجمهور المستهدف</Label>
              <Select onValueChange={(value) => form.setValue('target', value as NotificationFormValues['target'])} defaultValue="all_users">
                <SelectTrigger id="target">
                  <SelectValue placeholder="اختر الجمهور المستهدف" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_users"><Users size={16} className="inline ms-2" /> جميع المستخدمين</SelectItem>
                  <SelectItem value="all_pharmacies"><Building size={16} className="inline ms-2" /> جميع الصيدليات</SelectItem>
                  <SelectItem value="all_reps"><Briefcase size={16} className="inline ms-2" /> جميع المندوبين</SelectItem>
                  <SelectItem value="specific_region"><MapPin size={16} className="inline ms-2" /> منطقة محددة</SelectItem>
                  <SelectItem value="specific_user"><User size={16} className="inline ms-2" /> مستخدم محدد</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(selectedTarget === 'specific_region' || selectedTarget === 'specific_user') && (
              <div className="space-y-2">
                <Label htmlFor="specificValue">
                  {selectedTarget === 'specific_region' ? 'اسم المنطقة' : 'معرف المستخدم أو البريد الإلكتروني'}
                </Label>
                <Input 
                  id="specificValue" 
                  placeholder={selectedTarget === 'specific_region' ? 'مثال: الرياض' : 'مثال: user123@example.com'}
                  {...form.register('specificValue')} 
                />
                {form.formState.errors.specificValue && <p className="text-sm text-destructive">{form.formState.errors.specificValue.message}</p>}
              </div>
            )}
            
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={form.formState.isSubmitting}>
              <Send className="ms-2 h-4 w-4" /> 
              {form.formState.isSubmitting ? 'جارٍ الإرسال...' : 'إرسال الإشعار'}
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
