import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import "react-phone-input-2/lib/style.css";


type Props = {
  formik: any;
  name: string;
};


const PhoneNumber = ({ formik, name }: Props) => {
  // default value based on name
  const [phone_no, setPhone_no] = useState(
    formik.values[name] ||   ""
    )

    const handleChange = ( value: string) => {
       
      setPhone_no(value)
      formik.setFieldValue(name, value)
    }

 
  return (
    <div>
      {/* render PhoneInput */}
      <PhoneInput
        country={"ng"}
        placeholder="+234"
        value={phone_no}
        onChange={handleChange}
        inputClass={`px-4 !h-12 !bg-[#FAFAFC] !rounded-lg !border !border-[#DDD] !font-fellix-regular !text-deepBlack !w-full`}
      />
      {/* render error message */}

      {/* {formik.touched.phone && formik.errors.phone ? (
        <motion.div
          initial={{ opacity: 0, y: "-10px" }}
          animate={{ opacity: 1, y: "0px" }}
          exit={{ opacity: 0, y: "-10px" }}
          className="text-red-500 text-sm tracking-wider mt-1 font-fellix-regular"
        >
          {formik.errors.phone}
        </motion.div>
      ) : null} */}
    </div>
  );
}

export default PhoneNumber
