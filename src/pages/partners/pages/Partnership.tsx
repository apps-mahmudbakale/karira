import { useFormik } from "formik";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import * as Yup from "yup";
import Banner_2 from "../../../assets/Group16274.png";
import Banner from "../../../assets/unsplash_FcLyt7lW5wg.png";
import PhoneNumber from "../../../components/PhoneNumber";
import { get_started, mover_benefits } from "../../../constants/data";
import Discover from "../Discover";
import Dropdown from "../components/Dropdown";
import { useCreatePartnerMutation } from "../../../services/partnership/partnershipslice";
import { toast } from "react-toastify";
import ErrorMessage from "../../business/pages/ErrorMessage ";
import SuccessModal from "./SuccessModal";

const Partnership = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  const toggleCompleteModal = () => setIsComplete((prev) => !prev);

  const ref = useRef<HTMLDivElement>(null);

  // mutation
  const [
    createPartner,
    { isLoading},
  ] = useCreatePartnerMutation();

  const handleScroll = () => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      phone: "",
      state: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone: Yup.string().required("Phone number is required"),
      state: Yup.string().required("State is required"),
    }),
    onSubmit: async (values) => {
      try {
        await createPartner(values).unwrap();
        formik.resetForm();
        toggleCompleteModal();
      } catch (error) {
        toast.error((error as any).data.message, {
          className:
            "!bg-red-500 !text-white !font-fellix-regular !tracking-wider !py-2 !px-4 !rounded",
        });
      }
    },
  });

  const ref_sn = useRef(null);
  const ref_sn_2 = useRef(null);
  const inView = useInView(ref_sn, { once: true });
  const inView_2 = useInView(ref_sn_2, { once: true });

  return (
    <div ref={ref} className="w-full">
      {/* here is the code for the hero page */}
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-[1440px]  lg:px-8 lg:py-20">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-red  max-w-[605px] w-full"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-full text-3xl text-center text-primaryBlack font-fellix-bold sm:text-start  sm:text-4xl md:tracking-[-1.92px] lg:text-[62.5px]  lg:leading-[75px] "
            >
              Turn Your <span className=" text-primaryBlue"> Vehicle</span> into
              a Money-Making Machine!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-6 text-center text-base text-secondaryBlack font-fellix-regular max-w-[561px] w-full leading-7 sm:text-start "
            >
              Whether you have a truck, van, space-bus or any other vehicle with
              space, Karria helps you put it to use and make money.
            </motion.p>

            <form
              onSubmit={formik.handleSubmit}
              className="mt-8 w-full flex flex-col gap-y-8 sm:gap-y-[35px] sm:max-w-[537px]"
            >
              <div className="flex-col flex gap-y-2">
                <label
                  className=" text-base font-fellix-regular text-primaryBlack"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="w-f">
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg bg-primaryWhite border border-grey-02 font-fellix-regular text-primaryBlack outline-none placeholder:text-grey-00 focus:outline-none"
                    {...formik.getFieldProps("email")}
                    placeholder="Enter your email address"
                  />

                  <ErrorMessage formik={formik} name={"email"} />
                </div>
              </div>
              <div className="flex-col flex gap-y-2">
                <label
                  className=" text-base font-fellix-regular text-primaryBlack"
                  htmlFor="phone"
                >
                  Phone Number
                </label>
                <PhoneNumber formik={formik} fieldName="phone" />
              </div>

              <div className="flex-col flex gap-y-2">
                <label
                  className=" text-base font-fellix-regular text-primaryBlack"
                  htmlFor="state"
                >
                  State
                </label>
                <div className="w">
                  <Dropdown formik={formik} field_name="state" />
                  <ErrorMessage formik={formik} name={"state"} />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primaryBlue rounded-lg text-white font-fellix-regular mt-3 text-lg"
              >
                {isLoading ? (
                  <>
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 me-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    Loading...
                  </>
                ) : (
                  "Sign up as a partner"
                )}
              </button>
            </form>
          </motion.div>
          <div className="max-w-[586.213px] w-full bg-[#F6F6F6] p-4  rounded-xl sm:p-[22.21px] sm:rounded-2xl">
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className={`object-cover object-center w-full h-full ${
                loading
                  ? "scale-110 blur-2xl grayscale"
                  : "scale-100 blur-0 grayscale-0"
              }`}
              src={Banner || "https://bit.ly/placeholder-img"}
              alt=""
              loading="lazy"
              onLoad={() => setLoading(false)}
            />
          </div>
        </div>
      </div>

      {/* here is the code for why become karria mover */}

      <div
        ref={ref_sn}
        className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-[1110px] md:px-24 lg:px-8 lg:py-20"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center text-2xl font-fellix-medium sm:text-[32px]"
        >
          Why Become a <span className="text-primaryBlue">Karria</span> Mover?
        </motion.h2>

        <div className="grid gap-8 place-content-center sm:place-content-start sm:mx-auto lg:gap-[36px] mt-8 sm:mt-[38px] lg:grid-cols-3 sm:max-w-sm mx-auto lg:max-w-full">
          {mover_benefits.map(({ id, icon, title, description }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 * id }}
              className="max-w-[346px] p-8 bg-white rounded-3xl shadow-card-shadow"
            >
              <span className="w-20 h-20 rounded-full flex items-center justify-center bg-primaryBlue bg-opacity-10">
                <img src={icon} alt="" />
              </span>
              <div className="mt-6">
                <h6 className="mb-3 text-primaryBlack font-fellix-medium text-lg sm:text-2xl">
                  {title}
                </h6>
                <p className="text-sm font-fellix-regular text-secondaryBlack">
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* here is the code for get started */}
      <div
        ref={ref_sn_2}
        className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-[1110px] md:px-24 lg:px-8 lg:py-20"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView_2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center text-2xl font-fellix-medium sm:text-[32px]"
        >
          Get <span className="text-primaryBlue"> Started</span>
        </motion.h2>

        <div className="grid gap-8 place-content-center sm:place-content-start sm:mx-auto lg:gap-[36px] mt-8 sm:mt-[38px] lg:grid-cols-3 sm:max-w-sm mx-auto lg:max-w-full">
          {get_started.map(({ id, title, description }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView_2 ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * id }}
              className="max-w-[346px] p-8 bg-white rounded-3xl shadow-card-shadow"
            >
              <span className="w-20 h-20 rounded-full flex items-center justify-center bg-primaryBlue bg-opacity-10">
                <span className="text-[32px] font-fellix-bold text-primaryBlue">
                  {id}
                </span>
              </span>
              <div className="mt-6">
                <h6 className="mb-3 text-primaryBlack font-fellix-medium text-lg sm:text-2xl">
                  {title}
                </h6>
                <p className="text-sm font-fellix-regular text-secondaryBlack">
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center mt-14 md:mt-20"
        >
          <button
            onClick={handleScroll}
            disabled={isLoading}
            type="button"
            className="w-full max-w-[537px] py-3 bg-primaryBlue rounded-lg text-white font-fellix-regular mt-3 text-lg"
          >
            Sign up as a partner
          </button>
        </motion.div>
      </div>

      {/* here is the code for rules */}
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-[1110px] md:px-24 lg:px-8 lg:py-20">
        {/* header */}

        <h2 className="text-center text-2xl w-full font-fellix-medium md:max-w-[445px] md:leading-[140%] md:text-start sm:text-[32px]">
          Your Vehicle, Your Rules,
          <br />
          <span className="text-primaryBlue"> Your Earnings!</span>
        </h2>

        <div className="grid gap-8 place-content-center sm:place-content-start sm:mx-auto lg:gap-[36px] mt-8 sm:mt-[38px] md:mt-[65px] lg:grid-cols-2 sm:max-w-sm mx-auto lg:max-w-[1110px]">
          <div className="w-full max-w-[454px] max-h-[453.997px]">
            <img
              className="object-cover object-center w-full h-full"
              src={Banner_2}
              alt="image"
            />
          </div>

          <div className="w-full max-w-[585px]">
            <h1 className="text-[#0F111D] font-fellix-bold text-xl">
              Frequently Asked Question
            </h1>
            <Discover />
          </div>
        </div>
      </div>

      {/* here is modals section */}
      <>
        <SuccessModal
          isComplete={isComplete}
          toggleComplete={toggleCompleteModal}
          title="Success!"
          message="An email with further instructions has been sent to your inbox. Please check your spam folder if you don't see it in your inbox."
        />
      </>
    </div>
  );
};

export default Partnership;
