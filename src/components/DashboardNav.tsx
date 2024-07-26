import { Menu } from "@headlessui/react";
import Cookies from "js-cookie";
import { IoMdClose } from "react-icons/io";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "../app/hooks";
import { useGetProfileQuery } from "../services/auth/profile";
import { baseApi } from "../services/baseApi/baseApi";
import Brand from "./Brand";




export const DashboardNav = () => {

  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    Cookies.remove("auth_token");
    dispatch(baseApi.util.resetApiState());
    toast.success("You have been logged out successfully!");
    navigate("/");
  };

  // profile query

  const { data,isLoading,isError } = useGetProfileQuery();

  return (
    <div className="w-full border-b border-[#E9EBF0] sticky z-40 top-0 bg-white">
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-[1440px] md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">
          <div className="flex items-center">
            <span>
              <Brand />
            </span>
          </div>
          <div className={`${data?.role === "business" ? "flex" : "hidden"}`}>
            <div
              className={`hidden flex-row items-center gap-x-[39px] md:flex `}
            >
              <button
                className="inline-flex items-center gap-x-2 bg-custom-grey px-4 py-2.5 rounded-3xl text-grey-00 text-sm font-fellix-regular"
                type="button"
              >
                <svg
                  className={isLoading ? "animate-" : ""}
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="20"
                  viewBox="0 0 18 20"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9.0288 4.99595e-05C4.41977 -0.0156082 0.655096 3.65135 0.504628 8.24135L0.5 8.52625C0.576609 10.7761 1.34207 12.9207 2.69028 14.6876L3.00692 15.1008C4.2938 16.7371 5.82311 18.1733 7.54027 19.3571L7.95372 19.6354L8.01404 19.6828C8.6026 20.1057 9.39726 20.1057 9.98581 19.6828L10.036 19.6415C11.3986 18.7579 12.655 17.7196 13.7805 16.5473C16.0686 14.1252 17.4477 11.4112 17.4998 8.65498L17.4999 8.55264C17.5155 3.93192 13.8598 0.15567 9.28396 0.00469042L9.0288 4.99595e-05ZM9.02366 1.51747C12.8022 1.53038 15.87 4.54942 15.9839 8.30911L15.9871 8.64061C15.9434 10.9514 14.7334 13.3324 12.6866 15.4991C11.6429 16.5862 10.4727 17.5526 9.20356 18.3745L9.11897 18.438C9.05062 18.4974 8.94923 18.4974 8.88088 18.438L8.79867 18.376C6.90797 17.1416 5.24857 15.583 3.89636 13.7717C2.80718 12.3442 2.16175 10.6374 2.03184 8.85689L2.01275 8.49986C2.02559 4.71221 5.03532 1.63498 8.78345 1.52071L9.02366 1.51747ZM8.99993 5.40129C7.21153 5.40129 5.76176 6.85554 5.76176 8.64946C5.76176 10.4434 7.21153 11.8976 8.99993 11.8976C10.7883 11.8976 12.2381 10.4434 12.2381 8.64946C12.2381 6.85554 10.7883 5.40129 8.99993 5.40129ZM8.99993 6.91871C9.95285 6.91871 10.7253 7.69359 10.7253 8.64946C10.7253 9.60532 9.95285 10.3802 8.99993 10.3802C8.04701 10.3802 7.27451 9.60532 7.27451 8.64946C7.27451 7.69359 8.04701 6.91871 8.99993 6.91871Z"
                    fill="#407BFF"
                  />
                </svg>
                {isLoading && <span className="animate-pulse">Loading...</span>}
                {!isLoading && isError && <span>Error occurred.</span>}
                {!isLoading && !isError && data && <span>{data.address}</span>}
              </button>
            </div>
          </div>

          <div className="hidden md:block">
            <Menu as="div">
              {({ open }) => (
                <div className="relative w-full">
                  <Menu.Button className={`items-center gap-x-2.5 flex`}>
                    <span className="w-12 relative h-12  flex items-center justify-center rounded-full ">
                      <svg
                        className="absolute"
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        fill="none"
                      >
                        <circle
                          cx="24"
                          cy="24"
                          r="23"
                          stroke="url(#paint0_linear_406_182)"
                          stroke-width="2"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_406_182"
                            x1="0"
                            y1="0"
                            x2="57.8632"
                            y2="26.2981"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#7433FF" />
                            <stop offset="1" stop-color="#FFA3FD" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <img
                        className="w-[41.143px] h-[41.143px] object-center object-cover rounded-full"
                        src="https://cdn.pixabay.com/photo/2023/10/16/10/51/fox-8318961_1280.png"
                        alt="profile"
                      />
                    </span>
                    <svg
                      className={` transition-all ease-in-out duration-200 transform
                      ${open ? "transform rotate-180" : ""}
                      
                      `}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="10"
                      viewBox="0 0 16 10"
                      fill="none"
                    >
                      <path
                        d="M0.241064 0.745899C0.533264 0.44784 0.990508 0.420743 1.31272 0.66461L1.40503 0.745899L8 7.47342L14.595 0.745899C14.8872 0.44784 15.3444 0.420743 15.6666 0.66461L15.7589 0.745899C16.0511 1.04396 16.0777 1.51037 15.8386 1.83904L15.7589 1.93321L8.58198 9.2541C8.28978 9.55216 7.83254 9.57926 7.51033 9.33539L7.41802 9.2541L0.241064 1.93321C-0.0803548 1.60534 -0.0803548 1.07376 0.241064 0.745899Z"
                        fill="#C0C0C0"
                      />
                    </svg>
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 translate-y-7 w-[215px] shadow-close-shadow  bg-[#FFFFFF] rounded-[8px]">
                    <div className="mx-5 flex flex-col space-y-4 mt-4 pb-5">
                      <Menu.Item>
                        <Link
                          to={`/dashboard/business-info`}
                          className="inline-flex items-center space-x-2 "
                        >
                          <svg
                            width="12"
                            height="15"
                            viewBox="0 0 12 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.9993 9.61621C3.12397 9.61621 0.667969 10.0695 0.667969 11.8829C0.667969 13.6969 3.10864 14.1662 5.9993 14.1662C8.87464 14.1662 11.3306 13.7135 11.3306 11.8995C11.3306 10.0855 8.89064 9.61621 5.9993 9.61621Z"
                              fill="#758494"
                            />
                            <path
                              opacity="0.4"
                              d="M6.00066 7.88901C7.95932 7.88901 9.52866 6.31901 9.52866 4.36101C9.52866 2.40301 7.95932 0.833008 6.00066 0.833008C4.04266 0.833008 2.47266 2.40301 2.47266 4.36101C2.47266 6.31901 4.04266 7.88901 6.00066 7.88901Z"
                              fill="#758494"
                            />
                          </svg>
                          <span className="  text-secondaryGray tracking-wider font-groteska-regular text-sm">
                            Profile Information
                          </span>
                        </Link>
                      </Menu.Item>

                      <Menu.Item>
                        <button
                          onClick={logoutHandler}
                          className="inline-flex items-center space-x-2"
                        >
                          <svg
                            width="14"
                            height="15"
                            viewBox="0 0 14 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              opacity="0.4"
                              d="M0.332031 3.79816C0.332031 2.16416 1.68552 0.833496 3.34839 0.833496H6.65579C8.31526 0.833496 9.66537 2.16016 9.66537 3.7915V11.2022C9.66537 12.8368 8.31187 14.1668 6.64833 14.1668H3.34228C1.68213 14.1668 0.332031 12.8402 0.332031 11.2088V10.5822V3.79816Z"
                              fill="#1D2939"
                            />
                            <path
                              d="M13.5169 7.13653L11.6197 5.1972C11.4236 4.9972 11.108 4.9972 10.9126 5.19853C10.7178 5.39986 10.7185 5.72453 10.9139 5.92453L11.9534 6.98653H10.9568H5.36323C5.08728 6.98653 4.86328 7.21653 4.86328 7.49986C4.86328 7.78386 5.08728 8.0132 5.36323 8.0132H11.9534L10.9139 9.0752C10.7185 9.2752 10.7178 9.59986 10.9126 9.8012C11.0107 9.90186 11.1386 9.95253 11.2671 9.95253C11.3944 9.95253 11.5223 9.90186 11.6197 9.80253L13.5169 7.86386C13.611 7.7672 13.6643 7.63653 13.6643 7.49986C13.6643 7.36386 13.611 7.2332 13.5169 7.13653Z"
                              fill="#1D2939"
                            />
                          </svg>
                          <span className="  text-secondaryGray tracking-wider font-groteska-regular text-sm">
                            Logout
                          </span>
                        </button>
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </div>
              )}
            </Menu>
          </div>
          <div className="lg:hidden">
            <Menu as="div">
              {({ open }) => (
                <div className="relative w-full">
                  <Menu.Button>
                    {!open ? (
                      <>
                        <svg
                          className="w-5 text-gray-600"
                          width="20"
                          height="12"
                          viewBox="0 0 20 12"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 2L19 2C19.2652 2 19.5196 1.89464 19.7071 1.70711C19.8946 1.51957 20 1.26522 20 1C20 0.734784 19.8946 0.480429 19.7071 0.292892C19.5196 0.105356 19.2652 0 19 0L9 0C8.73478 0 8.48043 0.105356 8.29289 0.292892C8.10536 0.480429 8 0.734784 8 1C8 1.26522 8.10536 1.51957 8.29289 1.70711C8.48043 1.89464 8.73478 2 9 2ZM19 10L1 10C0.734784 10 0.480429 10.1054 0.292892 10.2929C0.105356 10.4804 0 10.7348 0 11C0 11.2652 0.105356 11.5196 0.292892 11.7071C0.480429 11.8946 0.734784 12 1 12L19 12C19.2652 12 19.5196 11.8946 19.7071 11.7071C19.8946 11.5196 20 11.2652 20 11C20 10.7348 19.8946 10.4804 19.7071 10.2929C19.5196 10.1054 19.2652 10 19 10V10ZM1 7L19 7C19.2652 7 19.5196 6.89464 19.7071 6.70711C19.8946 6.51957 20 6.26522 20 6C20 5.73478 19.8946 5.48043 19.7071 5.29289C19.5196 5.10536 19.2652 5 19 5L1 5C0.734784 5 0.480429 5.10536 0.292892 5.29289C0.105356 5.48043 0 5.73478 0 6C0 6.26522 0.105356 6.51957 0.292892 6.70711C0.480429 6.89464 0.734784 7 1 7Z"
                            fill="currentColor"
                          />
                        </svg>
                      </>
                    ) : (
                      <IoMdClose className="w-6 h-6" />
                    )}
                  </Menu.Button>

                  <Menu.Items className="absolute right-0 translate-y-8 w-[215px] shadow-close-shadow  bg-[#FFFFFF] rounded-[8px]">
                    <div className="mx-5 flex flex-col space-y-4 mt-4 pb-5">
                      {/* <Menu.Item>
                        <Link
                          to={`/dashboard/`}
                          className="inline-flex items-center space-x-2 "
                        >
                          <RxDashboard size={14} className="text-[#758494]" />
                          <span className="  text-secondaryGray tracking-wider font-groteska-regular text-sm">
                            Dashboard
                          </span>
                        </Link>
                      </Menu.Item> */}
                      {/* new delivery */}

                      {/* <Menu.Item>
                        <Link
                          to={`/dashboard/new-delivery`}
                          className="inline-flex items-center space-x-2 "
                        >
                          <CiDeliveryTruck
                            size={14}
                            className="text-[#758494]"
                          />
                          <span className="  text-secondaryGray tracking-wider font-groteska-regular text-sm">
                            New Delivery
                          </span>
                        </Link>
                      </Menu.Item> */}

                      <Menu.Item>
                        <Link
                          to={`/dashboard/business-info`}
                          className="inline-flex items-center space-x-2 "
                        >
                          <svg
                            width="12"
                            height="15"
                            viewBox="0 0 12 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.9993 9.61621C3.12397 9.61621 0.667969 10.0695 0.667969 11.8829C0.667969 13.6969 3.10864 14.1662 5.9993 14.1662C8.87464 14.1662 11.3306 13.7135 11.3306 11.8995C11.3306 10.0855 8.89064 9.61621 5.9993 9.61621Z"
                              fill="#758494"
                            />
                            <path
                              opacity="0.4"
                              d="M6.00066 7.88901C7.95932 7.88901 9.52866 6.31901 9.52866 4.36101C9.52866 2.40301 7.95932 0.833008 6.00066 0.833008C4.04266 0.833008 2.47266 2.40301 2.47266 4.36101C2.47266 6.31901 4.04266 7.88901 6.00066 7.88901Z"
                              fill="#758494"
                            />
                          </svg>
                          <span className="  text-secondaryGray tracking-wider font-groteska-regular text-sm">
                            Profile Information
                          </span>
                        </Link>
                      </Menu.Item>

                      <Menu.Item>
                        <button
                          onClick={logoutHandler}
                          className="inline-flex items-center space-x-2"
                        >
                          <svg
                            width="14"
                            height="15"
                            viewBox="0 0 14 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              opacity="0.4"
                              d="M0.332031 3.79816C0.332031 2.16416 1.68552 0.833496 3.34839 0.833496H6.65579C8.31526 0.833496 9.66537 2.16016 9.66537 3.7915V11.2022C9.66537 12.8368 8.31187 14.1668 6.64833 14.1668H3.34228C1.68213 14.1668 0.332031 12.8402 0.332031 11.2088V10.5822V3.79816Z"
                              fill="#1D2939"
                            />
                            <path
                              d="M13.5169 7.13653L11.6197 5.1972C11.4236 4.9972 11.108 4.9972 10.9126 5.19853C10.7178 5.39986 10.7185 5.72453 10.9139 5.92453L11.9534 6.98653H10.9568H5.36323C5.08728 6.98653 4.86328 7.21653 4.86328 7.49986C4.86328 7.78386 5.08728 8.0132 5.36323 8.0132H11.9534L10.9139 9.0752C10.7185 9.2752 10.7178 9.59986 10.9126 9.8012C11.0107 9.90186 11.1386 9.95253 11.2671 9.95253C11.3944 9.95253 11.5223 9.90186 11.6197 9.80253L13.5169 7.86386C13.611 7.7672 13.6643 7.63653 13.6643 7.49986C13.6643 7.36386 13.611 7.2332 13.5169 7.13653Z"
                              fill="#1D2939"
                            />
                          </svg>
                          <span className="  text-secondaryGray tracking-wider font-groteska-regular text-sm">
                            Logout
                          </span>
                        </button>
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </div>
              )}
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};



