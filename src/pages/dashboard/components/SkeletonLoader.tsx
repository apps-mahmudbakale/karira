
const SkeletonLoader = () => {
  return (
    <div className="max-w-[1111.776px] pl-2 border border-[#F7F8FF] bg-[#F9FBFC] rounded-3xl py-[22px] flex flex-col gap-y-4 lg:flex-row sm:px-6 md:px-10  lg:justify-between animate-pulse">
      <div className="grid grid-flow-row gap-y-[18px]">
        <div className="h-5 w-24 bg-gray-300 rounded"></div>
        <div className="h-4 w-16 bg-gray-300 rounded"></div>
        <div className="h-4 w-24 bg-gray-300 rounded"></div>
        <div className="h-4 w-24 bg-gray-300 rounded"></div>
      </div>
      <div className="flex flex-col-reverse gap-y-4 md:justify-between md:flex-col">
        <div className="flex flex-row items-center gap-x-4">
          <div className="h-8 w-24 bg-gray-300 rounded"></div>
          <div className="h-8 w-24 bg-gray-300 rounded"></div>
        </div>
        <div className="h-4 w-32 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
