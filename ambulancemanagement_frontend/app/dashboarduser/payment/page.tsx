"use client";

import { useEffect } from "react";

const PaymentModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background Overlay */}
      <div
        className="absolute inset-0  bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-lg p-6 rounded-xl shadow-2xl z-10 max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 opacity-100">
        <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>
        <p className="text-sm text-gray-500 mb-6">
          Choose your preferred payment option
        </p>

        {/* Payment Options */}
        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-black">
            <div className="flex items-center">
              <input
                type="radio"
                name="payment_method"
                className="h-5 w-5"
                defaultChecked
              />
              <span className="ml-4 font-medium">Card Payment</span>
            </div>
            <span className="text-xs font-semibold text-gray-400">VISA</span>
          </label>

          <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-black">
            <input type="radio" name="payment_method" className="h-5 w-5" />
            <span className="ml-4 font-medium">Mobile Banking</span>
          </label>

          <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-black">
            <input type="radio" name="payment_method" className="h-5 w-5" />
            <span className="ml-4 font-medium">Insurance</span>
          </label>

          <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-black">
            <input type="radio" name="payment_method" className="h-5 w-5" />
            <span className="ml-4 font-medium">Cash Payment</span>
          </label>
        </div>

        {/* Card Details */}
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-4">Card Details</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="text"
              placeholder="Name on card"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
              <input
                type="text"
                placeholder="123"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-4 mt-6">
          <button className="w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 transition">
            Confirm Payment
          </button>
          <div className="flex justify-between space-x-4">
            <button className="flex-1 py-3 border border-gray-300 rounded-md hover:bg-gray-100 transition">
              Download Invoice
            </button>
            <button
              className="flex-1 py-3 border border-gray-300 rounded-md hover:bg-gray-100 transition"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
