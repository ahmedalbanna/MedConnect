import AdminSidebarWrapper from '@/components/admin/admin-sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-muted/40">
      {/* AdminSidebarWrapper already uses side="right" which is end in RTL context */}
      <AdminSidebarWrapper /> 
      {/* Adjust margin for RTL: if sidebar is on the right (end), main content needs margin-start */}
      <div className="flex-1 md:ms-[var(--sidebar-width-icon)] group-data-[sidebar-state=expanded]/sidebar-wrapper:md:ms-[var(--sidebar-width)] transition-[margin-inline-start] duration-300 ease-in-out">
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
