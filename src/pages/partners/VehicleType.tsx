import React from 'react'
import { motion } from 'framer-motion';
import { vehicle_types } from '../../constants/data';
import Dropdown from '../../components/shared/Dropdown';
import ErrorMessage from '../business/pages/ErrorMessage ';


type Props = {
  formik: any;
};

interface ISelectType { 
  id: number;
  name: string;
  options: string[];
  field_name: string;
  placeholder: string;
}



const select_type: ISelectType[] = [
  {
    id: 1,
    name: "Vehicle manufacturer",
    options: ["Toyota", "Honda", "Mazda"],
    field_name: "vehicle_Manufactural",
    placeholder: "Select manufacturer",
  },

  {
    id: 3,
    name: "Vehicle color",
    options: ["Red", "Blue", "Green"],
    field_name: "color",
    placeholder: "Select color",
  },
  {
    id: 2,
    name: "Vehicle year",
    options: ["2018", "2019", "2020"],
    field_name: "vehicle_Year",
    placeholder: "Select year",
  },
  {
    id: 4,
    name: "Vehicle tonnage",
    options: ["1 ton", "2 ton", "3 ton"],
    field_name: "tonage",
    placeholder: "Select tonnage",
  },
];

const VehicleType = ({formik}:Props) => {
  const [selected, setSelected] = React.useState<string | null>(vehicle_types[0]);

 

  return (
    <div className="w-full ">
      <h1 className=" text-secondaryBlack font-fellix-regular text-lg text-center sm:text-start sm:text-xl">
        Enter the type of vehicle you want to register with us.
      </h1>
      <div className="buttons-scroll overflow-x-auto flex flex-row gap-2.5 mt-5 sm:mt-[43px]">
        {vehicle_types.map((type) => (
          // button
          <button
            type="button"
            onClick={() => setSelected(type)}
            key={type}
            className={`min-w-[135px] h-[45px] flex items-center justify-center text-lg rounded-lg transition-all ease-in-out duration-200 ${
              selected === type
                ? "bg-primaryBlue text-white font-fellix-semibold"
                : "bg-white font-fellix-regular text-secondaryBlack border border-grey-02"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* form section */}
      <div className="max-w-[538px] mt-8 sm:mt-[42px]">
        <h1 className="text-[18px] pb-[22px] font-fellix-semibold md:text-xl">
          Vehicle Details
        </h1>
        <div className="w-full  flex flex-col gap-y-5 md:gap-y-[34px]">
          <div className="flex flex-col gap-y-4 sm:flex-row sm:gap-x-5 md:gap-x-[38px]">
            <div className="flex w-full flex-col gap-y-[10px]">
              <label
                className="text text-deepBlack font-fellix-regular text-base"
                htmlFor="f_name"
              >
                First name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                {...formik.getFieldProps("firstName")}
                placeholder="First name"
                className="w-full py-3 rounded-lg text-primaryBlack font-fellix-regular bg-[#FAFAFC] border border-[#DDD] px-4 outline-none placeholder:text-grey-00 focus:border-primaryBlue"
              />
              <ErrorMessage formik={formik} name="firstName" />
            </div>
            <div className="flex w-full flex-col gap-y-[10px]">
              <label
                className="text text-deepBlack font-fellix-regular text-base"
                htmlFor="lastNname"
              >
                Last name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                {...formik.getFieldProps("lastName")}
                placeholder="Last name"
                className="w-full py-3 rounded-lg text-primaryBlack font-fellix-regular bg-[#FAFAFC] border border-[#DDD] px-4 outline-none placeholder:text-grey-00 focus:border-primaryBlue"
              />
              <ErrorMessage formik={formik} name="lastName" />
            </div>
          </div>
          <div className="flex w-full flex-col">
            <label
              className="text text-deepBlack font-fellix-regular text-base"
              htmlFor="gender"
            >
              Gender
            </label>
            <Dropdown
              picked={formik.values.gender}
              options={["male", "female"]}
              placeholder={"Select gender"}
              selectHandler={(value) => formik.setFieldValue("gender", value)}
            />
            {/* error message */}
            <ErrorMessage formik={formik} name={"gender"} />
          </div>

          <div className="w-full">
            <h1 className="text-[18px] font-fellix-semibold md:text-xl">
              Contact Information
            </h1>
            <div className="w-full max-w-[537px] mt-4 flex flex-col gap-y-5 md:mt-8 md:gap-y-[34px]">
              {select_type.map(
                ({ id, field_name, placeholder, options, name }) => (
                  <div key={id} className="flex w-full flex-col gap-y-[10px]">
                    <label
                      className="text text-deepBlack font-fellix-regular text-base capitalize"
                      htmlFor="vehicle_manufacturer"
                    >
                      {name}
                    </label>
                    <Dropdown
                      picked={formik.values.vehicleDetails[field_name]}
                      options={options}
                      placeholder={placeholder}
                      selectHandler={(value) =>
                        formik.setFieldValue(
                          `vehicleDetails.${field_name}`,
                          value
                        )
                      }
                    />
                    {/* error message */}
                    {
                      formik.touched.vehicleDetails?.[field_name] &&
                      formik.errors.vehicleDetails?.[field_name] ? (
                         <motion.div
                        initial={{ opacity: 0, y: "-10px" }}
                        animate={{ opacity: 1, y: "0px" }}
                        exit={{ opacity: 0, y: "-10px" }}
                        className="text-red-500 text-sm tracking-wider font-fellix-regular"
                          >
                        {formik.errors.vehicleDetails?.[field_name]}
                            
                      </motion.div>
                      ) : null
                    }
                  </div>
                )
              )}
              <div className="flex w-full flex-col gap-y-[10px]">
                <label
                  className="text text-deepBlack font-fellix-regular text-base"
                  htmlFor="license_plate"
                >
                  License plate
                </label>
                <input
                  type="text"
                  name="license_plate"
                  id="license_plate"
                  {...formik.getFieldProps("vehicleDetails.plate_No")}
                  placeholder="Enter plate no."
                  className="w-full py-3 rounded-lg text-primaryBlack font-fellix-regular bg-[#FAFAFC] border border-[#DDD] px-4 outline-none placeholder:text-grey-00 focus:border-primaryBlue"
                />
                {formik.touched.vehicleDetails?.plate_No &&
                formik.errors.vehicleDetails?.plate_No ? (
                  <motion.div
                        initial={{ opacity: 0, y: "-10px" }}
                        animate={{ opacity: 1, y: "0px" }}
                        exit={{ opacity: 0, y: "-10px" }}
                        className="text-red-500 text-sm tracking-wider font-fellix-regular"
                    >
                      {formik.errors.vehicleDetails?.plate_No}
                      </motion.div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleType
