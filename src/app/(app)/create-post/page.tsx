
"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, ImagePlus, Send } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const postSchema = z.object({
  title: z.string().min(5, { message: "يجب أن يكون عنوان المنشور 5 أحرف على الأقل" }).max(100, { message: "يجب ألا يتجاوز العنوان 100 حرف" }),
  content: z.string().min(20, { message: "يجب أن يكون محتوى المنشور 20 حرفًا على الأقل" }).max(2000, { message: "يجب ألا يتجاوز المحتوى 2000 حرف" }),
  image: z.any().optional(), // File upload
});

type PostFormValues = z.infer<typeof postSchema>;

export default function CreatePostPage() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit: SubmitHandler<PostFormValues> = (data) => {
    console.log('Creating post:', data);
    // Mock post creation
    toast({
      title: "تم إنشاء المنشور بنجاح!",
      description: `العنوان: ${data.title}`,
      variant: "default",
    });
    form.reset();
    // Redirect to home or my-posts page after creation
    router.push('/home'); 
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-2xl">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-headline text-primary">إنشاء منشور جديد</h1>
          <Button variant="outline" asChild>
            <Link href="/home">
              <ArrowRight className="ml-2 h-4 w-4" />
              العودة إلى الرئيسية
            </Link>
          </Button>
        </div>
        <p className="text-muted-foreground mt-1">شارك آخر التحديثات والعروض مع الصيدليات.</p>
      </header>

      <Card className="shadow-xl">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">عنوان المنشور</Label>
              <Input 
                id="title" 
                placeholder="مثال: إطلاق منتج جديد فعال..." 
                {...form.register('title')} 
              />
              {form.formState.errors.title && <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">محتوى المنشور</Label>
              <Textarea 
                id="content" 
                placeholder="اكتب تفاصيل المنشور هنا. يمكنك إضافة معلومات عن المنتج، فوائده، العروض المتاحة، إلخ." 
                rows={8} 
                {...form.register('content')} 
              />
              {form.formState.errors.content && <p className="text-sm text-destructive">{form.formState.errors.content.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">صورة المنشور (اختياري)</Label>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Input 
                  id="image" 
                  type="file" 
                  className="flex-1" 
                  accept="image/*"
                  {...form.register('image')}
                />
                <Button type="button" variant="outline" size="icon" className="shrink-0">
                  <ImagePlus className="h-5 w-5 text-muted-foreground" />
                </Button>
              </div>
              {form.formState.errors.image && <p className="text-sm text-destructive">{typeof form.formState.errors.image.message === 'string' ? form.formState.errors.image.message : "خطأ في تحميل الصورة"}</p>}
            </div>
            
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={form.formState.isSubmitting}>
              <Send className="ml-2 h-4 w-4" /> 
              {form.formState.isSubmitting ? 'جارٍ النشر...' : 'نشر المنشور'}
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}

    