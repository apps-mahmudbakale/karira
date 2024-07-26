import AuthLeft from "../shared/AuthLeft";
import Logo from "../../../assets/logo.svg";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  return (
    <div className="w-full flex">
      <div className="w-2/5  flex-row justify-end bg-primaryBlue hidden lg:flex">
        <div className="max-w-[647px] w-full h-screen flex items-center justify-center">
          <AuthLeft />
        </div>
      </div>
      <div className="w-full bg-white px-4 flex flex-col justify-start sm:px-0 lg:w-3/5">
        <div className="max-w-[793px] bg-white flex flex-col items-center justify-center h-screen">
          <div className="max-w-[360px] w-full  py-10 sm:py-12 md:py-[86px] ">
            <div className="w-full ">
              <div className="flex items-center justify-center">
                <img src={Logo} alt="" />
              </div>
              <div className="space-y-3 mt-[46px] text-start">
                <h1 className=" text-xl text-primaryBlue font-fellix-medium sm:text-4xl">
                  Forgot Password
                </h1>
                <p className=" text-base text-grey-500 font-fellix-regular">
                  Enter your email to reset your password.
                </p>
              </div>
              <div className="w-full  mt-3.5 grid grid-flow-row gap-y-5">
                <div className="space-y-[6px]">
                  <label
                    className="block text-sm  font-fellix-regular text-grey-700"
                    htmlFor="email"
                  >
                    Email<span className="text-[#F04438]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter email address"
                    className="w-full border border-grey-300 rounded-lg h-[44px] bg-white text-grey-500 px-[14px] font-fellix-regular outline-none focus:outline-none placeholder:font-fellix-light"
                  />
                </div>

                <Link
                  to={`/u/verify`}
                  className="w-full">
                  <button
                    className=" bg-primaryBlue text-sm text-white font-fellix-bold inline-flex items-center justify-center h-12 rounded-xl w-full disabled:bg-opacity-[0.5] disabled:cursor-not-allowed shadow-disabled"
                    type="button"
                  >
                    Request Reset
                  </button>
                 
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
