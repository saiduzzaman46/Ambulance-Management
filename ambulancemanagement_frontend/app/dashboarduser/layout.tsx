import { UserHeader } from "@/components/userHeader";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}

        {/* Main Content Area */}
        <div className="flex-1 p-4 md:p-8">
          {/* Header */}
          <UserHeader />
          <main>{children}</main>;
        </div>
      </div>
    </>
  );
}
