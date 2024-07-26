import { motion } from "framer-motion";
import PhoneNumber from "../../../components/PhoneNumber";

type ComponentProps = {
  formik: any;

};

const Contact = ({ formik }: ComponentProps) => {
  
  return (
    <div className="w-full max-w-[537px] flex flex-col gap-y-5 md:gap-y-[34px]">
      <div className="flex flex-col gap-y-4 sm:flex-row sm:gap-x-5 md:gap-x-[38px]">
        <div className="flex w-full flex-col gap-y-[10px]">
          <label
            className="text text-deepBlack font-fellix-regular text-base"
            htmlFor="f_name"
          >
            First name
          </label>
          <input
            type="text"
            name="f_name"
            id="f_name"
            {...formik.getFieldProps("f_name")}
            placeholder="First name"
            className="w-full py-3 rounded-lg text-primaryBlack font-fellix-regular bg-[#FAFAFC] border border-[#DDD] px-4 outline-none placeholder:text-grey-00 focus:border-primaryBlue"
          />
          {formik.touched.f_name && formik.errors.f_name ? (
            <motion.div
              initial={{ opacity: 0, y: "-10px" }}
              animate={{ opacity: 1, y: "0px" }}
              exit={{ opacity: 0, y: "-10px" }}
              className="text-red-500 text-sm tracking-wider mt-1 font-fellix-regular"
            >
              {formik.errors.f_name}
            </motion.div>
          ) : null}
        </div>
        <div className="flex w-full flex-col gap-y-[10px]">
          <label
            className="text text-deepBlack font-fellix-regular text-base"
            htmlFor="l_name"
          >
            Last name
          </label>
          <input
            type="text"
            name="l_name"
            id="l_name"
            {...formik.getFieldProps("l_name")}
            placeholder="Last name"
            className="w-full py-3 rounded-lg text-primaryBlack font-fellix-regular bg-[#FAFAFC] border border-[#DDD] px-4 outline-none placeholder:text-grey-00 focus:border-primaryBlue"
          />
        </div>
      </div>
      <div className="flex w-full flex-col gap-y-[10px]">
        <label
          className="text text-deepBlack font-fellix-regular text-base"
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
         {...formik.getFieldProps("email")}
          placeholder="Enter your email address"
          className="w-full py-3 rounded-lg text-primaryBlack font-fellix-regular bg-[#FAFAFC] border border-[#DDD] px-4 outline-none placeholder:text-grey-00 focus:border-primaryBlue"
        />
        {formik.touched.email && formik.errors.email ? (
          <motion.div
            initial={{ opacity: 0, y: "-10px" }}
            animate={{ opacity: 1, y: "0px" }}
            exit={{ opacity: 0, y: "-10px" }}
            className="text-red-500 text-sm tracking-wider mt-1 font-fellix-regular"
          >
            {formik.errors.email}
          </motion.div>
        ) : null}
      </div>
      <div className="flex w-full flex-col gap-y-[10px]">
        <label
          className="text text-deepBlack font-fellix-regular text-base"
          htmlFor="phone_no"
        >
          Phone Number
        </label>
        <PhoneNumber
          formik={formik}
          fieldName="phone"
        />
      </div>
      <div className="w-full">
        <h1 className="text-[18px] font-fellix-semibold md:text-xl">
          Contact Information
        </h1>
        <div className="w-full max-w-[537px] mt-4 flex flex-col gap-y-5 md:mt-8 md:gap-y-[34px]">
          <div className="flex w-full flex-col gap-y-[10px]">
            <label
              className="text text-deepBlack font-fellix-regular text-base"
              htmlFor="f_Name"
            >
              Full name
            </label>
            <input
              type="text"
              name="f_Name"
              id="f_Name"
              {...formik.getFieldProps("f_Name")}
              placeholder="Full name"
              className="w-full py-3 rounded-lg text-primaryBlack font-fellix-regular bg-[#FAFAFC] border border-[#DDD] px-4 outline-none placeholder:text-grey-00 focus:border-primaryBlue"
            />
            {formik.touched.f_Name && formik.errors.f_Name ? (
              <motion.div
                initial={{ opacity: 0, y: "-10px" }}
                animate={{ opacity: 1, y: "0px" }}
                exit={{ opacity: 0, y: "-10px" }}
                className="text-red-500 text-sm tracking-wider mt-1 font-fellix-regular"
              >
                {formik.errors.f_Name}
              </motion.div>
            ) : null}
          </div>
          <div className="flex w-full flex-col gap-y-[10px]">
            <label
              className="text text-deepBlack font-fellix-regular text-base"
              htmlFor="phone_no"
            >
              Phone Number
            </label>
            <PhoneNumber
              formik={formik}
              fieldName="_phone"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
