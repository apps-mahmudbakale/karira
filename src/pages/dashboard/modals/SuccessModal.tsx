import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

type SuccessModalProps = {
  isSuccessModal: boolean;
  toggleSuccessModal: () => void;
  message?: string;
};
export default function SuccessModal({
  isSuccessModal,
  toggleSuccessModal,
  message,
}: SuccessModalProps) {



  const handleDone = () => { 
    toggleSuccessModal();
  };


  return (
    <>
      <Transition appear show={isSuccessModal} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={handleDone}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-[#041549] bg-opacity-[0.6]" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[500px] transform overflow-hidden rounded-2xl bg-white p-7 text-left align-middle shadow-xl transition-all">
                  <div
                    className={`flex flex-col gap-y-5 items-center py-8 justify-center transition-all ease-in-out duration-150 `}
                  >
                    <p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="64"
                        height="65"
                        viewBox="0 0 64 65"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_153_4940)">
                          <path
                            d="M62.7193 32.4998C62.7193 49.4659 48.9654 63.2198 31.9993 63.2198C15.0332 63.2198 1.2793 49.4659 1.2793 32.4998C1.2793 15.5336 15.0332 1.77979 31.9993 1.77979C48.9654 1.77979 62.7193 15.5336 62.7193 32.4998Z"
                            stroke="#407BFF"
                            stroke-width="2"
                          />
                          <path
                            d="M19.1992 31.8743L28.5518 41.2269L44.9588 24.8198"
                            stroke="#407BFF"
                            stroke-width="2"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_153_4940">
                            <rect
                              width="64"
                              height="64"
                              fill="white"
                              transform="translate(0 0.5)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </p>
                    <div className="flex flex-col items-center max-w-[328px] gap-y-3">
                      <h1 className="text-[#344054] max-w-[185px] text-center text-xl font-groteska-semibold sm:text-[26px]">
                        Success!
                      </h1>
                      <p>{ message }</p>
                    </div>

                    <div className="w-full flex justify-center mt-8">
                      <button
                        onClick={handleDone}
                        className="bg-primaryBlue text-sm text-white font-fellix-bold inline-flex items-center justify-center h-12 rounded-xl w-[180px] shadow-active-shadow"
                        type="button"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
