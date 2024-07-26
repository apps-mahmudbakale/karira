import { TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { ClassAttributes, InputHTMLAttributes } from "react";
import { JSX } from "react/jsx-runtime";
import DropZone from "../../../components/DropZone";
import LocationSearch from "../../../components/LocationSearch";

type LocationProps = {
  formik: any
}

const Location = ({formik}:LocationProps) => {
 

  

  return (
    <div>
      <div className="w-full max-w-[537px] space-y-5 mt-8  md:space-y-[34px] ">
        <div className="flex flex-col gap-y-[8px]">
          <label
            htmlFor="location"
            className="text-[#333] text-base font-fellix-regular"
          >
            Pickup Location
          </label>
          <div className="w-full relative">
            <LocationSearch formik={formik} name="pick" />

            <svg
              className="absolute top-1/2 right-4 transform -translate-y-1/2"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="20"
              viewBox="0 0 18 20"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.0288 4.99595e-05C4.41977 -0.0156082 0.655096 3.65135 0.504628 8.24135L0.5 8.52625C0.576609 10.7761 1.34207 12.9207 2.69028 14.6876L3.00692 15.1008C4.2938 16.7371 5.82311 18.1733 7.54027 19.3571L7.95372 19.6354L8.01404 19.6828C8.6026 20.1057 9.39726 20.1057 9.98581 19.6828L10.036 19.6415C11.3986 18.7579 12.655 17.7196 13.7805 16.5473C16.0686 14.1252 17.4477 11.4112 17.4998 8.65498L17.4999 8.55264C17.5155 3.93192 13.8598 0.15567 9.28396 0.00469042L9.0288 4.99595e-05ZM9.02366 1.51747C12.8022 1.53038 15.87 4.54942 15.9839 8.30911L15.9871 8.64061C15.9434 10.9514 14.7334 13.3324 12.6866 15.4991C11.6429 16.5862 10.4727 17.5526 9.20356 18.3745L9.11897 18.438C9.05062 18.4974 8.94923 18.4974 8.88088 18.438L8.79867 18.376C6.90797 17.1416 5.24857 15.583 3.89636 13.7717C2.80718 12.3442 2.16175 10.6374 2.03184 8.85689L2.01275 8.49986C2.02559 4.71221 5.03532 1.63498 8.78345 1.52071L9.02366 1.51747ZM8.99993 5.40129C7.21153 5.40129 5.76176 6.85554 5.76176 8.64946C5.76176 10.4434 7.21153 11.8976 8.99993 11.8976C10.7883 11.8976 12.2381 10.4434 12.2381 8.64946C12.2381 6.85554 10.7883 5.40129 8.99993 5.40129ZM8.99993 6.91871C9.95285 6.91871 10.7253 7.69359 10.7253 8.64946C10.7253 9.60532 9.95285 10.3802 8.99993 10.3802C8.04701 10.3802 7.27451 9.60532 7.27451 8.64946C7.27451 7.69359 8.04701 6.91871 8.99993 6.91871Z"
                fill="#407BFF"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-col gap-y-[8px]">
          <label
            htmlFor="drop_location"
            className="text-[#333] text-base font-fellix-regular"
          >
            Drop off Location
          </label>
          <div className="w-full relative">
            <LocationSearch formik={formik} name="drop" />

            <svg
              className="absolute top-1/2 right-4 transform -translate-y-1/2"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="20"
              viewBox="0 0 18 20"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.0288 4.99595e-05C4.41977 -0.0156082 0.655096 3.65135 0.504628 8.24135L0.5 8.52625C0.576609 10.7761 1.34207 12.9207 2.69028 14.6876L3.00692 15.1008C4.2938 16.7371 5.82311 18.1733 7.54027 19.3571L7.95372 19.6354L8.01404 19.6828C8.6026 20.1057 9.39726 20.1057 9.98581 19.6828L10.036 19.6415C11.3986 18.7579 12.655 17.7196 13.7805 16.5473C16.0686 14.1252 17.4477 11.4112 17.4998 8.65498L17.4999 8.55264C17.5155 3.93192 13.8598 0.15567 9.28396 0.00469042L9.0288 4.99595e-05ZM9.02366 1.51747C12.8022 1.53038 15.87 4.54942 15.9839 8.30911L15.9871 8.64061C15.9434 10.9514 14.7334 13.3324 12.6866 15.4991C11.6429 16.5862 10.4727 17.5526 9.20356 18.3745L9.11897 18.438C9.05062 18.4974 8.94923 18.4974 8.88088 18.438L8.79867 18.376C6.90797 17.1416 5.24857 15.583 3.89636 13.7717C2.80718 12.3442 2.16175 10.6374 2.03184 8.85689L2.01275 8.49986C2.02559 4.71221 5.03532 1.63498 8.78345 1.52071L9.02366 1.51747ZM8.99993 5.40129C7.21153 5.40129 5.76176 6.85554 5.76176 8.64946C5.76176 10.4434 7.21153 11.8976 8.99993 11.8976C10.7883 11.8976 12.2381 10.4434 12.2381 8.64946C12.2381 6.85554 10.7883 5.40129 8.99993 5.40129ZM8.99993 6.91871C9.95285 6.91871 10.7253 7.69359 10.7253 8.64946C10.7253 9.60532 9.95285 10.3802 8.99993 10.3802C8.04701 10.3802 7.27451 9.60532 7.27451 8.64946C7.27451 7.69359 8.04701 6.91871 8.99993 6.91871Z"
                fill="#407BFF"
              />
            </svg>
          </div>
        </div>
        <div className="w-full flex flex-col gap-y-[8px]">
          <label
            htmlFor="vehicle"
            className="text-[#333] text-base font-fellix-regular"
          >
            Description
          </label>
          <textarea
            id="message"
            className="block p-3 min-h-[174px] w-full text-sm text-gray-900 border-[#DDD] rounded-lg border outline-none focus:outline-none bg-transparent placeholder:max-w-[329px] placeholder:text-grey-00 placeholder:font-fellix-regular placeholder:text-base"
            {...formik.getFieldProps("description")}
            placeholder="Enter the item you’re trying to move e.g Bag of clothes, Furniture set, Freezer etc. "
          ></textarea>
        </div>

        <div className="">
          <DropZone
            formik={formik}
            field_name="upload_Url"
            file_name="l_file"
          />
        </div>

        <div className="w-full">
          <p className="text-[#333] text-base font-fellix-regular">Schedule</p>
          <div className="flex w-full flex-col gap-y-4 sm:flex-row sm:gap-x-5 md:gap-x-[38px] mt-2">
            <div className="w-full">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      border: "#DDD",
                      boxShadow: "none",
                      outline: "none",
                      height: "48px",
                      borderRadius: "8px",
                      backgroundColor: "#FAFAFC",
                      color: "#333",
                      fontFamily: "Fellix-regular",

                      "&.Mui-focused": {
                        border: "#DDD",
                        boxShadow: "none",
                        outline: "none",
                      },
                      ".MuiDateCalendar-root": {
                        color: "#1565c0",
                        borderRadius: 11,
                        borderWidth: 1,
                        borderColor: "#DDDDDD",
                        border: "1px solid",
                        backgroundColor: "#FAFAFC",
                        fontFamily: "Fellix-regular",
                        boxShadow: "none",
                      },
                    },
                  }}
                  className=" text-deepBlack font-fellix-regular"
                  {...formik.getFieldProps("date")}
                  onChange={
                    (date: any) => {
                      formik.setFieldValue("date", date);
                    }
                    // formik.handleChange("date")
                  }
                />
              </LocalizationProvider>
            </div>
            <div className="w-full">
              {/* <TimeComboBox
                formik={formik}
                
              /> */}

              {/* use mui time picker */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      border: "#DDD",
                      boxShadow: "none",
                      outline: "none",
                      height: "48px",
                      borderRadius: "8px",
                      backgroundColor: "#FAFAFC",
                      color: "#333",
                      fontFamily: "Fellix-regular",

                      "&.Mui-focused": {
                        border: "#DDD",
                        boxShadow: "none",
                        outline: "none",
                      },
                      ".MuiDateCalendar-root": {
                        color: "#1565c0",
                        borderRadius: 11,
                        borderWidth: 1,
                        borderColor: "#DDDDDD",
                        border: "1px solid",
                        backgroundColor: "#FAFAFC",
                        fontFamily: "Fellix-regular",
                        boxShadow: "none",
                      },
                    },
                  }}
                  className=" text-deepBlack font-fellix-regular"
                  {...formik.getFieldProps("time")}
                  value={
                    formik.values.time === "" ? null : dayjs(formik.values.time)
                  }
                  onChange={(newValue) => {
                    formik.setFieldValue("time", newValue);
                  }}
                  renderInput={(
                    params: JSX.IntrinsicAttributes &
                      ClassAttributes<HTMLInputElement> &
                      InputHTMLAttributes<HTMLInputElement>
                  ) => (
                    <div>
                      <input
                        className="block p-3 w-full text-sm text-gray-900 border-[#DDD] rounded-lg border outline-none focus:outline-none bg-transparent placeholder:max-w-[329px] placeholder:text-grey-00 placeholder:font-fellix-regular placeholder:text-base"
                        {...params}
                      />
                    </div>
                  )}
                />
              </LocalizationProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
