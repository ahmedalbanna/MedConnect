import AuthForm from '@/components/medconnect/auth-form';
import Image from 'next/image';
import Link from 'next/link';

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
       <p className="mt-8 text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} MedConnect. جميع الحقوق محفوظة.
        </p>
    </div>
  );
}
