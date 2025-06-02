import AdminSidebarWrapper from '@/components/admin/admin-sidebar';
import { RoleProvider } from '@/contexts/role-context';
import BottomNav from '@/components/medconnect/bottom-nav';
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleProvider>
      <div className="flex min-h-screen bg-muted/40">
        <AdminSidebarWrapper /> 
        <div className="flex flex-1 flex-col md:ms-[var(--sidebar-width-icon)] group-data-[sidebar-state=expanded]/sidebar-wrapper:md:ms-[var(--sidebar-width)] transition-[margin-inline-start] duration-300 ease-in-out overflow-y-auto">
          <main className="p-4 sm:p-6 lg:p-8 w-full flex flex-col flex-1">
            {children}
          </main>
        </div>
        {/* BottomNav is hidden on md+ screens, typically not used in admin context on desktop */}
        {/* <BottomNav /> */}
      </div>
    </RoleProvider>
    
  );
}
