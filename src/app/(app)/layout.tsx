
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
        <MainSidebar />
        <div className="flex-1 md:mr-64"> {/* Add margin for desktop sidebar */}
          <main className="pb-16 md:pb-0"> {/* Add padding for mobile bottom nav */}
            {children}
          </main>
        </div>
        <BottomNav />
      </div>
    </RoleProvider>
  );
}
