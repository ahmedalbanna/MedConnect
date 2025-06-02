import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';

export default function WelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary/10 via-background to-background p-4 sm:p-6">
      <main className="flex flex-col items-center text-center max-w-2xl w-full">
        <Image 
          src="https://placehold.co/150x150.png" 
          alt="MedConnect Logo" 
          width={120} 
          height={120} 
          className="mb-8 rounded-full shadow-lg"
          data-ai-hint="logo medical" 
        />
        <Card className="w-full shadow-2xl">
          <CardHeader>
            <CardTitle className="text-4xl font-headline text-primary">مرحباً بك في MedConnect</CardTitle>
            <CardDescription className="text-lg text-muted-foreground mt-2">
              التطبيق الرائد للتواصل بين الصيدليات ومندوبي الأدوية.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-right">
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-xl font-semibold text-primary mb-2">تواصل فعال</h3>
                <p className="text-sm"> دردشة مباشرة وجدولة مواعيد بسهولة.</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-xl font-semibold text-primary mb-2">محتوى مخصص</h3>
                <p className="text-sm">آخر تحديثات المنتجات والعروض للصيدليات.</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-xl font-semibold text-primary mb-2">إدارة سهلة</h3>
                <p className="text-sm"> أدوات إدارية قوية للمشرفين.</p>
              </div>
            </div>
            <p className="text-muted-foreground">
              انضم إلينا اليوم لتبسيط تفاعلاتك المهنية في القطاع الطبي.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/auth">
                ابدأ الآن
                <ChevronRight className="mr-2 h-5 w-5"/>
              </Link>
            </Button>
          </CardFooter>
        </Card>
        <p className="mt-8 text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} MedConnect. جميع الحقوق محفوظة.
        </p>
      </main>
    </div>
  );
}
