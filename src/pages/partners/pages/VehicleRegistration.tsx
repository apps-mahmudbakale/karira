import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import AnimatedWrapper from "../../../components/AnimatedWrapper";
import { useRegisterVehicleMutation } from "../../../services/partnership/partnershipslice";
import VehicleDetails from "../VehicleDetails";
import VehicleType from "../VehicleType";
import SuccessModal from "./SuccessModal";
import extractTokenFromUrl from "../../../utils/extractTokenFromUrl";

const steps = [
  {
    id: 1,
    title: "VehicleType",
  },
  {
    id: 2,
    title: "Vehicle Details",
  },
];

const VehicleRegistration = () => {
  const [formState, setFormState] = useState({
    step: steps[0].id,
    is_pageone_valid: false,
  });
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  
   useEffect(() => {
     const url = window.location.href; // Get the current URL
     const extractedToken = extractTokenFromUrl(url);
     setToken(extractedToken);
   }, []);

   


  const toggleCompleteModal = () => setIsComplete((prev) => !prev);

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

  // form submissions and mutation

  const [registerVehicle, { isLoading }] = useRegisterVehicleMutation();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      drivers_License_url: "",
      profile_photo_url: "",
      vehicleDetails: {
        vehicle_Manufactural: "",
        color: "",
        tonage: "",
        plate_No: "",
        vehicle_Year: "",
      },
      vehicle_exterior_url: "",
      vehicle_interior_url: "",
      proof_of_ownership_cert_url: "",
      cert_of_road_worthiness_url: "",
      lassra_card_url: "",
      gender: "",
      exterior_url: null,
      interior_url: null,
      ownership_cert_url: null,
      road_worthiness_cert_url: null,
      card_url: null,
      photo_url: null,
      license_url: null,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      drivers_License_url: Yup.string().required("Drivers License is required"),
      profile_photo_url: Yup.string().required("Profile Photo is required"),
      vehicleDetails: Yup.object({
        vehicle_Manufactural: Yup.string().required(
          "Vehicle Manufactural is required"
        ),
        color: Yup.string().required("Color is required"),
        tonage: Yup.string().required("Tonage is required"),
        plate_No: Yup.string().required("Plate No is required"),
        vehicle_Year: Yup.string().required("Vehicle Year is required"),
      }),
      vehicle_exterior_url: Yup.string().required(
        "Vehicle Exterior is required"
      ),
      vehicle_interior_url: Yup.string().required(
        "Vehicle Interior is required"
      ),
      proof_of_ownership_cert_url: Yup.string().required(
        "Proof of Ownership is required"
      ),
      cert_of_road_worthiness_url: Yup.string().required(
        "Cert of Road Worthiness is required"
      ),
      lassra_card_url: Yup.string().required("Lassra Card is required"),
      gender: Yup.string().required("Gender is required"),
    }),

    onSubmit: async (values) => {
      const data = {
        firstName: values.firstName,
        lastName: values.lastName,
        drivers_License_url: values.drivers_License_url,
        profile_photo_url: values.profile_photo_url,
        vehicleDetails: {
          vehicle_Manufactural: values.vehicleDetails.vehicle_Manufactural,
          color: values.vehicleDetails.color,
          tonage: values.vehicleDetails.tonage,
          plate_No: values.vehicleDetails.plate_No,
          vehicle_Year: values.vehicleDetails.vehicle_Year,
        },
        gender: values.gender,

        vehicle_exterior_url: values.vehicle_exterior_url,
        vehicle_interior_url: values.vehicle_interior_url,
        proof_of_ownership_cert_url: values.proof_of_ownership_cert_url,
        cert_of_road_worthiness_url: values.cert_of_road_worthiness_url,
        lassra_card_url: values.lassra_card_url,
      };
      try {
        await registerVehicle({ payload: data, id:token as string }).unwrap();

        toggleCompleteModal();
      } catch (error) {
        toast.error((error as any).data.message, {
          className:
            "!bg-red-500 !text-white !font-fellix-regular !tracking-wider !py-2 !px-4 !rounded",
        });
      }
    },
  });

 

  // handle next
  const handleNext = () => {
    if (
      formik.values.firstName &&
      formik.values.lastName &&
      formik.values.vehicleDetails.vehicle_Manufactural &&
      formik.values.vehicleDetails.color &&
      formik.values.vehicleDetails.tonage &&
      formik.values.vehicleDetails.plate_No &&
      formik.values.vehicleDetails.vehicle_Year &&
      formik.values.gender
    ) {
      setFormState((prev) => ({
        ...prev,
        is_pageone_valid: true,
        step: prev.step + 1,
      }));
      scrollToRef(formRef);
    } else {
      toast.error(
        "Please fill the fields below to continue to the next page",
        {
          className:
            "!bg-red-500 !text-white !font-fellix-regular !tracking-wider !py-2 !px-4 !rounded",
          position: "top-center"
        }
        
      );
    }
  };

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
            <VehicleDetails formik={formik} />
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
    <div className="w-full mx-auto max-w-[1440px]">
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-[1440px] md:px-24 lg:px-8 lg:py-20">
        <div className="py-10 flex flex-col w-full items-center mx-auto bg-primaryBlue   rounded-2xl   max-w-[1076px] sm:py-16">
          <div className="w-full flex flex-col items-center gap-y-2">
            <h1 className="text-white font-bold text-xl md:text-5xl ">
              Make Money Driving With Karria!
            </h1>
            <div className="flex items-center gap-x-2">
              <Link
                to="/partner-with-us"
                className="text-white font-fellix-medium   sm:text-xl"
              >
                Home
              </Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="4"
                height="4"
                viewBox="0 0 4 4"
                fill="none"
              >
                <circle cx="2" cy="2" r="2" fill="#C4C4C4" />
              </svg>
              <span
                ref={formRef}
                className="text-white font-fellix-bold sm:text-xl"
              >
                Partner with us
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* dynamic content goes here */}

      <div className="">
        <form
          onSubmit={formik.handleSubmit}
          className="w-full max-w-[1212px] px-5  mx-auto border border-[#F5F5FA] py-16 rounded-2xl shadow-towing-card-shadow bg-white md:px-[50px]"
        >
          {renderStep()}

          <div
            className={`flex flex-row   items-center mt-10 gap-x-4 w-full max-w-[538px] md:mt-14 lg:mt-24 ${
              formState.step === 1 ? "justify-center" : " justify-start"
            }`}
          >
            <button
              onClick={handleBack}
              type="button"
              className={`h-[48px] inline-flex items-center justify-center capitalize border border-primaryBlue text-primaryBlue font-bold rounded-lg w-[180px] ${
                formState.step === 1 ? "hidden" : "block"
              }`}
            >
              Back
            </button>
            <button
              onClick={handleNext}
              type="button"
              className={`text-white font-fellix-medium text-xl bg-primaryBlue w-[180px] py-3 rounded-lg shadow-next-btn ${
                formState.step === steps.length ? "hidden" : "block"
              }`}
            >
              {formState.step === steps.length ? "Submit" : "Next"}
            </button>
            <button
              type="submit"
              className={`text-white font-fellix-medium text-xl bg-primaryBlue w-[180px] py-3 rounded-lg shadow-next-btn ${
                formState.step === steps.length ? "block" : "hidden"
              }`}
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
      {/* modal section */}
      <>
        <SuccessModal
          isComplete={isComplete}
          toggleComplete={toggleCompleteModal}
          title="Vehicle Registration Successful"
          message="Your vehicle registration has been successfully submitted and is currently under review. You will be notified once your vehicle registration has been approved."
        />
      </>
    </div>
  );
};

export default VehicleRegistration;
