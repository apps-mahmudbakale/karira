import { useFormik } from "formik";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { useState } from "react";
import { AiFillEyeInvisible, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link ,useNavigate,NavigateFunction} from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Logo from "../../../assets/logo.svg";
import PhoneNumber from "../../../components/PhoneNumber";
import { useSignupMutation } from "../../../services/auth/login";
import AuthLeft from "../shared/AuthLeft";
import ErrorMessage from "./ErrorMessage ";
import LocationSearch from "./LocationSearch";

type PasswordField = "password" | "confirm_password";


interface Error {
  status: number;
  data: {
    code: number;
    status: string;
    message: string;
  };
}
const customId = "custom-id";
const SignUp = () => {
  const [showPassword, setShowPassword] = useState<Record<PasswordField, boolean>>({
    password: false,
    confirm_password: false,
  });

  const navigate:NavigateFunction = useNavigate();

  const [signup, { isLoading: isSubmitting}] =
    useSignupMutation();
  
  
  const togglePassword = (name: PasswordField) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirm_password: "",
      name: "",
      phone: "",
      businessName: "",
      address: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      phone: Yup.string().required("Phone is required"),
      businessName: Yup.string().required("Business Name is required"),
      address: Yup.string().required("Address is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      const credentials = {
        email: values.email,
        password: values.password,
        phone: values.phone,
        name: values.name,
        businessName: values.businessName,
        address: values.address,
      };




      try {
        // Handle the response (e.g., store token, redirect, etc.)
        await signup(credentials)
          .unwrap()
          .then((res) => {
            if (res.token) {
              Cookies.set("auth_token", res.token, { expires: 7 });
            } else {
              toast.error("Something went wrong");
            }
          });
        
        navigate("/dashboard/");
        formik.resetForm();
      } catch (error) {
          toast.error(`${(error as Error).data.message}`, {
            className:
              "text-sm  !font-fellix-regular !tracking-wider !text-red-500",
            toastId: customId,
          });
      }
    },
  });

  return (
    <div className="w-full flex">
      <div className="w-2/5  flex-row justify-end bg-primaryBlue hidden lg:flex">
        <div className="max-w-[647px] w-full mt-[101px]">
          <AuthLeft />
        </div>
      </div>
      <div className="w-full bg-white px-4 flex flex-col justify-start sm:px-0 lg:w-3/5">
        <div className="max-w-[793px] bg-white">
          <div className="max-w-[360px] mx-auto  py-10 sm:py-12 md:py-[86px] ">
            <div className="w-full flex flex-col items-center">
              <img src={Logo} alt="" />
              <div className="space-y-3 mt-9">
                <h1 className=" text-xl text-primaryBlue font-fellix-medium sm:text-4xl">
                  Sign up
                </h1>
                <p className=" text-base text-grey-500 font-fellix-regular">
                  Fill in your details below to sign up to explore moving
                  solutions designed for your business.
                </p>
              </div>
              <form
                onSubmit={formik.handleSubmit}
                className="w-full max-w-[360px] mt-3.5 grid grid-flow-row gap-y-5"
              >
                <div className="space-y-[6px]">
                  <label
                    className="block text-sm  font-fellix-regular text-grey-700"
                    htmlFor="name"
                  >
                    Name<span className="text-[#F04438]">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter your name"
                    className="w-full border border-grey-300 rounded-lg h-[44px] bg-secondary-white text-grey-500 px-[14px] font-fellix-regular outline-none focus:outline-none placeholder:font-fellix-light"
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <motion.div
                      initial={{ opacity: 0, y: "-10px" }}
                      animate={{ opacity: 1, y: "0px" }}
                      exit={{ opacity: 0, y: "-10px" }}
                      className="text-red-500 text-sm tracking-wider mt-1 font-fellix-regular"
                    >
                      {formik.errors.name}
                    </motion.div>
                  ) : null}
                </div>
                <div className="space-y-[6px]">
                  <label
                    className="block text-sm  font-fellix-regular text-grey-700"
                    htmlFor="phone"
                  >
                    Phone<span className="text-[#F04438]">*</span>
                  </label>
                  <PhoneNumber
                    formik={formik}
                    fieldName="phone"
                  />
                </div>
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
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter email address"
                    className="w-full border border-grey-300 rounded-lg h-[44px] bg-secondary-white text-grey-500 px-[14px] font-fellix-regular outline-none focus:outline-none placeholder:font-fellix-light"
                  />

                  <ErrorMessage formik={formik} name="email" />
                </div>
                <div className="space-y-[6px]">
                  <label
                    className="block text-sm  font-fellix-regular text-grey-700"
                    htmlFor="businessName"
                  >
                    Business Name<span className="text-[#F04438]">*</span>
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    id="businessName"
                    value={formik.values.businessName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter business name"
                    className="w-full border border-grey-300 rounded-lg h-[44px] bg-secondary-white text-grey-500 px-[14px] font-fellix-regular outline-none focus:outline-none placeholder:font-fellix-light"
                  />
                  <ErrorMessage formik={formik} name="businessName" />
                </div>
                <div className="space-y-[6px]">
                  <label
                    className="block text-sm  font-fellix-regular text-grey-700"
                    htmlFor="address"
                  >
                    Address<span className="text-[#F04438]">*</span>
                  </label>
                  <LocationSearch
                    formik={formik}
                    name="address"
                  />
                </div>
                <div className="space-y-[6px]">
                  <label
                    className="block text-sm  font-fellix-regular text-grey-700"
                    htmlFor="password"
                  >
                    Password<span className="text-[#F04438]">*</span>
                  </label>
                  <div className="w-full relative flex items-center">
                    <span
                      onClick={() => togglePassword("password")}
                      className="absolute cursor-pointer -translate-x-[14px] right-0 bg-[#D9E3FF] bg-opacity-[0.5] flex items-center  w-5 h-5 justify-center rounded-full">
                      {showPassword.password ? (
                        <AiFillEyeInvisible
                          className="text-[#041549] text-sm"
                        />
                      ) : (
                        <AiOutlineEyeInvisible
                          className="text-[#041549] text-sm"
                        />
                      )}
                    </span>
                    <input
                      type={showPassword.password ? "text" : "password"}
                      name="password"
                      id="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Password"
                      className="w-full border border-grey-300 rounded-lg h-[44px] bg-secondary-white text-grey-500 px-[14px] font-fellix-regular outline-none focus:outline-none placeholder:font-fellix-light"
                    />
                  </div>
                  <ErrorMessage formik={formik} name="password" />

                  {/* <p className=" text-grey-500 font-fellix-regular text-sm">
                    Must be at least 8 characters.
                  </p> */}
                </div>
                <div className="space-y-[6px]">
                  <label
                    className="block text-sm  font-fellix-regular text-grey-700"
                    htmlFor="password"
                  >
                    Confirm Password<span className="text-[#F04438]">*</span>
                  </label>
                  <div className="w-full relative flex items-center">
                    <span
                      onClick={() => togglePassword("confirm_password")}
                      className="absolute -translate-x-[14px] cursor-pointer right-0 bg-[#D9E3FF] bg-opacity-[0.5] flex items-center  w-5 h-5 justify-center rounded-full"
                    >
                      {showPassword.confirm_password ? (
                        <AiFillEyeInvisible className="text-[#041549] text-sm" />
                      ) : (
                        <AiOutlineEyeInvisible className="text-[#041549] text-sm" />
                      )}
                    </span>
                    <input
                      type={showPassword.confirm_password ? "text" : "password"}
                      name="confirm_password"
                      id="confirm_password"
                      placeholder="Confirm password"
                      value={formik.values.confirm_password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full border border-grey-300 rounded-lg h-[44px] bg-secondary-white text-grey-500 px-[14px] font-fellix-regular outline-none focus:outline-none placeholder:font-fellix-light"
                    />
                  </div>
                  <ErrorMessage formik={formik} name="confirm_password" />
                  <p className=" text-grey-500 font-fellix-regular text-sm">
                    Must be at least 8 characters.
                  </p>
                </div>
                <div className="w-full">
                  <button
                    className=" bg-primaryBlue text-sm text-white font-fellix-bold inline-flex items-center justify-center h-12 rounded-xl w-full"
                    type="submit"
                  >
                    {isSubmitting ? (
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
                      "Get Started"
                    )}
                  </button>
                  <p className=" text-grey-500 text-sm font-fellix-regular mt-4 text-center">
                    Already have an account?{" "}
                    <Link
                      to="/u/login"
                      className="text-primaryBlue font-fellix-semibold"
                    >
                      Log in
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
