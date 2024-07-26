import React, { useState } from "react";
import Vehicle from "../../components/Vehicle";
import ContactInfo from "../../components/ContactInfo";
import DeliveryInfo from "../../components/DeliveryInfo";
import SuccessModal from "./SuccessModal.tsx";
import AnimatedWrapper from "../../components/AnimatedWrapper.tsx";
import emailjs from "@emailjs/browser";

const steps = [
  {
    id: 1,
    name: "Vehicle",
  },
  {
    id: 2,
    name: "Contact Information",
  },
  {
    id: 3,
    name: "Delivery Information",
  },
];

const Haulage = () => {
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropupLocation, setDropupLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    receiverName: "",
    receiverPhone: ""
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object
    const formData = new FormData();
    formData.append("Vehicle", selectedVehicle);
    formData.append("pickup", pickupLocation);
    formData.append("dropup", dropupLocation);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    // Append other form values
    for (const [key, value] of Object.entries(values)) {
      formData.append(key, value);
    }
    const payload = {
      data: {
        Email: values.email,
        Phone: values.phone,
        Vehicle: selectedVehicle,
        Pickup: pickupLocation,
        Dropup: dropupLocation,
        Description: description,
        Image: image,
        "First Name": values.firstname,
        "Last Name": values.lastname,
        "Receiver Name": values.receiverName,
        "Receiver Phone": values.receiverPhone
      }
    };
    try {
      // Send formData via API call
      const response = await fetch("https://api.apispreadsheets.com/data/M89xMKRGeSutG8Hw/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 201) {
        // alert('Form submitted successfully');
        console.log(payload);
        toggleSuccessModal();
        sendEmail();
      } else {
        alert('Failed to submit form');
      }
    } catch (error) {
      console.error("Form submission error:", error);
      // Handle error (e.g., show an error message)
    }
  };
  const templateParams = {
    from_name:'Karria',
    from_email:'bakale.mahmud@gmail.com',
    to_email: values.email,
    message: 'Your request has been received we get back you within an hour!!'
  };
  const sendEmail = () => {
    emailjs.send('service_i1ey256', 'template_vrkftnk', templateParams, '9Sc5baeOyuc0U36Hk')
        .then((response) => {
          console.log('Email sent successfully!', response.status, response.text);
        }, (error) => {
          console.error('Failed to send email', error);
        });
  };
  const toggleSuccessModal = () => setIsSuccessModal(prev => !prev);

  const [formState, setFormState] = useState({
    step: steps[0].id,
  });


  const handleBack = () => {
    setFormState((prev) => ({
      ...prev,
      step: prev.step > 1 ? prev.step - 1 : prev.step,
    }));
  };

  const handleNext = () => {
    setFormState((prev) => ({
      ...prev,
      step: prev.step < steps.length ? prev.step + 1 : prev.step,
    }));
  };

  const renderStep = () => {
    switch (formState.step) {
      case 1:
        return (
            <AnimatedWrapper key={1}>
              <Vehicle
                  selectedVehicle={selectedVehicle} setSelectedVehicle={setSelectedVehicle}
              />
            </AnimatedWrapper>
        );
      case 2:
        return (
            <AnimatedWrapper key={2}>
              <ContactInfo
                  values={values} handleChange={handleInputChange} errors={errors}
              />
            </AnimatedWrapper>
        );
      case 3:
        return (
            <AnimatedWrapper key={3}>
              <DeliveryInfo
                  pickupLocation={pickupLocation}
                  setPickupLocation={setPickupLocation}
                  dropupLocation={dropupLocation}
                  setDropupLocation={setDropupLocation}
                  description={description}
                  setDescription={setDescription}
                  image={image}
                  handleImageChange={handleImageChange}
              />
            </AnimatedWrapper>
        );
      default:
        return (
            <AnimatedWrapper key={1}>
              <Vehicle />
            </AnimatedWrapper>
        );
    }
  };

  return (
      <div className="w-full max-w-[1440px] mx-auto p-4">
        <div className="max-w-[1212px] border border-[#F5F5FA] rounded-2xl mx-auto bg-white py-10 md:px-[50px] md:py-12 lg:py-20">
          <div className="w-full overflow-x-scroll flex ">
            {steps.map((step) => (
                <div key={step.id} className="flex items-center">
                  <button
                      className={`font-fellix-bold text-sm transition-all ease-in-out duration-200 px-5 h-12 rounded-2xl inline-flex items-center justify-center gap-x-4 ${
                          step.id === formState.step
                              ? "text-primaryBlue border border-primaryBlue"
                              : "text-secondaryGray"
                      }`}
                      onClick={() => setFormState({ ...formState, step: step.id })}
                  >
                <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center border text-sm transition-all ease-in-out duration-200 ${
                        step.id === formState.step
                            ? "border-primaryBlue"
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
                        strokeLinecap="round"
                        strokeDasharray="2 4"
                    />
                  </svg>
                </div>
            ))}
          </div>

          <form className="max-w-[632px] mt-10 md:mt-12" onSubmit={handleSubmit}>
            {renderStep()}

            <div className="flex gap-x-5 mt-10 w-full justify-center max-w-[538px] md:mt-14">
              <button
                  onClick={handleBack}
                  disabled={formState.step === 1}
                  type="button"
                  className="h-[48px] inline-flex items-center justify-center capitalize border border-primaryBlue text-primaryBlue font-bold rounded-lg w-full sm:max-w-[180px]"
              >
                Back
              </button>

              <button
                  onClick={
                    formState.step === steps.length
                        ? handleSubmit
                        : handleNext
                  }
                  className={`h-[48px] bg-primaryBlue text-white font-bold rounded-lg w-full shadow-active-shadow sm:max-w-[180px] ${
                      steps.length === formState.step ? "hidden" : ""
                  }`}
                  type="button"
              >
                {formState.step !== steps.length ? "Next" : "Get Estimates"}
              </button>
              <button
                  className={`h-[48px] bg-primaryBlue text-white font-bold rounded-lg w-full shadow-active-shadow sm:max-w-[180px] ${
                      steps.length !== formState.step ? "hidden" : ""
                  }`}
                  type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        <>
          <SuccessModal
              isSuccessModal={isSuccessModal}
              toggleSuccessModal={toggleSuccessModal}
          />
        </>
      </div>
  );
};

export default Haulage;
