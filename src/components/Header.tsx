import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import ModalVideo from "react-modal-video";
import { FaPlayCircle } from "react-icons/fa";
import "react-modal-video/css/modal-video.min.css";
import { useState } from "react";
const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const Header = () => {
  const [isOpen, setOpen] = useState(false);

  const location = useLocation();
  const path = location.pathname;

  const getHeaderText = () => {
    // use switch
    switch (path) {
      case "/services/hauling":
        return "Got bulky stuff or multiple items to move? Get estimates now 🛋️";
      case "/services/relocation":
        return "Planning to move from one space to another. Get estimates now 🛖";

      case "/services/towing":
        return "Got a vehicle that needs to be moved? Get estimate now 🚗";
      default:
        return "Simplify Your Logistics Get estimate with Karria 😊";
    }
  };
  return (
    <div className="px-4 py-8 mx-auto  sm:max-w-xl md:max-w-full md:py-12 lg:max-w-[1440px] md:px-24 lg:px-8">
      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        youtube={{
          autoplay: 1,
        }}
        videoId="ysSqfMsMI5s"
        onClose={() => setOpen(false)}
      />
      <div className="max-w-xl sm:mx-auto lg:max-w-3xl">
        <div className="flex flex-col items-center   sm:text-center sm:mb-0">
          <div className="max-w-xl space-y-5  text-center lg:max-w-[707px]">
            <AnimatePresence mode="wait">
              <motion.h2
                key={path}
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="font-sans max-w-2xl text-3xl  font-bold  tracking-tight text-gray-900 sm:text-[44px] md:leading-[54px] "
              >
                {path !== "/" ? (
                  <>{getHeaderText()}</>
                ) : (
                  <>
                    <span className="relative inline-block">
                      <span className=" text-primaryBlue">Easy</span>
                    </span>{" "}
                    Moving & Relocation
                  </>
                )}
              </motion.h2>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.p
                key={path}
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.3, delay: 0.1 }}
                className={`text-base text-secondaryBlack  font-fellix-regular ${
                  path === "/about-us" || path === "/" ? "block" : "hidden"
                }`}
              >
                {path === "/about-us" ? (
                  <>
                    Your One-Stop Solution for seamless and effective Haulage,
                    Relocation, and Towing services 👌🏽.
                  </>
                ) : (
                  <>
                    We've re-imagined moving and relocation to be a breeze.
                    Experience seamless Moving & Relocation, every-time with
                    Karria!
                  </>
                )}
              </motion.p>
            </AnimatePresence>
            <div
              className={`${
                path === "/about-us" || path === "/" ? "block" : "hidden"
              }`}
            >
              <button
                className="inline-flex items-center justify-center gap-x-[7px] border border-primaryBlue h-12 px-6 font-medium tracking-wide text-primaryBlue transition duration-200 rounded-lg bg-white focus:shadow-outline focus:outline-none"
                type="button"
                onClick={() => setOpen(true)}
              >
                Learn more about Karria
                <FaPlayCircle className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
