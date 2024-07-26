import { FormikProps } from "formik";
import { motion } from "framer-motion";

type ErrorMessageProps = {
  formik: FormikProps<any>;
  name: any;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ formik, name }) => {
  return formik.touched[name] && formik.errors[name] ? (
    <motion.div
      initial={{ opacity: 0, y: "-10px" }}
      animate={{ opacity: 1, y: "0px" }}
      exit={{ opacity: 0, y: "-10px" }}
      className="text-red-500 text-sm tracking-wider mt-1 font-fellix-regular"
    >
      {formik.errors[name] as string}
    </motion.div>
  ) : null;
};

export default ErrorMessage;
