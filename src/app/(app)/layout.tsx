
import BottomNav from '@/components/medconnect/bottom-nav';
import MainSidebar from '@/components/medconnect/main-sidebar';
import { RoleProvider } from '@/contexts/role-context';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleProvider>
      <div className="flex min-h-screen">
        {/* MainSidebar already uses fixed start-0 for RTL */}
        <MainSidebar /> 
         {/* Adjust margin for RTL: if sidebar is on the right (end), main content needs margin-inline-start */}
        <div className="flex-1 md:ms-64"> 
          <main className="pb-16 md:pb-0"> 
            {children}
          </main>
        </div>
        <BottomNav />
      </div>
    </RoleProvider>
  );
}
