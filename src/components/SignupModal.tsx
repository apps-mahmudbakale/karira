import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

type SuccessModalProps = {
  isOpen: boolean;
  toggleModal: () => void;
};
export default function SignupModal({
  isOpen,
  toggleModal,
}: SuccessModalProps) {

  const navigate = useNavigate();
  const handleSignup = (type: string) => {
    // Handle signup based on the selected type (business/individual)
    navigate(`${type}`);
    toggleModal(); // Close the modal after signup
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={toggleModal}>
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
                  <div className="flex justify-between border-b border-[#DDD] border-opacity-[0.3] pb-2">
                    <Dialog.Title className="text-base font-groteska-medium sm:text-[20px] text-primaryBlack">
                      Choose Account Type
                    </Dialog.Title>
                    <span
                      onClick={toggleModal}
                      className="w-8 h-8 flex justify-center items-center shadow-close-shadow rounded-full cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="16"
                        viewBox="0 0 17 16"
                        fill="none"
                      >
                        <path
                          d="M12.002 4L4.00195 12"
                          stroke="#434343"
                          stroke-width="1.33333"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M4.00195 4L12.002 12"
                          stroke="#434343"
                          stroke-width="1.33333"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="flex flex-col gap-y-5 items-center py-8 justify-center transition-all ease-in-out duration-150">
                    <div className="flex flex-col items-center max-w-[328px] gap-y-3">
                      <button
                        onClick={() => handleSignup("/u/signup")}
                        className="bg-primaryBlue text-sm text-white font-fellix-bold inline-flex items-center justify-center h-12 rounded-xl w-[180px] shadow-active-shadow"
                        type="button"
                      >
                        Sign Up as Business
                      </button>
                      <button
                        onClick={() => handleSignup("/u/individual-signup")}
                        className="bg-primaryBlue text-sm text-white font-fellix-bold inline-flex items-center justify-center h-12 rounded-xl w-[180px] shadow-active-shadow"
                        type="button"
                      >
                        Sign Up as Individual
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
