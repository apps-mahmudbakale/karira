import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

type SuccessModalProps = {
  isSuccessModal: boolean;
  toggleSuccessModal: () => void;
};
export default function Warning({
  isSuccessModal,
  toggleSuccessModal,
}: SuccessModalProps) {
  const navigate: NavigateFunction = useNavigate();

  const handleDone = () => {
    toggleSuccessModal();
    navigate("/dashboard/");
  };

  return (
    <>
      <Transition appear show={isSuccessModal} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={toggleSuccessModal}>
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
                <Dialog.Panel className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative shadow-lg">
                  <div className="md:flex items-center">
                    <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                      <i className="bx bx-error text-3xl">&#9888;</i>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                      <p className=" font-fellix-bold">Warning!</p>
                      <p className="text-sm text-gray-700 mt-1 font-fellix-regular">
                        {/* warning user from going to diffrent page */}
                        You are about to lose your progress, are you sure you
                        want to go back?
                      </p>
                    </div>
                  </div>
                  <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                    <button
                      onClick={handleDone}
                      type="button"
                      className="block w-full md:inline-block outline-none focus:outline-none md:w-auto px-4 py-3 md:py-2 bg-primaryBlue text-white rounded-lg font-fellix-regular text-sm md:ml-2 md:order-2"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={toggleSuccessModal}
                      type="button"
                      className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-fellix-regular text-sm mt-4 md:mt-0 md:order-1"
                    >
                      Cancel
                    </button>
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
