const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#162C51] mx-auto"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;