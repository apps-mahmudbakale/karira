import { motion } from "framer-motion";
import PhoneNumber from "./PhoneNumber";

interface Props {
  values: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: any;
}

const ContactInfo = ({ values, handleChange, errors }: Props) => {
  return (
      <div className="w-full max-w-[537px] flex flex-col gap-y-5 md:gap-y-[34px]">
        <div className="flex flex-col gap-y-4 sm:flex-row sm:gap-x-5 md:gap-x-[38px]">
          <div className="flex w-full flex-col gap-y-[10px]">
            <label
                className="text text-deepBlack font-fellix-regular text-base"
                htmlFor="firstname"
            >
              First name<span className="text-[#F04438]">*</span>
            </label>
            <input
                type="text"
                name="firstname"
                id="firstname"
                value={values.firstname}
                onChange={handleChange}
                placeholder="First name"
                className="w-full py-3 rounded-lg text-primaryBlack font-fellix-regular bg-[#FAFAFC] border border-[#DDD] px-4 outline-none placeholder:text-grey-00 focus:border-primaryBlue"
            />
            {errors.firsname && (
                <motion.div
                    initial={{ opacity: 0, y: "-10px" }}
                    animate={{ opacity: 1, y: "0px" }}
                    exit={{ opacity: 0, y: "-10px" }}
                    className="text-red-500 text-sm tracking-wider mt-1 font-fellix-regular"
                >
                  {errors.firstname}
                </motion.div>
            )}
          </div>
          <div className="flex w-full flex-col gap-y-[10px]">
            <label
                className="text text-deepBlack font-fellix-regular text-base"
                htmlFor="lastname"
            >
              Last name<span className="text-[#F04438]">*</span>
            </label>
            <input
                type="text"
                name="lastname"
                id="lastname"
                value={values.lastname}
                onChange={handleChange}
                placeholder="Last name"
                className="w-full py-3 rounded-lg text-primaryBlack font-fellix-regular bg-[#FAFAFC] border border-[#DDD] px-4 outline-none placeholder:text-grey-00 focus:border-primaryBlue"
            />
            {errors.lastname && (
                <motion.div
                    initial={{ opacity: 0, y: "-10px" }}
                    animate={{ opacity: 1, y: "0px" }}
                    exit={{ opacity: 0, y: "-10px" }}
                    className="text-red-500 text-sm tracking-wider mt-1 font-fellix-regular"
                >
                  {errors.lastname}
                </motion.div>
            )}
          </div>
        </div>
        <div className="flex w-full flex-col gap-y-[10px]">
          <label className="text-[#333] text-base" htmlFor="email">
            Email<span className="text-[#F04438]">*</span>
          </label>
          <input
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full py-3 rounded-lg bg-[#FAFAFC] border border-[#DDD] px-4 outline-none focus:border-primaryBlue"
          />
          {errors.email && (
              <motion.div
                  initial={{ opacity: 0, y: "-10px" }}
                  animate={{ opacity: 1, y: "0px" }}
                  exit={{ opacity: 0, y: "-10px" }}
                  className="text-red-500 text-sm tracking-wider mt-1 font-fellix-regular"
              >
                {errors.email}
              </motion.div>
          )}
        </div>
        <div className="flex w-full flex-col gap-y-[10px]">
          <label className="text-[#333] text-base" htmlFor="phone_no">
            Phone Number<span className="text-[#F04438]">*</span>
          </label>
          <PhoneNumber value={values.phone} handleChange={handleChange} fieldName="phone" />
        </div>
        <div className="w-full">
          <h1 className="text-[18px] font-medium md:text-xl">
            Receivers Information
          </h1>
          <div className="w-full max-w-[537px] mt-4 flex flex-col gap-y-5 md:mt-8 md:gap-y-[34px]">
            <div className="flex w-full flex-col gap-y-[10px]">
              <label className="text-[#333] text-base" htmlFor="full_name">
                Full name<span className="text-[#F04438]">*</span>
              </label>
              <input
                  type="text"
                  name="receiverName"
                  id="full_name"
                  value={values.receiverName}
                  onChange={handleChange}
                  placeholder="Full name"
                  className="w-full py-3 rounded-lg bg-[#FAFAFC] border border-[#DDD] px-4 outline-none focus:border-primaryBlue"
              />
              {errors.receiverName && (
                  <motion.div
                      initial={{ opacity: 0, y: "-10px" }}
                      animate={{ opacity: 1, y: "0px" }}
                      exit={{ opacity: 0, y: "-10px" }}
                      className="text-red-500 text-sm tracking-wider mt-1 font-fellix-regular"
                  >
                    {errors.receiverName}
                  </motion.div>
              )}
            </div>
            <div className="flex w-full flex-col gap-y-[10px]">
              <label className="text-[#333] text-base" htmlFor="receiver_phone">
                Phone Number<span className="text-[#F04438]">*</span>
              </label>
              <PhoneNumber value={values.receiverPhone} handleChange={handleChange} fieldName="receiverPhone" />
            </div>
          </div>
        </div>
      </div>
  );
};

export default ContactInfo;
