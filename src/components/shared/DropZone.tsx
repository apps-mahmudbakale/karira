import axios from "axios";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Upload from "../Upoad";

type Props = {
  formik: any;
  field_name: string;
  file_name: string;
};

const DropZone = ({ formik, field_name, file_name }: Props) => {
  const [imageLoad, setImageLoad] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const upload_file = acceptedFiles[0];
    formik.setFieldValue(file_name, upload_file);
    const formData = new FormData();
    formData.append("file", upload_file);
    formData.append("tags", "codeinfuse, medium, gist");
    formData.append("upload_preset", "Blaone");
    formData.append("api_key", "631983513361737");
    formData.append("timestamp", (Date.now() / 1000).toString());

    try {
      setImageLoad(true);
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/seeders/image/upload/",
        formData,
        { headers: { "X-Requested-With": "XMLHttpRequest" } }
      );
      setImageLoad(false);
      const data = response.data;
      const image_url = data.secure_url;
      formik.setFieldValue(field_name, image_url);
    } catch (error) {
      setImageLoad(false);
      console.error("Upload error:", error);
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });
  return (
    <div className="flex flex-col gap-y-[8px]">
      <div className="w-full border-dashed border border-primaryBlue rounded-lg py-6 bg-[#F5FAFF] text-center md:py-[33px]">
        <div className="">
          {imageLoad ? (
            <div className="w-full flex flex-col justify-center items-center gap-y-2">
              {/* // messsage */}
              <p className="mt-2 text-sm font-fellix-medium text-deepBlack">
                Uploading file, please wait...
              </p>

              <Upload />
            </div>
          ) : (
            <>
              <div {...getRootProps()}>
                <input
                  {...getInputProps()}
                  className="bg-red-500 outline-none focus:outline-none h-full w-full cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center">
                  <svg
                    className={`mb-3 ${
                      formik.values[file_name] && "hidden"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="38"
                    height="37"
                    viewBox="0 0 38 37"
                    fill="none"
                  >
                    <path
                      d="M25.0389 24.1561L18.9999 18.1172L12.9609 24.1561"
                      stroke="#407BFF"
                      stroke-width="1.50974"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M19 18.1172V31.7048"
                      stroke="#407BFF"
                      stroke-width="1.50974"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M31.6667 27.7644C33.1392 26.9616 34.3024 25.6913 34.9728 24.154C35.6432 22.6167 35.7825 20.9 35.3689 19.2747C34.9552 17.6494 34.012 16.2081 32.6883 15.1784C31.3645 14.1486 29.7355 13.589 28.0584 13.5879H26.1561C25.6991 11.8204 24.8474 10.1794 23.665 8.78846C22.4825 7.39747 21.0001 6.29264 19.3292 5.55703C17.6583 4.82142 15.8424 4.47417 14.018 4.54139C12.1936 4.60861 10.4081 5.08855 8.79589 5.94512C7.18365 6.8017 5.78658 8.01262 4.70969 9.48685C3.63281 10.9611 2.90415 12.6603 2.57848 14.4566C2.25282 16.253 2.33862 18.0998 2.82945 19.8583C3.32028 21.6167 4.20336 23.241 5.4123 24.609"
                      stroke="#407BFF"
                      stroke-width="1.50974"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M25.0389 24.1561L18.9999 18.1172L12.9609 24.1561"
                      stroke="#407BFF"
                      stroke-width="1.50974"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  {formik.values[file_name] ? (
                    <>
                      {formik.values[file_name].type.startsWith("image/") && (
                        <div className="h-[200px] overflow-hidden">
                          <img
                            src={URL.createObjectURL(formik.values[file_name])}
                            alt={formik.values[file_name].name}
                            className="w-full max-w-[300px] rounded-md h-full object-center object-cover"
                          />
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => formik.setFieldValue(file_name, null)}
                        className="mt-2 text-red-500"
                      >
                        Remove Image
                      </button>
                      <p className="text-grey-00 font-fellix-regular text-xs">
                        File size:{" "}
                        {Math.round(formik.values[file_name].size / 1024)} KB
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="inline-flex items-center gap-2 text-sm font-fellix-medium text-deepBlack mb-[6px]">
                        Drag & drop files or{" "}
                        <span className="text-primaryBlue">Browse</span>
                      </p>
                      <p className="text-grey-00 font-fellix-regular text-xs">
                        Supported formats: JPEG, PNG, GIF, MP4.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropZone;
