import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import AnimatedWrapper from "../../../components/AnimatedWrapper";
import { usePostDeliveryMutation } from "../../../services/dashboard/dashboard";
import ReceiversInfo from "../components/ReceiversInfo";
import VehicleType from "../components/VehicleType";
import SuccessModal from "../modals/SuccessModal";
import Warning from "../modals/Warning";
import StepButtons from "./StepButtons";
import Greetings from "../../../components/Greetings";
import { useGetProfileQuery } from "../../../services/auth/profile";

const steps = [
  {
    id: 1,
    name: "Vehicle",
  },

  {
    id: 2,
    name: "Delivery Information",
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

const NewDelivery = () => {
  const [isSuccessModal, setIsSuccessModal] = useState<boolean>(false);
  const [is_warning, setIsWarning] = useState<boolean>(false);

  // get user query
  const { data: profileData } = useGetProfileQuery();

  const [formState, setFormState] = useState({
    step: steps[0].id,
    is_step1_success: false,
    is_step2_success: false,
  });
  // scroll to ref
  const formRef = useRef(null);

  useEffect(() => {
    if (
      formik.values.receiver_Name &&
      formik.values.receiver_phone &&
      formik.values.pick.address &&
      formik.values.drop.address &&
      formik.values.description &&
      formik.values.pick.latitude &&
      formik.values.pick.longitude &&
      formik.values.drop.latitude &&
      formik.values.drop.longitude
    ) {
      setFormState((prev) => ({ ...prev, is_step2_success: true }));
    }
  }, [formState.is_step2_success]);

  // toggle modal

  const toggleSuccessModal = () => {
    setIsSuccessModal((prev) => !prev);
  };

  const toggleWarningModal = () => {
    setIsWarning((prev) => !prev);
  };

  const scrollToRef = (ref: any) => {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // handle back
  const handleBack = () => {
    if (formState.step === 1) {
      toggleWarningModal();
    }
    setFormState((prev) => ({
      ...prev,
      step: prev.step > 1 ? prev.step - 1 : prev.step,
    }));
  };

  // handle next
  const handleNext = () => {
    if (formik.values.vehicleType === "") {
      toast.error("Please select a vehicle type", {
        position: "top-center",
        className:
          "text-sm !bg-red-50 !font-fellix-regular !tracking-wider !text-red-500",
        toastId: customId,
      });
      return;
    }
    setFormState((prev) => ({
      ...prev,
      step: prev.step < steps.length ? prev.step + 1 : prev.step,
    }));
    scrollToRef(formRef);
  };

  // mutation query
  const [postDelivery, { isLoading }] = usePostDeliveryMutation();

  // formik form

  const formik = useFormik({
    initialValues: {
      vehicleType: "",
      f_Name: "astra",
      L_name: "Ripp",
      email: "ripp@gmail.com",
      phone: null,
      receiver_Name: "",
      receiver_phone: null,
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
      description: "",
    },

    onSubmit: async (values) => {
      const payload = {
        vehicleType: values.vehicleType,
        pickupLocation: {
          address: values.pick.address,
          location: {
            coordinates: [values.pick.latitude, values.pick.longitude],
          },
        },
        dropOffLocation: {
          address: values.drop.address,
          location: {
            coordinates: [values.drop.latitude, values.drop.longitude],
          },
        },
        description: values.description,
        receiverInfo: {
          f_Name: values.receiver_Name,
          phone: values.receiver_phone,
          address: values.address,
        },
      };
      console.log(payload);
      // await postDelivery(payload);
      try {
        await postDelivery(payload).unwrap();
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


  // prefill receiver name and phone number

  useEffect(() => {
    if (profileData) {
      const {name,phone} = profileData;
      formik.setFieldValue("receiver_Name", name);
      formik.setFieldValue("receiver_phone", "+" + phone);
    }
  }, [profileData]);

  const renderStep = () => {
    switch (formState.step) {
      case 1:
        return (
          <AnimatedWrapper key={1}>
            <VehicleType formik={formik} />
          </AnimatedWrapper>
        );
      case 2:
        return (
          <AnimatedWrapper key={2}>
            <ReceiversInfo formik={formik} />
          </AnimatedWrapper>
        );

      default:
        return (
          <AnimatedWrapper key={1}>
            <VehicleType formik={formik} />
          </AnimatedWrapper>
        );
    }
  };

  // validate steps
  useEffect(() => {
    // if VehicleType is there
    if (formik.values.vehicleType) {
      setFormState((prev) => ({ ...prev, is_step1_success: true }));
    } else {
      setFormState((prev) => ({ ...prev, is_step1_success: false }));
    }
  }, [formik.values.vehicleType]);
  return (
    <div className="py-10 sm:py-16 md:py-20 h-screen">
      <div className="text-center ">
        <Greetings />
      </div>
      <div className="max-w-[1212px] border border-[#F5F5FA] rounded-2xl mx-auto bg-white py-10 md:px-[50px] md:py-12 lg:py-20 mt-10">
        {/* steps buttons  */}
        <div className="w-full overflow-x-scroll flex ">
          <StepButtons
            step={formState.step}
            is_step2_success={formState.is_step2_success}
          />
        </div>
        {/* mutation erros displaying */}

        {/* form */}
        <form
          onSubmit={formik.handleSubmit}
          className=" max-w-[632px] mt-10 md:mt-12"
        >
          {/* componet form render */}
          {renderStep()}

          <div className="flex gap-x-5 mt-10 w-full justify-center max-w-[538px] md:mt-14">
            <button
              onClick={handleBack}
              type="button"
              className="h-[48px] inline-flex items-center justify-center capitalize border border-primaryBlue text-primaryBlue font-bold rounded-lg w-full  sm:max-w-[180px]"
            >
              back
            </button>

            <button
              onClick={handleNext}
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
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
      {/* modals  */}
      {/* success modal */}
      <SuccessModal
        isSuccessModal={isSuccessModal}
        toggleSuccessModal={toggleSuccessModal}
        message="Your delivery has been successfully created!"
      />

      {/* warning modal */}
      <Warning
        toggleSuccessModal={toggleWarningModal}
        isSuccessModal={is_warning}
      />
    </div>
  );
};

export default NewDelivery;
