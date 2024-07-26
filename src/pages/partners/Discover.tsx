import { Disclosure } from "@headlessui/react";
import { motion } from "framer-motion";

import { faq } from "../../constants/data";

export default function Discover() {
  return (
    <div className="w-full mt-7 ">
      <div className="w-full">
        {faq.map(({ id, answer, question }) => (
          <Disclosure key={id}>
            {({ open }) => (
              <motion.div
                layout
                initial={{ borderRadius: 4 }}
                animate={{ borderRadius: open ? 0 : 4 }}
                transition={{ duration: 0.2 }}
                className={`${
                  open && "border-b border-[#F1F1F1] pb-2"
                } md:pl-8`}
              >
                <Disclosure.Button className="flex w-full justify-between rounded-[4px] py-2 text-left focus:outline-none bg-primaryWhite">
                  <span className="text-[#0F111D] tex-base font-fellix-bold tracking-[0.64px]">
                    {question}
                  </span>

                  <motion.svg
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M5.99961 7.20001L11.9996 13.2L17.9996 7.20001L20.3996 8.40001L11.9996 16.8L3.59961 8.40001L5.99961 7.20001Z"
                      fill="#0F111D"
                    />
                  </motion.svg>
                </Disclosure.Button>
                <motion.div
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: open ? 1 : 0, height: open ? "auto" : 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <Disclosure.Panel className="text-[#0F111D] text-base font-fellix-regular tracking-[0.16px] leading-[175%]">
                    {answer}
                  </Disclosure.Panel>
                </motion.div>
              </motion.div>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
}
