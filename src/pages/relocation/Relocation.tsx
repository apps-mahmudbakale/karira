import { useEffect, useState } from "react";
import AnimatedWrapper from "../../components/AnimatedWrapper";
import SuccessModal from "../../components/shared/SucessModal";
import Apartment from "./pages/Apartment";
import Contact from "./pages/Contact";
import Location from "./pages/Location";

import dayjs from "dayjs";
import { useFormik } from "formik";
//import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { usePostRelocationMutation } from "../../services/relocation/relocation";
import EstimateModal from "./EstimateModal";
import { useGetProfileQuery } from "../../services/auth/profile";

const steps = [
  {
    id: 1,
    name: "Contact",
  },
  {
    id: 2,
    name: "Apartment",
  },
  {
    id: 3,
    name: "Location",
  },
];

interface Error {
  status: number;
  data: {
    code: number;
    status: string;
    message: string;
  };
}

const customId = "custom-id";

const Relocation = () => {
  const [isSuccessModal, setIsSuccessModal] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  const toggleCompleteModal = () => setIsComplete((prev) => !prev);

  const toggleSuccessModal = () => setIsSuccessModal((prev) => !prev);

  const [formState, setFormState] = useState({
    step: steps[0].id,
  });

  // const navigate = useNavigate();

  // handle back
  const handleBack = () => {
    setFormState((prev) => ({
      ...prev,
      step: prev.step > 1 ? prev.step - 1 : prev.step,
    }));
  };

  // handle next
  const handleNext = () => {
    setFormState((prev) => ({
      ...prev,
      step: prev.step < steps.length ? prev.step + 1 : prev.step,
    }));
  };

  // get user query
  const { data: profileData } = useGetProfileQuery();

  // submission mutation

  const [postRelocation, { isLoading: isSubmitting, data: successData }] =
    usePostRelocationMutation();

  // handle form submission
  const formik = useFormik({
    initialValues: {
      f_name: "",
      l_name: "",
      email: "",
      phone: "",

      address: "",
      pick: {
        latitude: null,
        longitude: null,
        address: "",
      },
      drop: {
        latitude: null,
        longitude: null,
        address: "",
      },
      latitude: null,
      longitude: null,

      _address: "",
      _latitude: null,
      _longitude: null,

      mini_Flat: "",
      numberOfRooms: null,
      moving_From: "",
      moving_To: "",
      loaders: "",
      Image_Url: "",
      a_file: null,
      l_file: null,
      f_Name: "",
      _phone: "",

      date: dayjs(new Date(Date.now())),
      time: "",

      upload_Url: "",
      description: "",
    },
    validationSchema: Yup.object({}),
    onSubmit: async (values) => {
      // Handle the response (e.g., store token, redirect, etc.)
      const payload = {
        contactInfo: {
          f_Name: values.f_name,
          L_name: values.l_name,
          email: values.email,
          phone: values.phone,
        },
        pickupLocation: {
          address: values.pick.address,
          location: {
            coordinates: [values.pick.longitude, values.pick.latitude],
          },
        },
        dropOffLocation: {
          address: values.drop.address,
          location: {
            coordinates: [values.drop.longitude, values.drop.latitude],
          },
        },

        description: values.description,
        receiverInfo: {
          f_Name: values.f_Name,
          phone: values._phone,
        },
        schedule: {
          date: dayjs(values.date).format("YYYY-MM-DD"),
          // convert AM to am
          time: dayjs(values.time).format("hh:mm A").toLowerCase(),
        },
        apartment: {
          mini_Flat: values.mini_Flat,
          numberOfRooms: values.numberOfRooms,
          moving_From: values.moving_From,
          moving_To: values.moving_To,
          loaders: values.loaders,
          Image_Url: values.Image_Url,
        },
        upload_Url: values.upload_Url,
      };

      try {
        // Handle the response (e.g., store token, redirect, etc.)
        await postRelocation(payload).unwrap();
        toggleSuccessModal();
      } catch (error) {
        toast.error(`${(error as Error).data.message}`, {
          position: "top-center",
          className:
            "text-sm !bg-red-50 !font-fellix-regular !tracking-wider !text-red-500",
          toastId: customId,
        });
      }
    },
  });

  // prefill name, email and phone number
  // split the name to get first name and last name

  useEffect(() => {
    if (profileData) {
      const { name, email, phone } = profileData;

      let firstName = "";
      let lastName = "";

      // Splitting the name only if it contains two or more parts
      if (name && name.split(" ").length >= 2) {
        const nameParts = name.split(" ");
        firstName = nameParts[0];
        lastName = nameParts.slice(1).join(" "); // Joining remaining parts as last name
      } else {
        firstName = name || "";
        lastName = ""; // Reset last name if name doesn't contain more than one part
      }

      formik.setFieldValue("f_name", firstName);
      formik.setFieldValue("l_name", lastName);
      formik.setFieldValue("email", email || "");
      formik.setFieldValue("phone", "+" + (phone || ""));
    }
  }, [profileData]);

  const renderStep = () => {
    switch (formState.step) {
      case 1:
        return (
          <AnimatedWrapper key={1}>
            <Contact formik={formik} />
          </AnimatedWrapper>
        );
      case 2:
        return (
          <AnimatedWrapper key={2}>
            <Apartment formik={formik} />
          </AnimatedWrapper>
        );
      case 3:
        return (
          <AnimatedWrapper key={3}>
            <Location formik={formik} />
          </AnimatedWrapper>
        );
      default:
        return (
          <AnimatedWrapper key={1}>
            <Contact formik={formik} />
          </AnimatedWrapper>
        );
    }
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto p-4">
      <div className="max-w-[1212px] border border-[#F5F5FA] rounded-2xl mx-auto bg-white py-10 md:px-[50px] md:py-12">
        {/* steps buttons  */}
        <div className="w-[600px] overflow-x-scroll flex ">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center">
              <button
                className={` font-fellix-bold text-sm transition-all ease-in-out duration-200 w-[150px] h-12 rounded-2xl inline-flex items-center justify-center gap-x-4  ${
                  step.id === formState.step
                    ? "text-primaryBlue border  border-primaryBlue"
                    : "text-secondaryGray"
                }`}
                onClick={() => setFormState({ ...formState, step: step.id })}
              >
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center border  text-sm transition-all ease-in-out duration-200 ${
                    step.id === formState.step
                      ? " border-primaryBlue"
                      : "border-[#DDD]"
                  }`}
                >
                  {step.id}
                </span>
                {step.name}
              </button>
              <svg
                className={`${step.id !== 3 ? "block" : "hidden"}`}
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
            </div>
          ))}
        </div>

        {/* renderStep form */}
        <div className="mt-10">
          <form onSubmit={formik.handleSubmit}>
            {/* f_name input field */}

            {renderStep()}
            <div className="flex gap-x-5 mt-10 w-full justify-center max-w-[538px] md:mt-14">
              <button
                onClick={handleBack}
                disabled={formState.step === 1}
                type="button"
                className="h-[48px] inline-flex items-center justify-center capitalize border border-primaryBlue text-primaryBlue font-bold rounded-lg w-full  sm:max-w-[180px]"
              >
                back
              </button>

              <button
                onClick={
                  formState.step === steps.length
                    ? toggleSuccessModal
                    : handleNext
                }
                className={`h-[48px] bg-primaryBlue text-white font-bold rounded-lg w-full shadow-active-shadow sm:max-w-[180px] ${
                  steps.length === formState.step ? "hidden" : ""
                }`}
                type="button"
              >
                {formState.step !== steps.length ? "Next" : "Get Estimates "}
              </button>
              <button
                className={`h-[48px] bg-primaryBlue text-white font-bold rounded-lg w-full shadow-active-shadow sm:max-w-[180px] ${
                  steps.length !== formState.step ? "hidden" : ""
                }`}
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
                  "Get Estimates"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* modal dialog */}
      <>
        <EstimateModal
          isOpen={isSuccessModal}
          toggle={toggleSuccessModal}
          toggleComplete={toggleCompleteModal}
          data={successData}
        />
        <SuccessModal
          isComplete={isComplete}
          toggleComplete={toggleCompleteModal}
          isRelocation={true}
        />
      </>
    </div>
  );
};

export default Relocation;
