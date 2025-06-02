import AuthForm from '@/components/medconnect/auth-form';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';

export default function AuthPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary/10 via-background to-background p-4">
      <Link href="/welcome" className="mb-8">
        <Image 
          src="https://placehold.co/120x120.png" 
          alt="MedConnect Logo" 
          width={100} 
          height={100} 
          className="rounded-full shadow-md hover:opacity-90 transition-opacity"
          data-ai-hint="logo medical"
        />
      </Link>
      <AuthForm />
      <Button asChild variant="outline" className="mt-6">
        <Link href="/admin/dashboard">
          <Shield className="ms-2 h-4 w-4" /> {/* ml-2 to ms-2 */}
          لوحة تحكم المسؤول
        </Link>
      </Button>
       <p className="mt-8 text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} MedConnect. جميع الحقوق محفوظة.
        </p>
    </div>
  );
}
