import { useState } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";
import {
  useGetDeliveriesQuery,
  useUpdateDeliveryMutation,
} from "../../../services/dashboard/dashboard";
import NoDeliveries from "../components/NoDeliveries";
import dayjs from "dayjs";
import { Delivery } from "../../../interfaces/dashboard/dashboard";
import SkeletonLoader from "../components/SkeletonLoader";
import SuccessModal from "../modals/SuccessModal";
import { toast } from "react-toastify";

const SingleDelivery = () => {
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const [itemId, setItemId] = useState<string>("");

  const navigate: NavigateFunction = useNavigate();

  const toggleUpdate = () => {
    setIsUpdated((prev) => !prev);
  };

  const handleSelect = (delivery: Delivery) => {
   
    // store selected delivery in navigation state

    navigate(`update-delivery/${delivery._id}`)
  };

  const { data, isLoading, isError } = useGetDeliveriesQuery();

  // update delivery mutation

  const [updateDelivery, { isLoading: updateLoading }] =
    useUpdateDeliveryMutation();

  const handlestartDelivery = async (id: string) => {
    setItemId(id);
    try {
      await updateDelivery(id).unwrap();
      toggleUpdate();
    } catch (error) {
      toast.error("Error starting delivery");
    }
  };

  return (
    <div className="w-full">
      {isLoading ? (
        <>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="py-2 mt-4">
              <SkeletonLoader />
            </div>
          ))}
        </>
      ) : isError ? (
        <>
          {/* error fetching deliveries */}

          <div className="">
            <p>error fetching deliveries</p>
          </div>
        </>
      ) : (
        <>
          {!data?.[0]?.length ? (
            <div className="w-full mx-auto py-10 sm:py-14 md:py-[72.68px]">
              <NoDeliveries />
            </div>
          ) : (
            <>
              <div className="grid grid-flow-row gap-y-6 sm:gap-y-[34px] mt-6 sm:mt-[33.68px] sm:px-[20.22px]">
                {data?.[0] &&
                  data?.[0].map((delivery) => (
                    <div
                      key={delivery._id}
                      className="max-w-[1111.776px] pl-2 border border-[#F7F8FF] bg-[#F9FBFC] rounded-3xl py-[22px] flex flex-col gap-y-4 lg:flex-row sm:px-6 md:px-10  lg:justify-between "
                    >
                      <div className="grid grid-flow-row gap-y-[18px]">
                        <h1 className=" text-lg text-solid-black font-fellix-semibold sm:text-xl">
                          {delivery.receiverInfo.f_Name}
                        </h1>
                        <p>
                          <button
                            className="bg-[#12B76A] px-2.5 h-[25px] rounded-[10px] text-xs font-fellix-medium text-white"
                            type="button"
                          >
                            {delivery.estimate}
                          </button>
                        </p>
                        <p className="text-base text-grey-00 font-fellix-medium inline-flex items-center gap-x-[5px]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="15"
                            viewBox="0 0 14 15"
                            fill="none"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M7.0216 3.74696e-05C3.56483 -0.0117062 0.741322 2.73851 0.628471 6.18102L0.625 6.39469C0.682457 8.08205 1.25655 9.69052 2.26771 11.0157L2.50519 11.3256C3.47035 12.5528 4.61734 13.63 5.9052 14.5178L6.21529 14.7266L6.26053 14.7621C6.70195 15.0793 7.29794 15.0793 7.73936 14.7621L7.77702 14.7311C8.79892 14.0684 9.74125 13.2897 10.5854 12.4105C12.3015 10.5939 13.3358 8.55844 13.3748 6.49124L13.3749 6.41448C13.3866 2.94894 10.6449 0.116753 7.21297 0.00351781L7.0216 3.74696e-05ZM7.01774 1.13809C9.85164 1.14777 12.1525 3.41205 12.2379 6.23182L12.2404 6.48045C12.2075 8.21356 11.3001 9.99932 9.76496 11.6243C8.9822 12.4397 8.10456 13.1644 7.15267 13.7808L7.08923 13.8285C7.03797 13.873 6.96193 13.873 6.91066 13.8285L6.849 13.782C5.43098 12.8562 4.18643 11.6873 3.17227 10.3288C2.35539 9.25813 1.87132 7.97803 1.77388 6.64265L1.75957 6.37489C1.76919 3.53415 4.02649 1.22622 6.83759 1.14052L7.01774 1.13809ZM6.99995 4.05097C5.65865 4.05097 4.57132 5.14166 4.57132 6.48709C4.57132 7.83253 5.65865 8.92322 6.99995 8.92322C8.34124 8.92322 9.42857 7.83253 9.42857 6.48709C9.42857 5.14166 8.34124 4.05097 6.99995 4.05097ZM6.99995 5.18904C7.71464 5.18904 8.29401 5.7702 8.29401 6.48709C8.29401 7.20399 7.71464 7.78515 6.99995 7.78515C6.28525 7.78515 5.70588 7.20399 5.70588 6.48709C5.70588 5.7702 6.28525 5.18904 6.99995 5.18904Z"
                              fill="#407BFF"
                            />
                          </svg>
                          {delivery.dropOffLocation.address}
                        </p>
                        <p className="text-base text-grey-00 font-fellix-medium inline-flex items-center gap-x-[5px]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="17"
                            viewBox="0 0 16 17"
                            fill="none"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M1.24275 3.1544C1.47999 2.76159 2.78712 1.33282 3.71991 1.37596C3.99875 1.39906 4.24523 1.56774 4.4455 1.76338C4.90535 2.21242 6.22172 3.91076 6.29644 4.26814C6.47822 5.14466 5.43375 5.64993 5.7534 6.53337C6.56834 8.52748 7.97253 9.9316 9.96751 10.7457C10.8502 11.0654 11.3555 10.0209 12.2321 10.2035C12.5887 10.2782 14.2879 11.5945 14.737 12.0543C14.9319 12.2538 15.1013 12.5011 15.1244 12.7799C15.1591 13.7619 13.6417 15.0875 13.3459 15.2569C12.648 15.756 11.7376 15.7476 10.6276 15.2315C7.5304 13.9429 2.58069 9.08666 1.26817 5.87252C0.765956 4.76879 0.731295 3.85222 1.24275 3.1544Z"
                              stroke="#407BFF"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          +{delivery.receiverInfo.phone}
                        </p>
                      </div>
                      <div className="flex flex-col-reverse gap-y-4 md:justify-between md:flex-col">
                        <div className="flex flex-row items-center gap-x-4">
                          <div
                            className={`flex flex-row items-center gap-x-4 ease-in-out duration-100 transition-all ${
                              delivery.startDelivery ? "hidden" : "block"
                            }`}
                          >
                            <button
                              onClick={() => handleSelect(delivery)}
                              className=" text-sm text-primaryBlue font-fellix-bold inline-flex items-center justify-center h-[42px] gap-x-3 border border-primaryBlue rounded-xl w-[127px]"
                              type="button"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <path
                                  d="M8.27539 12.9233H13.0581"
                                  stroke="#407BFF"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M7.64104 1.7167C8.19379 1.01245 9.08704 1.0492 9.79204 1.60195L10.8345 2.41945C11.5395 2.9722 11.7893 3.82945 11.2365 4.5352L5.01979 12.4665C4.81204 12.732 4.49479 12.8887 4.15729 12.8925L1.75954 12.9232L1.21654 10.587C1.14004 10.2592 1.21654 9.9142 1.42429 9.64795L7.64104 1.7167Z"
                                  stroke="#407BFF"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M6.47656 3.20215L10.0721 6.02065"
                                  stroke="#407BFF"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                              Edit
                            </button>
                            <button
                              onClick={() => handlestartDelivery(delivery._id)}
                              disabled={updateLoading}
                              className={`bg-primaryBlue text-sm text-white font-fellix-bold inline-flex items-center justify-center h-[42px] rounded-xl w-[127px] ${
                                updateLoading ? "cursor-not-allowed" : ""
                              }`}
                              type="button"
                            >
                              {updateLoading && itemId === delivery._id ? (
                                <>
                                  <svg
                                    aria-hidden="true"
                                    role="status"
                                    className="inline w-4 h-4 me-3 text-white animate-spin"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                      fill="#E5E7EB"
                                    />
                                    <path
                                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </>
                              ) : (
                                "Start Delivery"
                              )}
                            </button>
                          </div>
                          <button
                            className={`bg-orange-500 text-sm text-white font-fellix-bold inline-flex items-center justify-center h-[42px] rounded-xl w-[127px] ${
                              delivery.startDelivery ? "block" : "hidden"
                            }`}
                            type="button"
                          >
                            Delivery Started
                          </button>
                        </div>
                        <p className=" font-fellix-medium text-grey-00 text-base lg:text-right">
                          {/* MMM D, YYYY h:mm A */}
                          {dayjs(delivery.createdAt).format(
                            "MMM D, YYYY h:mm A"
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </>
          )}
        </>
      )}
      {/* modals */}
      <>
        <SuccessModal
          toggleSuccessModal={toggleUpdate}
          isSuccessModal={isUpdated}
          message="Delivery started successfully"
        />
      </>
    </div>
  );
};

export default SingleDelivery;
