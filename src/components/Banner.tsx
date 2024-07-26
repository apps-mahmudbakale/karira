import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-[1440px] md:px-24 lg:px-8 lg:py-20">
      <div className="py-10 flex flex-col w-full items-center mx-auto bg-primaryBlue   rounded-2xl   max-w-[1255px] sm:py-16">
        <div className="w-full max-w-[801px] flex flex-col gap-y-[8px] justify-center items-center">
          <h1 className="text-white font-bold md:text-[56px] ">
            Ready to Make Money?
          </h1>
          <p className="text-center text-white text-base px-3 md:text-xl ">
            Help people move items with your vehicle. We help you turn every
            trip into a money-making opportunity. The more you move, the more
            you earn.
          </p>
          <Link
            className="w-[233px] mt-8 inline-flex items-center justify-center gap-x-[7px] border border-primaryBlue h-12 px-6 font-medium tracking-wide text-primaryBlue transition duration-200 rounded-lg bg-white focus:shadow-outline focus:outline-none"
            to={`/partner-with-us`}
          >
            Become a Partner
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M20.5 10C20.5 15.52 16.01 20 10.5 20L10.2202 19.9962C4.82942 19.8478 0.5 15.4264 0.5 10C0.5 4.49 4.98 0 10.5 0C16.01 0 20.5 4.49 20.5 10ZM8.52 6C8.23 6.3 8.23 6.77 8.53 7.06L11.48 10L8.53 12.94C8.23 13.23 8.23 13.71 8.52 14C8.82 14.3 9.29 14.3 9.58 14L13.07 10.53C13.21 10.39 13.29 10.2 13.29 10C13.29 9.8 13.21 9.61 13.07 9.47L9.58 6C9.44 5.85 9.25 5.78 9.06 5.78C8.86 5.78 8.67 5.85 8.52 6Z"
                fill="#407BFF"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Banner
