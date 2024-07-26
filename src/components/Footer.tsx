import Brand from "./Brand";
import Socials from "./Socials";

export const Footer = () => {
  return (
    <div className="px-4 py-8 mx-auto sm:max-w-xl md:py-20 md:max-w-full lg:max-w-[1440px] md:px-24 lg:px-8">
      <div className="flex justify-between lg:pr-10 xl:pr-36">
        <span>
          <Brand />
        </span>
        <div className="flex flex-col gap-y-4 md:gap-y-10">
          <div>
            <p className="font-semibold text-gray-800 ">Email</p>

            <div className="flex flex-col items-start mt-5 space-y-2">
              <p className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500">
                Hello@karria.ng
              </p>
            </div>
          </div>
          <div>
            <p className="font-semibold text-gray-800 ">Phone Number</p>

            <div className="flex flex-col items-start mt-5 space-y-2">
              <p className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500">
                +2349126266015
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-10 row-gap-6 mb-8 items-end sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <div className="mt-6 lg:max-w-[522px]">
            <h1 className="text-xl sm:text-2xl">Get update</h1>
            <p className="text-sm text-gray-800 sm:text-base">
              We are growing fast. Get daily update
            </p>
            <div className="w-full flex flex-col mx-auto mt-6 space-y-8 md:space-y-0 md:flex-row ">
              <input
                id="email"
                type="email"
                className="px-4 h-[56px] text-[#667085] w-full  bg-white border border-[#DDDDDD] rounded-md md:max-w-[340px]   focus:border-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                placeholder="Enter your email address"
              />

              <button className="w-full px-6  h-[56px] text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-[166px] md:mx-4 focus:outline-none bg-primaryBlue rounded-lg ">
                Join now
              </button>
            </div>
          </div>
        </div>
        <div className="space-y-6 text-sm">
          <p className="text-base font-bold tracking-wide text-gray-900">
            Follow us on social media
          </p>
          <div className="flex">
            <Socials />
          </div>
        </div>
        <div>
          <div className="flex items-center mt-1 space-x-3"></div>
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Karria Inc. All rights reserved.
          </p>
        </div>
       
      </div>
    </div>
  );
};
