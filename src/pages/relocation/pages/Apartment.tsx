import { useState } from "react";
import DropZone from "../../../components/DropZone";
import Dropdown from "../../../components/shared/Dropdown";
import { apartment_types, floors, room_numbers } from "../../constants/data";

type Props = {
  formik: any;
};

interface IForm {
  apartmentType: string;
  room_number: string;
  moving_to: string;
  moving_from: string;
  no_loaders: string;
}

const Apartment = ({ formik }: Props) => {
  const [_, setFormData] = useState<IForm>({
    apartmentType: "",
    room_number: "",
    moving_to: "",
    moving_from: "",
    no_loaders: "",
  });

  const handleChange = (value: string, fieldName: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
    formik.setFieldValue(fieldName, value);
  };

 

  return (
    <div>
      <div className="w-full max-w-[537px] space-y-5 mt-8  md:space-y-[34px] ">
        <div className="flex flex-col gap-y-[8px]">
          <p className=" text-deepBlack font-fellix-regular text-base">
            Apartment Type
          </p>
          <div className="flex flex-col gap-y-4 sm:flex-row sm:gap-x-5 md:gap-x-[38px]">
            <Dropdown
              // value from formik
              picked={formik.values.mini_Flat ? formik.values.mini_Flat : ""}
              selectHandler={(value) => handleChange(value, "mini_Flat")}
              options={apartment_types}
              placeholder="Select apartment type"
            />
            <Dropdown
              picked={
                formik.values.numberOfRooms ? formik.values.numberOfRooms : ""
              }
              selectHandler={(value) => handleChange(value, "numberOfRooms")}
              options={["1", "2", "3", "4", "5"]}
              placeholder="Select number of rooms"
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-4 sm:flex-row sm:gap-x-5 md:gap-x-[38px]">
          <div className="flex w-full flex-col gap-y-[10px]">
            <label
              className="text text-deepBlack font-fellix-regular text-base"
              htmlFor="f_name"
            >
              Moving From
            </label>
            <Dropdown
              picked={formik.values.moving_From && formik.values.moving_From}
              options={floors}
              placeholder={`Select floor`}
              selectHandler={(value) => handleChange(value, "moving_From")}
            />
          </div>
          <div className="flex w-full flex-col gap-y-[10px]">
            <label
              className="text text-deepBlack font-fellix-regular text-base"
              htmlFor="moving_to"
            >
              Moving To
            </label>
            <Dropdown
              picked={formik.values.moving_To && formik.values.moving_To}
              options={floors}
              placeholder={`Select floor`}
              selectHandler={(value) => handleChange(value, "moving_To")}
            />
          </div>
        </div>
        <div className="flex w-full flex-col gap-y-[10px]">
          <label
            className="text text-deepBlack font-fellix-regular text-base"
            htmlFor="loaders"
          >
            Loaders (optional)
          </label>
          <Dropdown
            picked={
              formik.values.loaders && formik.values.loaders
            }
            options={room_numbers}
            placeholder={`Select number of loaders`}
            selectHandler={(value) => handleChange(value, "loaders")}
          />
        </div>
        <div className="flex flex-col gap-y-[8px]">
          <label htmlFor="video_image" className="text-[#333]">
            Image (optional)
          </label>
          <DropZone
            formik={formik}
            field_name="Image_Url"
            file_name="a_file"
          />
        </div>

        {/* <div className="flex flex-col py-8 gap-y-5 sm:flex-row sm:gap-x-[33px] sm:justify-center sm:py-10">
          <Link
            className="h-[48px] inline-flex items-center justify-center capitalize border border-primaryBlue text-primaryBlue font-bold rounded-lg w-full  sm:max-w-[180px]"
            to={`/about-us`}
          >
            back
          </Link>
          <button
            className="h-[48px] bg-primaryBlue text-white font-bold rounded-lg w-full shadow-active-shadow sm:max-w-[180px]"
            type="button"
          >
            Submit
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Apartment;
