"use client";

const DriverDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-16 bg-white shadow-lg p-4 flex flex-col items-center justify-start py-6  md:flex">
        <div className="space-y-6">
          {/* Icons and Navigation - placeholders */}
          <div className="w-10 h-10 bg-gray-800 rounded-lg"></div>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 p-4 md:p-8">
        {/* Header */}
        <header className="flex justify-between items-center pb-6 mb-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold flex items-center">
              <span className="w-8 h-8 mr-2 bg-gray-800 rounded-full"></span>
              Ambulance Management
            </h1>
            <nav className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
              <a
                href="#"
                className="font-semibold text-black border-b-2 border-black pb-1"
              >
                Active Trips
              </a>
              <a href="#" className="hover:text-black">
                Navigation
              </a>
              <a href="#" className="hover:text-black">
                Patient Details
              </a>
              <a href="#" className="hover:text-black">
                History
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-green-500 font-semibold text-sm">
              On Duty
            </span>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div>
                <p className="font-semibold text-sm">John Cooper</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current Trip Panel */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-600 font-bold text-xs rounded-full">
                EN ROUTE
              </span>
              <p className="text-sm text-gray-500">ETA: 8 mins</p>
            </div>
            <h2 className="text-2xl font-bold mb-4">Current Trip</h2>

            <div className="space-y-4">
              {/* Pickup Location */}
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full">
                  <span className="text-sm text-gray-600">📍</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Pickup Location</p>
                  <p className="text-sm text-gray-500">
                    1234 Emergency Ave, Downtown
                  </p>
                </div>
              </div>

              {/* Destination */}
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full">
                  <span className="text-sm text-gray-600">➡️</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Destination</p>
                  <p className="text-sm text-gray-500">
                    Central Hospital Emergency Department
                  </p>
                  <p className="text-sm text-gray-500">
                    5678 Medical Center Blvd
                  </p>
                </div>
              </div>
            </div>

            <div className="flex mt-6 space-x-4">
              <button className="flex-1 py-3 bg-black text-white rounded-md font-semibold hover:bg-gray-800 transition duration-200">
                Start Trip
              </button>
              <button className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-md font-semibold hover:bg-gray-300 transition duration-200">
                View Patient Details
              </button>
            </div>
          </div>

          {/* Patient Information Panel */}
          <div className="bg-white p-6 rounded-lg shadow-md h-full">
            <h2 className="text-xl font-bold mb-4">Patient Information</h2>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-gray-800">Patient Name</p>
                <p className="text-sm text-gray-500">Sarah Johnson</p>
              </div>
              <div>
                <p className="font-medium text-gray-800">Age</p>
                <p className="text-sm text-gray-500">45 years</p>
              </div>
              <div>
                <p className="font-medium text-gray-800">Emergency Notes</p>
                <p className="text-sm text-gray-500">
                  Chest pain and difficulty breathing. History of cardiac
                  issues.
                </p>
              </div>
              <div className="flex items-center text-red-600 font-medium space-x-2">
                <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                <p>Requires immediate attention</p>
              </div>
              <div>
                <p className="font-medium text-gray-800">Emergency Contact</p>
                <p className="text-sm text-gray-500">
                  Michael Johnson (Spouse)
                </p>
                <p className="text-sm text-gray-500">+1(555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
