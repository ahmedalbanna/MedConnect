
"use client";

import PostCard from '@/components/medconnect/post-card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

// Mock data for posts created by the current medical rep
const mockMyPosts = [
  {
    id: 'mypost1',
    repName: 'أحمد خليل', // Assuming this is the current user
    repAvatarUrl: 'https://placehold.co/40x40.png?text=AK',
    companyName: 'شركة الدواء المبتكر',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 day ago
    title: 'عرض خاص على كريم DermaHeal للعناية بالبشرة',
    content: 'يسرنا تقديم عرض حصري على كريم DermaHeal الفعال لمعالجة مشاكل البشرة. خصم 15% لجميع الصيدليات حتى نهاية الشهر. للمزيد من التفاصيل، يرجى مراجعة المواد الترويجية.',
    imageUrl: 'https://placehold.co/600x400.png',
    likesCount: 75,
    commentsCount: 8,
  },
  {
    id: 'mypost2',
    repName: 'أحمد خليل',
    repAvatarUrl: 'https://placehold.co/40x40.png?text=AK',
    companyName: 'شركة الدواء المبتكر',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
    title: 'دراسة جديدة تؤكد فعالية VitaMax في دعم المناعة',
    content: 'نشارككم أحدث الدراسات التي تظهر النتائج الإيجابية لمكمل VitaMax في تعزيز الجهاز المناعي. المواد العلمية متوفرة عند الطلب.',
    // No image for this post
    likesCount: 110,
    commentsCount: 12,
  },
];

export default function MyPostsPage() {
  // In a real app, these would be fetched for the logged-in medical rep
  const posts = mockMyPosts;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <header className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-headline text-primary">منشوراتي</h1>
          <p className="text-muted-foreground">إدارة وعرض المنشورات التي قمت بإنشائها.</p>
        </div>
        <Button asChild className="mt-4 sm:mt-0 bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href="/create-post">
            <PlusCircle className="ml-2 h-5 w-5" />
            إنشاء منشور جديد
          </Link>
        </Button>
      </header>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="relative group">
              <PostCard post={post} />
              <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2 space-x-reverse bg-black/50 p-1.5 rounded-md">
                <Button variant="outline" size="icon" className="h-7 w-7 border-primary text-primary hover:bg-primary/10">
                  <Edit size={14} />
                </Button>
                <Button variant="outline" size="icon" className="h-7 w-7 border-destructive text-destructive hover:bg-destructive/10">
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <FileText size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-lg text-muted-foreground mb-2">لم تقم بإنشاء أي منشورات بعد.</p>
          <Button asChild>
            <Link href="/create-post">ابدأ بإنشاء أول منشور لك</Link>
          </Button>
        </div>
      )}
    </div>
  );
}


    