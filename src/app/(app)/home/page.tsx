import PostCard from '@/components/medconnect/post-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';

const mockPharmacyPosts = [
  {
    id: '1',
    repName: 'أحمد محمود',
    repAvatarUrl: 'https://placehold.co/40x40.png?text=AM',
    companyName: 'شركة الأدوية الحديثة',
    createdAt: new Date().toISOString(),
    title: 'إطلاق منتج جديد: دواء X لعلاج ارتفاع ضغط الدم',
    content: 'يسرنا الإعلان عن إطلاق دواء X، وهو علاج مبتكر وفعال لمرضى ارتفاع ضغط الدم. يتميز بآثاره الجانبية المنخفضة وفعاليته العالية. متوفر الآن في جميع الصيدليات المعتمدة. للمزيد من المعلومات، يرجى التواصل معنا.',
    imageUrl: 'https://placehold.co/600x400.png',
    likesCount: 120,
    commentsCount: 15,
  },
  {
    id: '2',
    repName: 'فاطمة علي',
    repAvatarUrl: 'https://placehold.co/40x40.png?text=FA',
    companyName: ' فارماكو العالمية',
    createdAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    title: 'عرض خاص على فيتامينات الأطفال هذا الشهر',
    content: 'استفيدوا من عرضنا الخاص على مجموعة فيتامينات الأطفال المتكاملة. خصم 20% طوال شهر يوليو. تركيبة معززة لدعم نمو وصحة أطفالكم. لا تفوتوا الفرصة!',
    imageUrl: 'https://placehold.co/600x400.png',
    likesCount: 250,
    commentsCount: 30,
  },
   {
    id: '3',
    repName: 'خالد إبراهيم',
    repAvatarUrl: 'https://placehold.co/40x40.png?text=KI',
    companyName: 'مستلزمات طبية برو',
    createdAt: new Date(Date.now() - 172800000).toISOString(), // Two days ago
    title: 'ندوة تعريفية حول أحدث أجهزة قياس السكر',
    content: 'ندعوكم لحضور ندوة تعريفية حول أحدث أجهزة قياس السكر المنزلية. تتميز بالدقة وسهولة الاستخدام. ستعقد الندوة يوم الخميس القادم الساعة 5 مساءً عبر الإنترنت. رابط التسجيل في البايو.',
    likesCount: 95,
    commentsCount: 8,
  },
];


export default function HomePage() {
  // This would eventually be determined by user role
  const userRole: 'pharmacy' | 'medical_rep' = 'pharmacy'; 

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <header className="mb-6">
        <h1 className="text-3xl font-headline text-primary">آخر المستجدات</h1>
        <p className="text-muted-foreground">اكتشف آخر المنشورات والعروض من مندوبي الأدوية.</p>
      </header>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Input type="search" placeholder="ابحث في المنشورات..." className="pr-10" />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
        <Button variant="outline">
          <Filter className="ml-2 h-4 w-4" />
          تصفية
        </Button>
      </div>

      {userRole === 'pharmacy' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPharmacyPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {userRole === 'medical_rep' && (
        <div className="bg-card p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">ملخص أداء مندوب المبيعات</h2>
          <p className="text-muted-foreground">هنا سيتم عرض ملخص لأداء المنشورات أو أحدث طلبات الصيدليات.</p>
          {/* Placeholder content for medical representative */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-muted rounded-md">
              <h3 className="font-semibold">إجمالي المشاهدات</h3>
              <p className="text-2xl text-primary">15,780</p>
            </div>
            <div className="p-4 bg-muted rounded-md">
              <h3 className="font-semibold">التفاعلات هذا الأسبوع</h3>
              <p className="text-2xl text-primary">350</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
