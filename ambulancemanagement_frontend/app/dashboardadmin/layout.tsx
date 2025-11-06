import { AdminHeader } from "@/components/adminHeader";
import { AdminSidebar } from "@/components/adminSidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <AdminSidebar />
        {/* Main Content Area */}
        <div className="flex-1 p-6 md:p-8">
          {/* Header */}

          <AdminHeader />

          {/* KPI Cards */}

          {children}
        </div>
      </div>
    </>
  );
}
