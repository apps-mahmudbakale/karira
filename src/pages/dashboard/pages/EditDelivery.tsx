import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AnimatedWrapper from "../../../components/AnimatedWrapper";
import {
  useEditDeliveryMutation,
  useGetSingleDeliveryQuery,
} from "../../../services/dashboard/dashboard";
import ReceiversInfo from "../components/ReceiversInfo";
import VehicleType from "../components/VehicleType";
import SuccessModal from "../modals/SuccessModal";
import Warning from "../modals/Warning";
import Greetings from "../../../components/Greetings";

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

const EditDelivery = () => {
  const [isSuccessModal, setIsSuccessModal] = useState<boolean>(false);
  const [is_warning, setIsWarning] = useState<boolean>(false);

  const [formState, setFormState] = useState({
    step: steps[0].id,
  });
  // scroll to ref
  const formRef = useRef(null);

  // get id from params
  const { id } = useParams<{ id: string }>();

  const {
    data,
    isLoading: isFetchingDelivery,
    isError,
  } = useGetSingleDeliveryQuery(id as string);

  // prefill form with delivery data if
  useEffect(() => {
    if (data) {
      formik.setFieldValue("vehicleType", data?.[0]?.vehicleType);
      formik.setFieldValue("receiver_Name", data?.[0]?.receiverInfo?.f_Name);
      formik.setFieldValue(
        "receiver_phone",
        "+" + data?.[0]?.receiverInfo?.phone
      );
      formik.setFieldValue("pick", {
        latitude: data?.[0]?.pickupLocation?.location?.coordinates[0],
        longitude: data?.[0]?.pickupLocation?.location?.coordinates[1],
        address: data?.[0]?.pickupLocation?.address,
      });
      formik.setFieldValue("drop", {
        latitude: data?.[0]?.dropOffLocation?.location?.coordinates[0],
        longitude: data?.[0]?.dropOffLocation?.location?.coordinates[1],
        address: data?.[0]?.dropOffLocation?.address,
      });
      formik.setFieldValue("description", data?.[0]?.description);
    }
  }, [data]);

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
    } else {
      setFormState((prev) => ({
        ...prev,
        step: prev.step > 1 ? prev.step - 1 : prev.step,
      }));
    }
    
  };

  // handle next
  const handleNext = () => {
    setFormState((prev) => ({
      ...prev,
      step: prev.step < steps.length ? prev.step + 1 : prev.step,
    }));
    scrollToRef(formRef);
  };

  // mutation query
  const [editDelivery, { isLoading }] = useEditDeliveryMutation();

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
      try {

        await editDelivery({ payload: payload, id: id as string }).unwrap();
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

  return (
    <div className="py-10 sm:py-16 md:py-20 h-screen">
      <div ref={formRef} className="text-center ">
       <Greetings />
      </div>

      <div className="max-w-[1212px] border border-[#F5F5FA] rounded-2xl mx-auto bg-white py-10 md:px-[50px] md:py-12 lg:py-20 mt-10">
        {isFetchingDelivery ? (
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
                    Loading delivery details...
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
          <>
            {/* steps buttons  */}
            <div className="w-full overflow-x-scroll flex ">
              {steps.map((step) => (
                <div key={step.id} className="flex items-center">
                  <button
                    className={` font-fellix-bold text-sm transition-all ease-in-out duration-200 px-5 h-12 rounded-2xl inline-flex items-center justify-center gap-x-4  ${
                      step.id === formState.step
                        ? "text-primaryBlue border  border-primaryBlue"
                        : "text-secondaryGray"
                    }`}
                    onClick={() =>
                      setFormState({ ...formState, step: step.id })
                    }
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
            {/* mutation erros displaying */}

            {/* form */}
            <form
              onSubmit={formik.handleSubmit}
              className=" max-w-[632px] mt-10 md:mt-12"
            >
              {/* componet form render */}
              {renderStep()}

              <div className="flex gap-x-5 mt-10 w-full px-4 justify-center max-w-[538px] md:mt-14 md:px-0">
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
                    "Update"
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
      {/* modals  */}
      {/* success modal */}
      <SuccessModal
        isSuccessModal={isSuccessModal}
        toggleSuccessModal={toggleSuccessModal}
        message="Delivery updated successfully!"
      />
      {/* warning modal */}
      <Warning
        isSuccessModal={is_warning}
        toggleSuccessModal={toggleWarningModal}
      />
    </div>
  );
};

export default EditDelivery;
