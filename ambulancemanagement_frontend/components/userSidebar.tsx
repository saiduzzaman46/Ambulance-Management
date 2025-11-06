export const UserSidebar = () => {
  return (
    <aside className="w-16 bg-white shadow-lg p-4 flex flex-col items-center justify-between py-6 hidden md:flex">
      <div className="space-y-6">
        <div className="w-10 h-10 bg-black rounded-lg"></div>
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
      </div>
      <div className="space-y-6">
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
      </div>
    </aside>
  );
};
