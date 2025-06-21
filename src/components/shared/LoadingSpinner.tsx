import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex absolute top-0 flex-col items-center z-9999999 justify-center h-screen w-full bg-white">
      <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
      <p className="text-lg font-medium text-gray-700">Loading...</p>
      {/* localization */}
    </div>
  );
};

export default LoadingSpinner;
