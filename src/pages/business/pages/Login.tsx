import AuthLeft from "../shared/AuthLeft";
import Logo from "../../../assets/logo.svg";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorMessage from "./ErrorMessage ";
import { useState } from "react";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../../services/auth/login";


const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };


  const [
    login,
    { isLoading: isLoginLoading}
  ]= useLoginMutation()


  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please enter a valid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async(values) => {

      const credentials = {
        email: values.email,
        password: values.password,
      
      }
       try {
                 const res = await login(credentials).unwrap();
                 if (res.token) {
                   Cookies.set("auth_token", res.token, { expires: 7 });

                   // Redirect to the attempted URL or home page if no attempted URL
                   const attemptedUrl = new URLSearchParams(
                     location.search
                   ).get("redirectTo");

                   if (res.user?.role === "individual") {
                   navigate(attemptedUrl || "/about-us");
                     
                   } else {
                   navigate(attemptedUrl || "/dashboard/");
                     
                   }

                 } else {
                   toast.error("Something went wrong");
                 }
       } catch (error) {
         toast.error((error as any).data.message);
       }
     
    },
  });
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
            <form onSubmit={formik.handleSubmit} className="w-full ">
              <div className="flex items-center justify-center">
                <img src={Logo} alt="" />
              </div>
              <div className="space-y-3 mt-[46px] text-start">
                <h1 className=" text-xl text-primaryBlue font-fellix-medium sm:text-4xl">
                  Log in
                </h1>
                <p className=" text-base text-grey-500 font-fellix-regular">
                  Welcome back! Please enter your details.
                </p>
              </div>
              <div className="w-full  mt-8 grid grid-flow-row gap-y-5">
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
                    className="w-full border border-grey-300 rounded-lg h-[44px] bg-white text-grey-500 px-[14px] font-fellix-regular outline-none focus:outline-none placeholder:font-fellix-light"
                  />
                  <ErrorMessage formik={formik} name={"email"} />
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
                      onClick={togglePassword}
                      className="absolute cursor-pointer -translate-x-[14px] right-0 bg-[#D9E3FF] bg-opacity-[0.5] flex items-center  w-5 h-5 justify-center rounded-full"
                    >
                      {showPassword ? (
                        <AiFillEyeInvisible className="text-eye-icon-color text-sm" />
                      ) : (
                        <AiOutlineEyeInvisible className="text-sm text-eye-icon-color" />
                      )}
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Password"
                      className="w-full border border-grey-300 rounded-lg h-[44px] bg-white text-grey-500 px-[14px] font-fellix-regular outline-none focus:outline-none placeholder:font-fellix-light"
                    />
                  </div>

                  <ErrorMessage formik={formik} name={"password"} />
                </div>

                <div className="w-full">
                  <p className="inline-flex items-center gap-2 text-sm font-fellix-regular text-grey-700">
                    <span className="flex items-center justify-center w-4 h-4 rounded-[4px] border border-grey-300"></span>
                    Remember me
                  </p>
                  <Link
                    to="/u/forgot-password"
                    className="float-right inline-flex items-center gap-2 text-sm font-fellix-regular text-primaryBlue"
                  >
                    <p className="text-sm font-fellix-semibold text-[#697586]">
                      Forgot password?
                    </p>
                  </Link>
                </div>

                <div className="w-full">
                  <button
                    disabled={isLoginLoading || !formik.isValid}
                    className=" bg-primaryBlue text-sm text-white font-fellix-bold inline-flex items-center justify-center h-12 rounded-xl w-full disabled:bg-opacity-[0.5] disabled:cursor-not-allowed shadow-disabled"
                    type="submit"
                  >
                    {isLoginLoading ? (
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
                      "Sign in"
                    )}
                  </button>
                  <p className="text-grey-500 text-sm font-fellix-regular mt-8 text-center">
                    Don’t have an account? <br />
                    <Link
                      to="/u/individual-signup"
                      className="text-primaryBlue font-fellix-semibold"
                    >
                      Sign up as an individual
                    </Link>{" "}
                    or{" "}
                    <Link
                      to="/u/signup"
                      className="text-primaryBlue font-fellix-semibold"
                    >
                      Sign up as a business
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
