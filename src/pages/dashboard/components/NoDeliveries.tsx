import { useState } from "react";
import { Link } from "react-router-dom";
import NoItems from "../../../assets/emptystate.svg"
import CreateDelivery from "../modals/CreateDelivery";




const NoDeliveries = () => {
 
  let [isOpen, setIsOpen] = useState<boolean>(false);
  
  const toggleModal = () => setIsOpen((prev) => !prev);


  return (
    <>
      <div className="max-w-[338px] mx-auto gap-y-5 flex flex-col items-center justify-center sm:gap-y-[25px]">
        {/* import NoItems from "../../../assets/emptystate.svg" */}
        <img
          src={NoItems}
          alt=""
          className="w-full max-w-[123px] object-cover object-center"
        />
        <div className="text-center space-y-2">
          <h1 className="text-center text-solid-black font-fellix-medium text-base ">
            You don’t have any delivery yet!
          </h1>
          <p className=" text-grey-00 text-sm font-fellix-regular ">
            Create your first delivery by clicking the button below
          </p>
        </div>
        <Link to="/dashboard/new-delivery">
          <button className="w-[180px] shadow-active-shadow bg-primaryBlue text-white font-fellix-semibold text-base h-12 rounded-lg ">
            Create +
          </button>
        </Link>
      </div>

      {/* modals section */}
      <CreateDelivery isOpen={isOpen} closeModal={toggleModal} />
    </>
  );
}

export default NoDeliveries