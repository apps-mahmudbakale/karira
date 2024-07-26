import { BsCheck } from "react-icons/bs";

type Step = {
  step: number;
  is_step2_success: boolean;
};

const StepButtons = ({ step}: Step) => {
  return (
    <div className="flex items-center">
      <button
        className={`font-fellix-medium text-sm transition-all ease-in-out duration-200 px-5 h-12 rounded-2xl inline-flex items-center justify-center gap-x-4 text-primaryBlue border  border-primaryBlue`}
      >
        <span
          className={`w-8 h-8 rounded-full flex items-center justify-center border  text-sm transition-all ease-in-out duration-200 border-primaryBlue ${
            step === 1 ? " text-primaryBlue " : "bg-primaryBlue text-white"
          }`}
        >
          {step === 1 ? (
            "1"
          ) : (
            <>
              <BsCheck size={22} />
            </>
          )}
        </span>
        Vehicle
      </button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="32"
        viewBox="0 0 50 32"
        fill="none"
      >
        <line
          x1="13.5"
          y1="15.5"
          x2="36.5"
          y2="15.5"
          stroke="#B1B5C3"
          stroke-linecap="round"
          stroke-dasharray="2 4"
        />
      </svg>

      <button
        className={` font-fellix-regular text-sm transition-all ease-in-out duration-200 px-5 h-12 rounded-2xl inline-flex items-center justify-center gap-x-4  ${
          step === 2
            ? "text-primaryBlue border  border-primaryBlue"
            : "text-secondaryGray"
        }`}
      >
        <span
          className={`w-8 h-8 rounded-full flex items-center justify-center border  text-sm transition-all ease-in-out duration-200 ${
            step === 2 ? " border-primaryBlue" : "border-[#DDD]"
          }`}
        >
          2
        </span>
        Delivery informaton
      </button>
    </div>
  );
};

export default StepButtons;
