"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import PaymentModal from "./payment/page";

const Dashboard = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentBooking, setCurrentBooking] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [recentBookings] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [paymentHistory] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedAmbulance, setSelectedAmbulance] = useState<any>(null);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [estimates, setEstimates] = useState({ fare: 0, time: 0, distance: 0 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  // On mount, load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Mock recent bookings and payment history (replace with real API calls)

  // 🚑 Ambulance Types (these IDs should match Fare_ID in Oracle table)
  const ambulanceTypes = [
    {
      id: 1,
      name: "Basic Ambulance",
      description: "For non-critical transport",
    },
    { id: 2, name: "ICU Ambulance", description: "Full intensive care unit" },
    {
      id: 3,
      name: "Cardiac Ambulance",
      description: "Specialized cardiac care",
    },
    {
      id: 4,
      name: "Neonatal Ambulance",
      description: "Newborn intensive care",
    },
  ];

  // Simulate fetching data for Current Booking (empty Recent/Payment is ok)
  useEffect(() => {
    const fetchBookingData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      // const mockCurrentBooking = {
      //   id: 1001,
      //   status: "On Trip",
      //   eta: "8 minutes",
      //   ambulanceType: "ICU Ambulance",
      //   ambulanceNumber: "ABC 123",
      //   driver: { name: "John Smith", experience: "5 years", rating: 4.8 },
      //   pickup: "123 Main St",
      //   dropoff: "City General Hospital",
      //   fare: 150,
      // };

      // setCurrentBooking(mockCurrentBooking);
    };

    fetchBookingData();
  }, []);

  // 👉 Handle ambulance selection (fetch fare + time from backend)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAmbulanceSelect = async (ambulance: any) => {
    setSelectedAmbulance(ambulance);

    try {
      const res = await fetch("http://localhost:5000/auth/estimates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ambulanceTypeId: ambulance.id,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setEstimates({
          fare: data.fare,
          time: data.time,
          distance: data.distance,
        });
      } else {
        alert(data.error || "Failed to get estimate");
      }
    } catch (err) {
      console.error(err);
      alert("Server error fetching estimate");
    }
  };

  // Booking request (only shows in UI for now)
  const handleBookingRequest = async () => {
    if (!selectedAmbulance || !pickupLocation) {
      alert("Please select an ambulance type and enter pickup location");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/auth/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pickup: pickupLocation,
          dropoff: dropoffLocation,
          distanceKm: estimates.distance,
          estimatedFare: estimates.fare,
          actualFare: estimates.fare,
          userId: user.USER_ID,
          ambulanceId: selectedAmbulance.id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Booking failed");
        return;
      }

      // Update current booking state with response
      setCurrentBooking({
        id: data.bookingId,
        status: "CONFIRMED",
        eta: "" + estimates.time + " minutes",
        ambulanceType: selectedAmbulance.name,
        ambulanceNumber: selectedAmbulance.id,
        driver: { name: "Imran Hossain", experience: "5 YEARS", rating: 4.5 },
        pickup: pickupLocation,
        dropoff: dropoffLocation,
        fare: estimates.fare,
      });

      await Swal.fire({
        icon: "success",
        title:
          "Ambulance request submitted! We're finding the nearest available ambulance.",
        timer: 1500,
        showConfirmButton: false,
        willClose: () => {
          setSelectedAmbulance(null);
          setPickupLocation("");
          setDropoffLocation("");
          setEstimates({ fare: 0, time: 0, distance: 0 });
        },
      });
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again.");
    }
  };

  return (
    <>
      {/* Dashboard Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          {/* Request Ambulance Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Request Ambulance</h2>
            <p className="text-sm text-gray-500 mb-6">
              Fill in the details to book an ambulance
            </p>

            <div className="space-y-4">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  📍
                </div>
                <input
                  type="text"
                  placeholder="Pickup Location"
                  className="w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                />
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  🚑
                </div>
                <input
                  type="text"
                  placeholder="Drop-off Location"
                  className="w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  value={dropoffLocation}
                  onChange={(e) => setDropoffLocation(e.target.value)}
                />
              </div>
            </div>

            <h3 className="text-lg font-bold mt-6 mb-4">
              Select Ambulance Type
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {ambulanceTypes.map((ambulance) => (
                <div
                  key={ambulance.id}
                  className={`border p-4 rounded-lg cursor-pointer transition-all ${
                    selectedAmbulance?.id === ambulance.id
                      ? "border-black bg-blue-50"
                      : "border-gray-300 hover:border-black"
                  }`}
                  onClick={() => handleAmbulanceSelect(ambulance)}
                >
                  <h4 className="font-semibold">{ambulance.name}</h4>
                  <p className="text-sm text-gray-500">
                    {ambulance.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-6">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-500">
                  Estimated Fare
                </p>
                <p className="text-2xl font-bold mt-1">{estimates.fare}.00</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-500">
                  Estimated Time
                </p>
                <p className="text-2xl font-bold mt-1">{estimates.time} min</p>
              </div>
            </div>

            <button
              className="w-full py-3 bg-black text-white rounded-md font-semibold mt-6 hover:bg-gray-800 transition-colors"
              onClick={handleBookingRequest}
            >
              Request Now
            </button>
          </div>

          {/* Live Location Map */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Live Location</h2>
            <div className="bg-gray-200 h-96 rounded-md overflow-hidden flex items-center justify-center">
              {currentBooking ? (
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg">Tracking Ambulance</h3>
                  <p className="text-gray-600 mt-2">
                    {currentBooking.ambulanceType} -{" "}
                    {currentBooking.ambulanceNumber}
                  </p>
                  <p className="text-gray-600">ETA: {currentBooking.eta}</p>
                </div>
              ) : (
                <p className="text-gray-500">
                  No active trips. Book an ambulance to see live tracking.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-1 space-y-6">
          {/* Current Booking */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Current Booking</h2>
            {currentBooking ? (
              <>
                <div className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
                  <span className="text-sm font-medium">
                    {currentBooking.status}
                  </span>
                  <span className="text-sm text-gray-500">
                    ETA: {currentBooking.eta}
                  </span>
                </div>

                <p className="mt-4 text-sm text-gray-600">
                  {currentBooking.ambulanceType} -{" "}
                  {currentBooking.ambulanceNumber}
                </p>

                <h3 className="font-bold mt-4">Driver Details</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {currentBooking.driver.name}
                </p>
                <p className="text-xs text-gray-500">
                  {currentBooking.driver.experience} experience
                </p>
                {currentBooking.driver.rating > 0 && (
                  <p className="text-xs text-yellow-500 mt-1">
                    ★ {currentBooking.driver.rating}/5.0
                  </p>
                )}

                <div className="mt-4 pt-4 border-t">
                  <h3 className="font-bold">Trip Details</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">From:</span>{" "}
                    {currentBooking.pickup}
                  </p>
                  {currentBooking.dropoff && (
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">To:</span>{" "}
                      {currentBooking.dropoff}
                    </p>
                  )}
                  <p className="text-sm text-gray-600 mt-2">
                    <span className="font-medium">Fare:</span> $
                    {currentBooking.fare}
                  </p>

                  {/* Make Payment Button */}
                  <div
                    className="mt-4 w-full py-2 bg-black text-white rounded-md hover:bg-gray-800 cursor-pointer text-center"
                    onClick={() => setIsPaymentOpen(true)}
                  >
                    Make Payment
                  </div>

                  {/* Payment Modal */}
                  <PaymentModal
                    isOpen={isPaymentOpen}
                    onClose={() => setIsPaymentOpen(false)}
                  />
                </div>
              </>
            ) : (
              <p className="text-gray-500 py-4">No current bookings</p>
            )}
          </div>

          {/* Recent Bookings */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Recent Bookings</h2>
            {recentBookings.length > 0 ? (
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-3 border rounded-md"
                  >
                    <div>
                      <p className="font-medium">{booking.date}</p>
                      <p className="text-sm text-gray-500">
                        {booking.ambulanceType}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${booking.fare}.00</p>
                      <p className="text-sm text-green-600">{booking.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 py-4">No recent bookings</p>
            )}
          </div>

          {/* Payment History */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Payment History</h2>
            {paymentHistory.length > 0 ? (
              <div className="space-y-4">
                {paymentHistory.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between p-3 border rounded-md"
                  >
                    <div>
                      <p className="font-medium">{payment.method}</p>
                      <p className="text-sm text-gray-500">{payment.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${payment.amount}.00</p>
                      <p className="text-sm text-green-600">{payment.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 py-4">No payment history</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
