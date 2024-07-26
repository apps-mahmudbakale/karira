import { useGetPastDeliveriesQuery } from "../../../services/dashboard/dashboard";
import NoItems from "../../../assets/emptystate.svg";
import SkeletonLoader from "../components/SkeletonLoader";
import dayjs from "dayjs";

const PastDelivery = () => {
  const { data: deliveries, isLoading, isError } = useGetPastDeliveriesQuery();
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
        <>{/* error message */}</>
      ) : (
        <>
          {!deliveries?.[0]?.length ? (
            <div className="w-full mx-auto py-10 sm:py-14 md:py-[72.68px]">
              <div className="max-w-[338px] mx-auto gap-y-5 flex flex-col items-center justify-center sm:gap-y-[25px]">
                <img
                  src={NoItems}
                  alt=""
                  className="w-full max-w-[123px] object-cover object-center"
                />
                <div className="text-center space-y-2">
                  <h1 className="text-center text-solid-black font-fellix-medium text-base ">
                    You don’t have any past deliveries yet!
                  </h1>
                  <p className=" text-grey-00 text-sm font-fellix-regular ">
                    You can view your past deliveries here once you have completed your first delivery
                  </p>
                </div>
               
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-flow-row gap-y-6 sm:gap-y-[34px] mt-6 sm:mt-[33.68px] sm:px-[20.22px]">
                {deliveries?.[0] &&
                  deliveries[0].map((delivery) => (
                    <div className="max-w-[1111.776px] pl-2 border border-[#F7F8FF] bg-[#F9FBFC] rounded-3xl py-[22px] flex flex-col gap-y-4 lg:flex-row sm:px-6 md:px-10  lg:justify-between ">
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
                              fill="#12B76A"
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
                              stroke="#12B76A"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          +{delivery.receiverInfo.phone}
                        </p>
                      </div>
                      <div className="flex flex-col-reverse gap-y-4 md:justify-between md:flex-col">
                        <button
                          className=" bg-[#12B76A] text-sm text-white font-fellix-bold inline-flex items-center justify-center h-[42px] rounded-xl w-[127px]"
                          type="button"
                        >
                          Completed
                        </button>

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
    </div>
  );
};

export default PastDelivery;
