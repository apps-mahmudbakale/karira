import Image_one from '../assets/Businessdeal.png';
import Image_two from '../assets/Telecommuting.png';
import {Link} from "react-router-dom";
import React from "react";

const GetStarted = () => {
    return (
        <>
            <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-[1440px] md:px-24 lg:px-8 lg:py-20">
                <div
                    className="py-10 flex flex-col w-full items-center mx-auto rounded-2xl border border-[#D5E0D5] max-w-[1045px] sm:py-16">
                    <h1 className="text-xl font-bold text-center px-4 sm:px-0 md:text-4xl">
                        Choose from our range of services
                    </h1>
                    <div
                        className="w-full max-w-[718px] mt-10  px-4 flex flex-col gap-8 items-center sm:px-0 md:mt-[67px] lg:flex-row">

                        <Link to={`/services/towing`} className={`w-full cursor-pointer border-[2px] relative max-w-[343px] h-[212px] py-4 pb-3 flex flex-col justify-between rounded-lg  pl-12 transition-colors ease-in-out duration-200`}>
                            <span
                                className="w-[80.5px] h-[80.5px] bg-primaryBlue flex items-center p-1 justify-center rounded-full bg-opacity-[0.1]">
                              <img src={Image_one} alt="Business"/>
                            </span>
                            <h2 className="text-[18px] font-medium text-[#263238] sm:text-[24px]">
                                Car Towing
                            </h2>
                        </Link>
                        <Link to={`/services/hauling`} className={`w-full cursor-pointer border-[2px] relative max-w-[343px] h-[212px] py-4 pb-3 flex flex-col justify-between rounded-lg  pl-12 transition-colors ease-in-out duration-200`}>
                            <span
                                className="w-[80.5px] h-[80.5px] bg-primaryBlue flex items-center p-1 justify-center rounded-full bg-opacity-[0.1]">
                              <img src={Image_one} alt="Business"/>
                            </span>
                            <h2 className="text-[18px] font-medium text-[#263238] sm:text-[24px]">
                                Haulage
                            </h2>
                        </Link>
                        <Link to={`/services/relocation`} className={`w-full cursor-pointer border-[2px] relative max-w-[343px] h-[212px] py-4 pb-3 flex flex-col justify-between rounded-lg  pl-12 transition-colors ease-in-out duration-200`}>
                            <span
                                className="w-[80.5px] h-[80.5px] bg-primaryBlue flex items-center p-1 justify-center rounded-full bg-opacity-[0.1]">
                              <img src={Image_one} alt="Business"/>
                            </span>
                            <h2 className="text-[18px] font-medium text-[#263238] sm:text-[24px]">
                                Relocation
                            </h2>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GetStarted
