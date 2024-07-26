import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useGetProfileQuery,useUpdateProfileMutation } from "../../../services/auth/profile";
import SuccessModal from "../modals/SuccessModal";
import PhoneNumber from "../../../components/PhoneNumber";
import LocationSearch from "./LocationSearch";
import { AiFillEyeInvisible } from "react-icons/ai";
import { BiShowAlt } from "react-icons/bi";
import { toast } from "react-toastify";
import ErrorMessage from "../../business/pages/ErrorMessage ";

const customId = "custom-id-yes";
const BusinessInfo = () => {
  const [isSuccessModal, setIsSuccessModal] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const navigate = useNavigate();

  const toggleSuccessModal = () => setIsSuccessModal((prev) => !prev);


  // profile query
  const {
    data: user,
    isError,
    isLoading: isFetchingProfile,
  } = useGetProfileQuery();

  // profile mutation
  const [
    updateProfile,
    { isLoading: isUpdatingProfile },
  ] = useUpdateProfileMutation();

  // form values

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      businessName: "",
      address: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      phone: Yup.string().required("Phone is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      businessName: Yup.string().required("Business name is required"),
      address: Yup.string().required("Address is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
    }),
    onSubmit: async(values) => {
      try {
        await updateProfile(values).unwrap();
        toggleSuccessModal();
      }
      catch (error) {
         toast.error(`${(error as any).data.message}`, {
           position: "top-center",
           className:
             "text-sm !bg-red-50 !font-fellix-regular !tracking-wider !text-red-500",
           toastId: customId,
         });
      
     }
    },
  });

  useEffect(() => {
    if (user) {
      formik.setValues({
        name: user.name,
        phone: user.phone,
        email: user.email,
        businessName: user.businessname,
        address: user.address,
        password: "",
      });
    }
  }, [user]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="max-w-[1198px] h-screen mx-auto px-2 xl:px-0">
        <div className="flex flex-col items-center justify-center py-8 md:py-16">
          <div className="text-center space-y-3">
            <span className="w-20 relative h-20 md:w-[145px] md:h-[145px] flex items-center justify-center rounded-full  md:p-2">
              <svg
                className="w-24  h-24 md:w-[145px] md:h-[145px] absolute"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 145 145"
                fill="none"
              >
                <circle
                  cx="72.5"
                  cy="72.5"
                  r="71.5"
                  stroke="url(#paint0_linear_406_731)"
                  stroke-width="2"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_406_731"
                    x1="0"
                    y1="0"
                    x2="174.795"
                    y2="79.4423"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#7433FF" />
                    <stop offset="1" stop-color="#FFA3FD" />
                  </linearGradient>
                </defs>
              </svg>
              <img
                className="w-full h-full object-center object-cover rounded-full"
                src="https://cdn.pixabay.com/photo/2023/10/16/10/51/fox-8318961_1280.png"
                alt="profile"
              />
            </span>
            <p className="text-xs font-fellix-regular text-black">
              Change Picture
            </p>
          </div>
        </div>
        <div className="w-full px-5  shadow-towing-card-shadow border border-[#F5F5FA]  py-5 rounded-2xl bg-white sm:px-6 sm:py-[28.32px]">
          {isFetchingProfile ? (
            <>
              {/* loading message  */}
              <div className="flex justify-center items-center py-8">
                <div className="text-center">
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="inline w-8 h-8 text-gray-200 animate-spin  fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                    {/*loading message for user */}

                    <p className="text-gray-400 text-sm mt-3">
                      Loading profile details...
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : isError ? (
            <div>
              {/* error message for user */}
              <div className="text-center">
                <p className="text-gray-400 text-sm mt-3">
                  An error occurred while fetching delivery details
                </p>

                <button
                  onClick={() => window.location.reload()}
                  className="text-primaryBlue font-bold mt-3"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={formik.handleSubmit}
              className="w-full max-w-[360px] flex flex-col gap-y-5"
            >
              <div className="space-y-[6px] ">
                <label
                  className="block text-sm  font-fellix-regular text-grey-700"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...formik.getFieldProps("name")}
                  placeholder="Enter your name"
                  className="w-full border border-grey-300 rounded-lg h-[44px] bg-secondary-white text-grey-500 px-[14px] font-fellix-regular outline-none focus:outline-none placeholder:font-fellix-light"
                    />
                    <ErrorMessage
                      formik={formik}
                      name={"name"}
                    />
              </div>
              <div className="space-y-[6px]">
                <label
                  className="block text-sm  font-fellix-regular text-grey-700"
                  htmlFor="phone"
                >
                  Phone
                </label>

                <PhoneNumber formik={formik} fieldName="phone" />
              </div>
              <div className="space-y-[6px]">
                <label
                  className="block text-sm  font-fellix-regular text-grey-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...formik.getFieldProps("email")}
                  placeholder="Enter email address"
                  className="w-full border border-grey-300 rounded-lg h-[44px] bg-secondary-white text-grey-500 px-[14px] font-fellix-regular outline-none focus:outline-none placeholder:font-fellix-light"
                    />
                    <ErrorMessage
                      formik={formik}
                      name={"email"}
                    />
              </div>
              <div
                className={`space-y-[6px] ${
                  user?.businessname ? "hidden" : "block"
                }`}
              >
                <label
                  className="block text-sm  font-fellix-regular text-grey-700"
                  htmlFor="businessName"
                >
                  Business Name
                </label>
                <input
                  type="text"
                  id="businessName"
                  {...formik.getFieldProps("businessName")}
                  placeholder="Enter business name"
                  className="w-full border border-grey-300 rounded-lg h-[44px] bg-secondary-white text-grey-500 px-[14px] font-fellix-regular outline-none focus:outline-none placeholder:font-fellix-light"
                    />
                    <ErrorMessage
                      formik={formik}
                      name={"businessName"}
                    />
              </div>
              <div className="space-y-[6px]">
                <label
                  className="block text-sm  font-fellix-regular text-grey-700"
                  htmlFor="address"
                >
                  Address
                </label>
                    <LocationSearch formik={formik} name="address" />
                    <ErrorMessage
                      formik={formik}
                      name={"address"}
                    />
              </div>
              <div className="space-y-[6px]">
                <label
                  className="block text-sm  font-fellix-regular text-grey-700"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="w-full relative flex items-center">
                  <span
                    onClick={togglePassword}
                    className="absolute -translate-x-[14px] right-0 bg-[#D9E3FF] bg-opacity-[0.5] flex items-center  w-5 h-5 justify-center rounded-full cursor-pointer"
                  >
                    {showPassword ? (
                      <AiFillEyeInvisible className="text-eye-icon-color text-sm" />
                    ) : (
                      <BiShowAlt className="text-sm text-eye-icon-color" />
                    )}
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    {...formik.getFieldProps("password")}
                    placeholder="Password"
                    className="w-full border border-grey-300 rounded-lg h-[44px] bg-secondary-white text-grey-500 px-[14px] font-fellix-regular outline-none focus:outline-none placeholder:font-fellix-light"
                  />
                    </div>
                    <ErrorMessage
                      formik={formik}
                      name={"password"}
                    />
                <p className=" text-grey-500 font-fellix-regular text-sm">
                  Must be at least 8 characters.
                </p>
              </div>
              <div className="flex flex-row items-center justify-center gap-x-6 sm:gap-x-[34px] sm:mt-6">
                <button
                  type="button"
                  onClick={goBack}
                  className=" text-sm text-primaryBlue font-fellix-bold inline-flex items-center justify-center h-12  border border-primaryBlue rounded-xl w-[180px]"
                >
                  Back
                </button>
                <button
                  className=" bg-primaryBlue text-sm text-white font-fellix-bold inline-flex items-center justify-center h-12 rounded-xl w-[180px]"
                  type="submit"
                >
                      {
                        isUpdatingProfile ? <>
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
                          :
                          "Update"
                  }
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* modals */}
      <SuccessModal
        isSuccessModal={isSuccessModal}
        toggleSuccessModal={toggleSuccessModal}
        message="Your profile has been updated successfully"
      />
    </>
  );
};

export default BusinessInfo;
