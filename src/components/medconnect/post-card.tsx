import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ThumbsUp, MessageCircle, Share2 } from 'lucide-react';

interface PostCardProps {
  post: {
    id: string;
    repName: string;
    repAvatarUrl?: string;
    companyName: string;
    createdAt: string; // Or Date object
    title: string;
    content: string;
    imageUrl?: string;
    likesCount: number;
    commentsCount: number;
  };
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center space-x-3 space-x-reverse p-4 bg-muted/50">
        <Avatar>
          <AvatarImage src={post.repAvatarUrl || "https://placehold.co/40x40.png"} alt={post.repName} data-ai-hint="medical representative" />
          <AvatarFallback>{post.repName.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="text-end">
          <p className="font-semibold text-sm">{post.repName}</p>
          <p className="text-xs text-muted-foreground">{post.companyName} &middot; {new Date(post.createdAt).toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
        </div>
      </CardHeader>
      {post.imageUrl && (
        <div className="relative w-full h-60">
          <Image 
            src={post.imageUrl} 
            alt={post.title} 
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{objectFit: "cover"}}
            data-ai-hint="product medical" 
          />
        </div>
      )}
      <CardContent className="p-4">
        <CardTitle className="text-lg font-headline mb-2">{post.title}</CardTitle>
        <p className="text-sm text-foreground leading-relaxed line-clamp-4">
          {post.content}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 border-t">
        <div className="flex space-x-4 space-x-reverse text-muted-foreground">
          <Button variant="ghost" size="sm" className="flex items-center">
            <ThumbsUp className="ms-1.5 h-4 w-4" /> {post.likesCount}
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center">
            <MessageCircle className="ms-1.5 h-4 w-4" /> {post.commentsCount}
          </Button>
        </div>
        <Button variant="ghost" size="sm">
          <Share2 className="ms-1.5 h-4 w-4" /> مشاركة
        </Button>
      </CardFooter>
    </Card>
  );
}
