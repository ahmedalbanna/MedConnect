
"use client"; 

import PostCard from '@/components/medconnect/post-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { useRole } from '@/contexts/role-context'; 

const mockRepPosts = [
  {
    id: '1',
    repName: 'أحمد محمود', 
    repAvatarUrl: 'https://placehold.co/40x40.png?text=AM',
    companyName: 'شركة الأدوية الحديثة',
    createdAt: new Date().toISOString(),
    title: 'إطلاق منتج جديد: دواء X لعلاج ارتفاع ضغط الدم',
    content: 'يسرنا الإعلان عن إطلاق دواء X...',
    imageUrl: 'https://placehold.co/600x400.png',
    likesCount: 120,
    commentsCount: 15,
    views: 1578, 
  },
  {
    id: '2',
    repName: 'أحمد محمود',
    repAvatarUrl: 'https://placehold.co/40x40.png?text=AM',
    companyName: 'شركة الأدوية الحديثة',
    createdAt: new Date(Date.now() - 86400000).toISOString(), 
    title: 'تذكير بالندوة التعريفية حول دواء Y',
    content: 'لا تنسوا ندوتنا التعريفية غداً...',
    likesCount: 90,
    commentsCount: 10,
    views: 1200,
  },
];

const mockPharmacyPosts = [
  {
    id: 'pharma-post-1', 
    repName: 'أحمد محمود',
    repAvatarUrl: 'https://placehold.co/40x40.png?text=AM',
    companyName: 'شركة الأدوية الحديثة',
    createdAt: new Date().toISOString(),
    title: 'إطلاق منتج جديد: دواء X لعلاج ارتفاع ضغط الدم',
    content: 'يسرنا الإعلان عن إطلاق دواء X، وهو علاج مبتكر وفعال لمرضى ارتفاع ضغط الدم. يتميز بآثاره الجانبية المنخفضة وفعاليته العالية. متوفر الآن في جميع الصيدليات المعتمدة. للمزيد من المعلومات، يرجى التواصل معنا.',
    imageUrl: 'https://placehold.co/600x400.png?text=ProductX',
    dataAiHint: "drug hypertension",
    likesCount: 120,
    commentsCount: 15,
  },
  {
    id: 'pharma-post-2',
    repName: 'فاطمة علي',
    repAvatarUrl: 'https://placehold.co/40x40.png?text=FA',
    companyName: ' فارماكو العالمية',
    createdAt: new Date(Date.now() - 86400000).toISOString(), 
    title: 'عرض خاص على فيتامينات الأطفال هذا الشهر',
    content: 'استفيدوا من عرضنا الخاص على مجموعة فيتامينات الأطفال المتكاملة. خصم 20% طوال شهر يوليو. تركيبة معززة لدعم نمو وصحة أطفالكم. لا تفوتوا الفرصة!',
    imageUrl: 'https://placehold.co/600x400.png?text=Vitamins',
    dataAiHint: "vitamins kids",
    likesCount: 250,
    commentsCount: 30,
  },
   {
    id: 'pharma-post-3',
    repName: 'خالد إبراهيم',
    repAvatarUrl: 'https://placehold.co/40x40.png?text=KI',
    companyName: 'مستلزمات طبية برو',
    createdAt: new Date(Date.now() - 172800000).toISOString(), 
    title: 'ندوة تعريفية حول أحدث أجهزة قياس السكر',
    content: 'ندعوكم لحضور ندوة تعريفية حول أحدث أجهزة قياس السكر المنزلية. تتميز بالدقة وسهولة الاستخدام. ستعقد الندوة يوم الخميس القادم الساعة 5 مساءً عبر الإنترنت. رابط التسجيل في البايو.',
    // No image for this post
    likesCount: 95,
    commentsCount: 8,
  },
];


export default function HomePage() {
  const { currentUserRole } = useRole(); 

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <header className="mb-6">
        <h1 className="text-3xl font-headline text-primary">
          {currentUserRole === 'pharmacy' ? 'آخر المستجدات' : 'لوحة تحكم المندوب'}
        </h1>
        <p className="text-muted-foreground">
          {currentUserRole === 'pharmacy' 
            ? 'اكتشف آخر المنشورات والعروض من مندوبي الأدوية.'
            : 'نظرة عامة على منشوراتك وأدائك.'
          }
        </p>
      </header>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Input type="search" placeholder="ابحث في المنشورات..." className="ps-10" />
          <Search className="absolute end-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
        <Button variant="outline">
          <Filter className="ms-2 h-4 w-4" />
          تصفية
        </Button>
        {currentUserRole === 'medical_rep' && (
          <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/create-post">
              <PlusCircle className="ms-2 h-5 w-5" />
              إنشاء منشور جديد
            </Link>
          </Button>
        )}
      </div>

      {currentUserRole === 'pharmacy' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPharmacyPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {currentUserRole === 'medical_rep' && (
        <div>
          <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-card rounded-lg shadow">
              <h3 className="font-semibold text-muted-foreground">إجمالي المشاهدات</h3>
              <p className="text-2xl text-primary font-bold">15,780</p>
            </div>
            <div className="p-4 bg-card rounded-lg shadow">
              <h3 className="font-semibold text-muted-foreground">التفاعلات هذا الأسبوع</h3>
              <p className="text-2xl text-primary font-bold">350</p>
            </div>
            <div className="p-4 bg-card rounded-lg shadow">
              <h3 className="font-semibold text-muted-foreground">إجمالي المنشورات</h3>
              <p className="text-2xl text-primary font-bold">{mockRepPosts.length}</p>
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-4 text-primary">منشوراتي الأخيرة</h2>
          {mockRepPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockRepPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">لم تقم بنشر أي شيء بعد.</p>
          )}
        </div>
      )}
    </div>
  );
}
