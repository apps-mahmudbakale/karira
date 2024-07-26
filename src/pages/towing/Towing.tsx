import React, { useState } from "react";
import Dropdown from "./components/Dropdown";
import SuccessModal from "./SuccessModal.tsx";
import emailjs from '@emailjs/browser';

const Towing = () => {
    const [isSuccessModal, setIsSuccessModal] = useState(false);
    const [formValues, setFormValues] = useState({
        pick: '',
        drop: '',
        vehicleType: '',
        email: '',
        phone: '',
        scheduleDate: '',
        scheduleTime: '',
        image: null,
    });

    const handleSelect = (vehicle: any) => {
        setFormValues({
            ...formValues,
            vehicleType: vehicle
        });
    };

    const toggleSuccessModal = () => setIsSuccessModal(prev => !prev);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };


    const handleFileChange = (e: { target: { files: any[]; }; }) => {
        setFormValues({
            ...formValues,
            image: e.target.files[0]
        });
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const reader = new FileReader();
        reader.onloadend = async () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const base64String = reader.result.split(',')[1];
            const payload = {
                "data": {
                    "Email": formValues.email,
                    "Phone": formValues.phone,
                    "Time Stamp": new Date().toISOString(),
                    "Vehicle Type": formValues.vehicleType,
                    "Schedule Date": formValues.scheduleDate,
                    "Schedule Time": formValues.scheduleTime,
                    "Image (Base64)": base64String,
                    "Pickup Address": formValues.pickup,
                    "Dropoff Address": formValues.drop
                }
            };

            try {
                const response = await fetch("https://api.apispreadsheets.com/data/4yx4cfx2lDd03bO6/", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload),
                });

                if (response.status === 201) {
                    alert('Form submitted successfully');
                    console.log(payload);
                    toggleSuccessModal();
                    sendEmail();
                } else {
                    alert('Failed to submit form');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('Error submitting form');
            }
        };

        if (formValues.image) {
            reader.readAsDataURL(formValues.image);
        } else {
            alert('Please upload an image');
        }
    };

    const templateParams = {
        from_name:'Karria',
        from_email:'bakale.mahmud@gmail.com',
        to_email: formValues.email,
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


    return (
        <div className="w-full max-w-[1440px] mx-auto p-4">
            <div className="w-full max-w-[1212px] border border-[#F5F5FA] rounded-2xl bg-white py-10 mx-auto md:py-12 lg:py-20">
                <div className="max-w-[537px] mx-auto p-3 lg:p-0">
                    <div className="w-full flex flex-col gap-y-4 items-center justify-center md:gap-y-8">
                        <h1 className="text-center text-primaryBlack text-xl md:text-[24px]">
                            We understand your need might be an emergency
                        </h1>
                        <a
                            href="tel:+2349126266015"
                            className="h-[56px] max-w-[286px] w-full inline-flex items-center justify-center rounded-lg text-primaryBlue font-bold gap-x-[7px] border border-primaryBlue"
                        >
                            Call +2349126266015
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="22"
                                viewBox="0 0 22 22"
                                fill="none"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M1.99033 3.87254C2.30665 3.34878 4.0495 1.44376 5.29322 1.50127C5.665 1.53208 5.99364 1.75699 6.26067 2.01784C6.87379 2.61656 8.62897 4.88101 8.72859 5.35753C8.97096 6.52621 7.57833 7.1999 8.00454 8.37783C9.09112 11.0366 10.9634 12.9088 13.6233 13.9943C14.8003 14.4205 15.474 13.0279 16.6428 13.2713C17.1183 13.3709 19.3839 15.126 19.9826 15.7391C20.2425 16.0051 20.4684 16.3347 20.4992 16.7065C20.5454 18.0159 18.5222 19.7833 18.1278 20.0092C17.1974 20.6747 15.9834 20.6634 14.5035 19.9753C10.3739 18.2572 3.77426 11.7822 2.02422 7.49669C1.35461 6.02505 1.30839 4.80297 1.99033 3.87254Z"
                                    stroke="#407BFF"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </a>
                        <p className="text-[#718096]">Or</p>
                    </div>

                    {/* Form Section */}
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-y-[8px]">
                            <label htmlFor="pickup" className="text-[#333]">
                                Pickup Location
                            </label>
                            <div className="w-full relative">
                                <input
                                    type="text"
                                    name="pickup"
                                    id="pickup"
                                    className="w-full border border-[#DDD] bg-[#FAFAFC] text-deepBlack font-fellix-regular rounded-lg py-3 px-4 outline-none sm:px-[18px] focus:outline-none placeholder:text-[#758494]"
                                    onChange={handleChange}
                                />
                                <svg
                                    className="absolute top-1/2 right-4 transform -translate-y-1/2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="20"
                                    viewBox="0 0 18 20"
                                    fill="none"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M9.0288 4.99595e-05C4.41977 -0.0156082 0.655096 3.65135 0.504628 8.24135L0.5 8.52625C0.576609 10.7761 1.34207 12.9207 2.69028 14.6876L3.00692 15.1008C4.2938 16.7371 5.82311 18.1733 7.54027 19.3571L7.95372 19.6354L8.01404 19.6828C8.6026 20.1057 9.39726 20.1057 9.98581 19.6828L10.036 19.6415C11.3986 18.7579 12.655 17.7196 13.7805 16.5473C16.0686 14.1252 17.4477 11.4112 17.4998 8.65498L17.4999 8.55264C17.5155 3.93192 13.8598 0.15567 9.28396 0.00469042L9.0288 4.99595e-05ZM9.02366 1.51747C12.8022 1.53038 15.87 4.54942 15.9839 8.30911L15.9871 8.64061C15.9434 10.9514 14.7334 13.3324 12.6866 15.4991C11.6429 16.5862 10.4727 17.5526 9.20356 18.3745L9.11897 18.438C9.05062 18.4974 8.94923 18.4974 8.88088 18.438L8.79867 18.376C6.90797 17.1416 5.24857 15.583 3.89636 13.7717C2.80718 12.3442 2.16175 10.6374 2.03184 8.85689L2.01275 8.49986C2.02559 4.71221 5.03532 1.63498 8.78345 1.52071L9.02366 1.51747ZM8.99993 5.40129C7.21153 5.40129 5.76176 6.85554 5.76176 8.64946C5.76176 10.4434 7.21153 11.8976 8.99993 11.8976C10.7883 11.8976 12.2381 10.4434 12.2381 8.64946C12.2381 6.85554 10.7883 5.40129 8.99993 5.40129ZM8.99993 6.91871C9.95285 6.91871 10.7253 7.69359 10.7253 8.64946C10.7253 9.60534 9.95285 10.3802 8.99993 10.3802C8.04699 10.3802 7.27454 9.60534 7.27454 8.64946C7.27454 7.69359 8.04699 6.91871 8.99993 6.91871Z"
                                        fill="#0F0F11"
                                    />
                                </svg>
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-[8px] mt-5">
                            <label htmlFor="drop" className="text-[#333]">
                                Drop Location
                            </label>
                            <div className="w-full relative">
                                <input
                                    type="text"
                                    name="drop"
                                    id="drop"
                                    className="w-full border border-[#DDD] bg-[#FAFAFC] text-deepBlack font-fellix-regular rounded-lg py-3 px-4 outline-none sm:px-[18px] focus:outline-none placeholder:text-[#758494]"
                                    onChange={handleChange}
                                />
                                <svg
                                    className="absolute top-1/2 right-4 transform -translate-y-1/2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="20"
                                    viewBox="0 0 18 20"
                                    fill="none"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M9.0288 4.99595e-05C4.41977 -0.0156082 0.655096 3.65135 0.504628 8.24135L0.5 8.52625C0.576609 10.7761 1.34207 12.9207 2.69028 14.6876L3.00692 15.1008C4.2938 16.7371 5.82311 18.1733 7.54027 19.3571L7.95372 19.6354L8.01404 19.6828C8.6026 20.1057 9.39726 20.1057 9.98581 19.6828L10.036 19.6415C11.3986 18.7579 12.655 17.7196 13.7805 16.5473C16.0686 14.1252 17.4477 11.4112 17.4998 8.65498L17.4999 8.55264C17.5155 3.93192 13.8598 0.15567 9.28396 0.00469042L9.0288 4.99595e-05ZM9.02366 1.51747C12.8022 1.53038 15.87 4.54942 15.9839 8.30911L15.9871 8.64061C15.9434 10.9514 14.7334 13.3324 12.6866 15.4991C11.6429 16.5862 10.4727 17.5526 9.20356 18.3745L9.11897 18.438C9.05062 18.4974 8.94923 18.4974 8.88088 18.438L8.79867 18.376C6.90797 17.1416 5.24857 15.583 3.89636 13.7717C2.80718 12.3442 2.16175 10.6374 2.03184 8.85689L2.01275 8.49986C2.02559 4.71221 5.03532 1.63498 8.78345 1.52071L9.02366 1.51747ZM8.99993 5.40129C7.21153 5.40129 5.76176 6.85554 5.76176 8.64946C5.76176 10.4434 7.21153 11.8976 8.99993 11.8976C10.7883 11.8976 12.2381 10.4434 12.2381 8.64946C12.2381 6.85554 10.7883 5.40129 8.99993 5.40129ZM8.99993 6.91871C9.95285 6.91871 10.7253 7.69359 10.7253 8.64946C10.7253 9.60534 9.95285 10.3802 8.99993 10.3802C8.04699 10.3802 7.27454 9.60534 7.27454 8.64946C7.27454 7.69359 8.04699 6.91871 8.99993 6.91871Z"
                                        fill="#0F0F11"
                                    />
                                </svg>
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-[8px] mt-5">
                            <label htmlFor="vehicleType" className="text-[#333]">
                                Select Vehicle Type
                            </label>
                            <div className="w-full">
                                <Dropdown
                                    name="vehicleType"
                                    id="vehicleType"
                                    onSelect={handleSelect}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-[8px] mt-5">
                            <label htmlFor="email" className="text-[#333]">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="w-full border border-[#DDD] bg-[#FAFAFC] text-deepBlack font-fellix-regular rounded-lg py-3 px-4 outline-none sm:px-[18px] focus:outline-none placeholder:text-[#758494]"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex flex-col gap-y-[8px] mt-5">
                            <label htmlFor="phone" className="text-[#333]">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                className="w-full border border-[#DDD] bg-[#FAFAFC] text-deepBlack font-fellix-regular rounded-lg py-3 px-4 outline-none sm:px-[18px] focus:outline-none placeholder:text-[#758494]"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex flex-col gap-y-[8px] mt-5">
                            <label htmlFor="image" className="text-[#333]">
                                Upload Image
                            </label>
                            <input
                                type="file"
                                name="image"
                                id="image"
                                className="w-full border border-[#DDD] bg-[#FAFAFC] text-deepBlack font-fellix-regular rounded-lg py-3 px-4 outline-none sm:px-[18px] focus:outline-none placeholder:text-[#758494]"
                                onChange={handleFileChange}
                            />
                        </div>

                        <div className="flex flex-col gap-y-[8px] mt-5">
                            <label htmlFor="scheduleDate" className="text-[#333]">
                                Schedule Date
                            </label>
                            <input
                                type="date"
                                name="scheduleDate"
                                id="scheduleDate"
                                className="w-full border border-[#DDD] bg-[#FAFAFC] text-deepBlack font-fellix-regular rounded-lg py-3 px-4 outline-none sm:px-[18px] focus:outline-none placeholder:text-[#758494]"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex flex-col gap-y-[8px] mt-5">
                            <label htmlFor="scheduleTime" className="text-[#333]">
                                Schedule Time
                            </label>
                            <input
                                type="time"
                                name="scheduleTime"
                                id="scheduleTime"
                                className="w-full border border-[#DDD] bg-[#FAFAFC] text-deepBlack font-fellix-regular rounded-lg py-3 px-4 outline-none sm:px-[18px] focus:outline-none placeholder:text-[#758494]"
                                onChange={handleChange}
                            />
                        </div>

                        <button
                            type="submit"
                            className="h-[56px] mt-5 w-full inline-flex items-center justify-center rounded-lg text-white bg-primaryBlue font-bold"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
            {/* modal section */}
            <>
                <SuccessModal
                    isSuccessModal={isSuccessModal}
                    toggleSuccessModal={toggleSuccessModal}
                />
            </>
        </div>
    );
};

export default Towing;
