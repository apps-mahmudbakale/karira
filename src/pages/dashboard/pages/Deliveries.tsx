import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import Greetings from "../../../components/Greetings";
import { useGetDeliveriesQuery } from "../../../services/dashboard/dashboard";
import CreateDelivery from "../modals/CreateDelivery";

 

const Deliveries = () => {
  let [isOpen, setIsOpen] = useState<boolean>(false);
  const { data } = useGetDeliveriesQuery();
  


  const toggleModal = () => setIsOpen((prev) => !prev);
  return (
    <>
      <div className="py-10 sm:py-16 md:py-20">
        <div className="text-center ">
          <Greetings />
        </div>
        <div className="max-w-[1198px] mx-auto space-y-4 mt-8  sm:mt-[46px] lg:px-0">
          <div className="flex items-center justify-between px-4 xl:px-0">
            <h1 className="text-lg text-solid-black font-fellix-semibold sm:text-xl">
              My Deliveries
            </h1>
            <Link to="/dashboard/new-delivery">
              {
                <button
                  className={`w-[180px] shadow-active-shadow bg-primaryBlue text-white font-fellix-semibold text-base h-12 rounded-lg ${
                    !data?.[0]?.length && "hidden"
                  }`}
                >
                  Create +
                </button>
             }
            </Link>
            {/* <button
              onClick={toggleModal}
              className={`w-[180px] shadow-active-shadow bg-primaryBlue text-white font-fellix-semibold text-base h-12 rounded-lg ${
                !deliveries.length && "hidden"
              }`}
            >
              Create +
            </button> */}
          </div>
          <div className="w-full px-5  shadow-towing-card-shadow border border-[#F5F5FA]  py-5 rounded-2xl bg-white sm:px-6 sm:py-[28.32px]">
            <div className="w-full h-[44px] border-b border-[#EDEFF5] flex flex-row gap-x-5 sm:gap-x-8">
              <NavLink to={`/dashboard/`}>
                {({ isActive }) => (
                  <>
                    <div
                      className={` text-base w-[117px]  flex h-full relative transition-all ease-in-out duration-200 ${
                        isActive
                          ? "text-primaryBlue font-fellix-bold"
                          : " text-[#718096] font-fellix-medium"
                      }`}
                    >
                      <span className="px-1">Single Delivery</span>
                      <span
                        className={`absolute bottom-0 w-full flex h-[3px] rounded-2xl transition-all ease-in-out duration-200 ${
                          isActive ? "bg-primaryBlue" : "bg-transparent"
                        }`}
                      ></span>
                    </div>
                  </>
                )}
              </NavLink>
              <NavLink to={`past-delivery`}>
                {({ isActive }) => (
                  <>
                    <div
                      className={` text-base w-[117px]  flex h-full relative transition-all ease-in-out duration-200 ${
                        isActive
                          ? "text-primaryBlue font-fellix-bold"
                          : " text-[#718096] font-fellix-medium"
                      }`}
                    >
                      <span className="px-1">Past Delivery</span>
                      <span
                        className={`absolute bottom-0 w-full flex h-[3px] rounded-2xl transition-all ease-in-out duration-200 ${
                          isActive ? "bg-primaryBlue" : "bg-transparent"
                        }`}
                      ></span>
                    </div>
                  </>
                )}
              </NavLink>
            </div>
            <div className="">
              <Outlet />
            </div>
          </div>
        </div>
      </div>

      {/* modal section */}
      <CreateDelivery isOpen={isOpen} closeModal={toggleModal} />
    </>
  );
};

export default Deliveries;
