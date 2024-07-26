import { useState } from 'react';
import Image_one from '../assets/Businessdeal.png';
import Image_two from '../assets/Telecommuting.png';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';


  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };




export const Hero = () => {

 const [selected, setSelected] = useState({
   isBusiness: false,
   isIndividual: false,
 });

 const handleSelection = (type:string) => {
   setSelected((prevSelected) => ({
     ...prevSelected,
     isBusiness: type === "business" ? !prevSelected.isBusiness : false,
     isIndividual: type === "individual" ? !prevSelected.isIndividual : false,
   }));
 };


  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-[1440px] md:px-24 lg:px-8 lg:py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="py-10 flex flex-col w-full items-center mx-auto rounded-2xl border border-[#D5E0D5] max-w-[1045px] sm:py-16"
      >
        <h1 className="text-xl font-bold text-center px-4 sm:px-0 md:text-4xl">
          Join Karria now and Explore our services
        </h1>
        <div className="mt-[69px] w-full flex justify-center items-center px-4 sm:px-0 sm:pb-9 md:pb-12">
          <Link className="w-full  max-w-[360px]" to={`services`}>
            <button
              
              className={`w-full bg-primaryBlue h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded-lg disabled:bg-opacity-[0.5] disabled:cursor-not-allowed  focus:shadow-outline focus:outline-none ${
                selected.isBusiness || selected.isIndividual
                  ? "shadow-active-shadow"
                  : "shadow-disabled"
              }`}
              type="button"
            >
              Get Started
              <span>
                {(selected.isBusiness && " as a Business") ||
                  (selected.isIndividual && " as an Individual")}
              </span>
            </button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};
