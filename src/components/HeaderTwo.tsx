import { Link } from "react-router-dom";
import Vector from "../assets/Vector.png";
export const HeaderTwo = () => {
  return (
    <div className="relative">
      <img
        src={Vector}
        className="absolute object-cover object-center w-full h-full"
        alt=""
      />
      <div className="relative bg-[#232323] bg-opacity-[0.1] md:py-20">
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full  flex flex-col items-center justify-center text-center">
              <h2 className="w-full mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
                Make extra money as a{" "}
                <span className="text-primaryBlue">Partner</span>
              </h2>
              <p className="max-w-xl mb-4 text-base text-gray-400 md:text-lg">
                Earn Money Moving Items With Your Vehicle
              </p>
              <Link
                className="w-[233px] mt-8 inline-flex items-center justify-center gap-x-[7px] bg-primaryBlue h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded-lg  focus:shadow-outline focus:outline-none"
                to={`/partner-with-us`}
              >
                Become a Partner
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M20 10C20 15.52 15.51 20 10 20L9.72023 19.9962C4.32942 19.8478 0 15.4264 0 10C0 4.49 4.48 0 10 0C15.51 0 20 4.49 20 10ZM8.02 6C7.73 6.3 7.73 6.77 8.03 7.06L10.98 10L8.03 12.94C7.73 13.23 7.73 13.71 8.02 14C8.32 14.3 8.79 14.3 9.08 14L12.57 10.53C12.71 10.39 12.79 10.2 12.79 10C12.79 9.8 12.71 9.61 12.57 9.47L9.08 6C8.94 5.85 8.75 5.78 8.56 5.78C8.36 5.78 8.17 5.85 8.02 6Z"
                    fill="white"
                  />
                </svg>
              </Link>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
