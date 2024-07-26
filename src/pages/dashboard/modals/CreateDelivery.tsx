import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState, } from "react";
import { useFormik } from "formik";
import AnimatedWrapper from "../../../components/AnimatedWrapper";
import VehicleType from "../components/VehicleType";
import ReceiversInfo from "../components/ReceiversInfo";
import dayjs from "dayjs";


type Props = {
    isOpen: boolean;
    closeModal: () => void;
    
};

const steps = [
  {
    id: 1,
    title: "VehicleType",
  },
  {
    id: 2,
    title: "Receivers Information",
  },
];

export default function CreateDelivery({ isOpen, closeModal }: Props) {
    
 const [formState, setFormState] = useState({
   step: steps[0].id,
 });
    const formRef = useRef(null);
    // scroll to ref

    const scrollToRef = (ref: any) => {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

    // handle back
    const handleBack = () => {
      setFormState((prev) => ({
        ...prev,
        step: prev.step > 1 ? prev.step - 1 : prev.step,
      }));

      scrollToRef(formRef);
    };

    // handle next
    const handleNext = () => {
      setFormState((prev) => ({
        ...prev,
        step: prev.step < steps.length ? prev.step + 1 : prev.step,
      }));
      scrollToRef(formRef);
    };
  
  
  // formik form

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

    onSubmit: (values) => {
      console.log(values);
    },
  });

    const renderStep = () => {
      switch (formState.step) {
        case 1:
          return (
            <AnimatedWrapper key={1}>
              <VehicleType
                formik={formik}
              />
            </AnimatedWrapper>
          );
        case 2:
          return (
            <AnimatedWrapper key={2}>
              <ReceiversInfo
                formik={formik}
              />
            </AnimatedWrapper>
          );

        default:
          return (
            <AnimatedWrapper key={1}>
              <VehicleType
                formik={formik}
              />
            </AnimatedWrapper>
          );
      }
    };
 

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-[#041549] bg-opacity-[0.6]" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[841px] transform overflow-hidden rounded-3xl bg-white py-4 px-6 text-left align-middle shadow-xl transition-all md:py-[27px] md:px-[55px]">
                  <div
                    ref={formRef}
                    className="flex justify-between items-center border-b border-[#DDD] border-opacity-[0.3] pb-3"
                  >
                    <Dialog.Title
                      as="h3"
                      className="text-base font-groteska-medium text-solid-black sm:text-xl"
                    >
                    
                      {formState.step === 1
                        ? "Select Vehicle Type"
                        : "Enter Receivers Information"}
                    </Dialog.Title>
                    <span
                      onClick={closeModal}
                      className="w-8 h-8 bg-white shadow-close-shadow flex justify-center items-center rounded-full cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="16"
                        viewBox="0 0 17 16"
                        fill="none"
                      >
                        <path
                          d="M12.5 4L4.5 12"
                          stroke="#434343"
                          stroke-width="1.33333"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M4.5 4L12.5 12"
                          stroke="#434343"
                          stroke-width="1.33333"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="">
                    <div className="mt-4 sm:mt-6 sm:px-[46px]">
                      
                      {renderStep()}
                    </div>
                    <div className="flex flex-row items-center justify-center gap-x-6 sm:gap-x-[34px] mt-5 md:mt-12">
                      <button
                        onClick={() =>
                          formState.step === 1 ? closeModal() : handleBack()
                        }
                        className=" text-sm text-primaryBlue font-fellix-bold inline-flex items-center justify-center h-12  border border-primaryBlue rounded-xl w-[180px]"
                        type="button"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleNext}
                        className=" bg-primaryBlue text-sm text-white font-fellix-bold inline-flex items-center justify-center h-12 rounded-xl w-[180px]"
                        type="button"
                      >
                        {formState.step === steps.length ? "Submit" : "Next"}
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
