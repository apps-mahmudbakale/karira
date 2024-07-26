import AuthLeft from "../shared/AuthLeft";
import Logo from "../../../assets/logo.svg";
import MailIcon from "../../../assets/VerifyMail.svg";
const Verify = () => {
  return (
    <div className="w-full flex">
      <div className="w-2/5  flex-row justify-end bg-primaryBlue hidden lg:flex">
        <div className="max-w-[647px] w-full h-screen flex items-center justify-center">
          <AuthLeft />
        </div>
      </div>
      <div className="w-full bg-white px-4 flex flex-col justify-start sm:px-0 lg:w-3/5">
        <div className="max-w-[793px] bg-white flex flex-col items-center justify-center h-screen">
          <div className="max-w-[461px] w-full   py-10 sm:py-12 md:py-[86px] ">
            <div className="w-full space-y-8">
              <div className="flex items-center flex-col justify-center gap-y-10">
                <img src={Logo} alt="" />
                <img src={MailIcon} alt="" />
              </div>
              <div className="">
                <p className=" text-base font-fellix-regular text-grey-00">
                  Please enter the 6 digit code sent to{" "}
                  <span className="text-primaryBlue">
                    Draxler04123@gmail.com
                  </span>
                </p>
              </div>
              <div className="w-full    grid grid-flow-row gap-y-10">
                <div className="flex items-center justify-center gap-x-2 ">
                  {Array.from({ length: 6 }, (_, i) => (
                    <div
                      key={i}
                      className="relative flex flex-col items-center"
                    >
                      <input
                        className="w-12 h-12 peer rounded-lg border border-[#C0C0C0] text-center text-2xl font-fellix-medium focus:outline-primaryBlue focus:bg-[#F7F8FF] sm:w-16 sm:h-16 sm:rounded-2xl"
                        type="text"
                        maxLength={1}
                      />
                      <span className="w-5 h-[2px] absolute bottom-0 -translate-y-2  bg-primaryBlue peer-focus:flex peer-empty:hidden sm:-translate-y-3"></span>
                    </div>
                  ))}
                </div>

                <div className="w-full flex items-center justify-center ">
                  <button
                    className=" bg-primaryBlue text-sm  text-white font-fellix-bold inline-flex items-center justify-center h-12 rounded-xl w-full max-w-[247px] disabled:bg-opacity-[0.5] disabled:cursor-not-allowed shadow-disabled"
                    type="button"
                  >
                    Confirm code
                  </button>
                </div>
                <div className="text-center space-y-5">
                  <h1 className="text-[#041549] font-fellix-medium">
                    Didn’t get the code?
                  </h1>
                  <p className=" text-[#718096] text-base font-fellix-regular inline-flex items-center gap-x-2.5">
                    <span className="w-8 h-8 flex items-center justify-center bg-primaryBlue bg-opacity-50 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="17"
                        viewBox="0 0 18 17"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0.666016 8.36654C0.666016 3.76737 4.39935 0.0332031 8.99935 0.0332031C13.6077 0.0332031 17.3327 3.76737 17.3327 8.36654C17.3327 12.9674 13.6077 16.6999 8.99935 16.6999C4.39935 16.6999 0.666016 12.9674 0.666016 8.36654ZM8.26602 5.2082C8.26602 4.80904 8.59935 4.47487 8.99935 4.47487C9.39935 4.47487 9.72435 4.80904 9.72435 5.2082V8.89154C9.72435 9.29237 9.39935 9.61654 8.99935 9.61654C8.59935 9.61654 8.26602 9.29237 8.26602 8.89154V5.2082ZM9.00768 12.2674C8.59935 12.2674 8.27435 11.934 8.27435 11.534C8.27435 11.134 8.59935 10.809 8.99935 10.809C9.40768 10.809 9.73268 11.134 9.73268 11.534C9.73268 11.934 9.40768 12.2674 9.00768 12.2674Z"
                          fill="#407BFF"
                        />
                      </svg>
                    </span>
                    Resend code in 02:34
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
