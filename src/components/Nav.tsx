import { useState, useEffect } from "react";
import { baseApi } from "../services/baseApi/baseApi";
import { useAppDispatch } from "../app/hooks";
import Brand from "./Brand";
import {
  Link,
  useMatch,
  NavigateFunction,
  useNavigate,
  NavLink,
} from "react-router-dom";
import { Menu } from "@headlessui/react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { IoMdClose } from "react-icons/io";
import SignupModal from "./SignupModal";
import { MdMoveDown } from "react-icons/md";
import { GoHome } from "react-icons/go";


export const Nav = () => {
  const [is_authenticated, setIsAuthenticated] = useState(false);
  const [is_open, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen((prev) => !prev);

  const match = useMatch("/partner-with-us/*");

  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = Cookies.get("auth_token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const logoutHandler = () => {
    Cookies.remove("auth_token");
    // reset api
    dispatch(baseApi.util.resetApiState());

    setIsAuthenticated(false);
    toast.success("Logout successful");
    navigate("/");
  };

  return (
    <div className="w-full border-b border-[#E9EBF0] sticky z-40 top-0 bg-white">
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-[1440px] md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">
          <div className="flex items-center">
            <span>
              <Brand />
            </span>
          </div>
          <div className={` hidden lg:block`}>
            <Menu as="div" className={`${!is_authenticated && "hidden"}`}>
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
                  <Menu.Items className="absolute right-0 translate-y-7 w-[215px] shadow-close-shadow  bg-[#FFFFFF] rounded-[8px] ">
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
          <div className={`${is_authenticated ? "hidden" : "block"}`}>
            <ul className="items-center hidden space-x-8 text-[18px] lg:flex ">
              {match ? (
                <li>
                  <button
                    className="inline-flex items-center justify-center gap-x-[7px] border border-primaryBlue h-12 px-6 font-medium tracking-wide text-primaryBlue transition duration-200 rounded-lg bg-white focus:shadow-outline focus:outline-none"
                    type="button"
                  >
                    Learn more about Karria
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="20"
                      viewBox="0 0 21 20"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M20.5 10C20.5 15.52 16.01 20 10.5 20L10.2202 19.9962C4.82942 19.8478 0.5 15.4264 0.5 10C0.5 4.49 4.98 0 10.5 0C16.01 0 20.5 4.49 20.5 10ZM8.52 6C8.23 6.3 8.23 6.77 8.53 7.06L11.48 10L8.53 12.94C8.23 13.23 8.23 13.71 8.52 14C8.82 14.3 9.29 14.3 9.58 14L13.07 10.53C13.21 10.39 13.29 10.2 13.29 10C13.29 9.8 13.21 9.61 13.07 9.47L9.58 6C9.44 5.85 9.25 5.78 9.06 5.78C8.86 5.78 8.67 5.85 8.52 6Z"
                        fill="#407BFF"
                      />
                    </svg>
                  </button>
                </li>
              ) : (
                <>
                  <li className="text-primaryBlue w-[156px] flex items-center justify-center rounded-lg min-h-[56px] border border-primaryBlue">
                    <Link
                      to={`/u/login`}
                      className="h-full w-full flex items-center justify-center"
                    >
                      Login
                    </Link>
                  </li>
                  <li className="text-white bg-primaryBlue w-[156px] rounded-lg h-[56px] ">
                    <button
                      onClick={toggleModal}
                      type="button"
                      className="h-full w-full flex items-center justify-center"
                    >
                      Sign up
                    </button>
                  </li>
                </>
              )}
            </ul>
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
                      <div
                        className={`${
                          is_authenticated
                            ? "hidden"
                            : "flex flex-col space-y-4"
                        }`}
                      >
                        {/* Sign Up */}
                        <Menu.Item>
                          <NavLink
                            to="/u/individual-signup"
                            className="inline-flex items-center space-x-2"
                          >
                            <svg
                              width="12"
                              height="15"
                              viewBox="0 0 12 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              {/* Add sign up icon */}
                            </svg>
                            <span className="text-secondaryGray tracking-wider font-groteska-regular text-sm">
                              Sign Up
                            </span>
                          </NavLink>
                        </Menu.Item>

                        {/* Sign In */}
                        <Menu.Item>
                          <Link
                            to="/u/login"
                            className="inline-flex items-center space-x-2"
                          >
                            <svg
                              width="12"
                              height="15"
                              viewBox="0 0 12 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              {/* Add sign in icon */}
                            </svg>
                            <span className="text-secondaryGray tracking-wider font-groteska-regular text-sm">
                              Sign In
                            </span>
                          </Link>
                        </Menu.Item>
                      </div>
                      <div
                        className={`${
                          is_authenticated
                            ? "flex flex-col space-y-4"
                            : "hidden"
                        }`}
                      >
                        {/* home */}

                        <Menu.Item>
                          <NavLink
                            to="/about-us"
                            className="inline-flex items-center space-x-2"
                          >
                            {({ isActive }) => (
                              <>
                                <GoHome size={14} className="text-[#758494]" />
                                <span
                                  className={
                                    isActive
                                      ? "text-primaryBlue font-fellix-medium"
                                      : "text-secondaryGray tracking-wider font-fellix-regular"
                                  }
                                >
                                  Home
                                </span>
                              </>
                            )}
                          </NavLink>
                        </Menu.Item>

                        {/* haulage */}

                        <Menu.Item>
                          <NavLink
                            to="/services/hauling"
                            className="inline-flex items-center space-x-2"
                          >
                            {({ isActive }) => (
                              <>
                                <MdMoveDown
                                  size={14}
                                  className="text-[#758494]"
                                />
                                <span
                                  className={
                                    isActive
                                      ? "text-primaryBlue font-fellix-medium"
                                      : "text-secondaryGray tracking-wider font-fellix-regular"
                                  }
                                >
                                  Haulage
                                </span>
                              </>
                            )}
                          </NavLink>
                        </Menu.Item>

                        {/* relocation */}

                        <Menu.Item>
                          <NavLink
                            to="/services/relocation"
                            className="inline-flex items-center space-x-2"
                          >
                            {({ isActive }) => (
                              <>
                                <svg
                                  className="w-3 h-3 text-[#758494]"
                                  fill="currentColor"
                                  xmlns="http://www.w3.org/2000/svg"
                                  id="Layer_1"
                                  data-name="Layer 1"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="m22.535,1.464h0c-.945-.944-2.2-1.464-3.535-1.464s-2.592.52-3.535,1.464c-1.949,1.95-1.949,5.122.008,7.079l1.787,1.749c.488.477,1.114.715,1.74.715s1.252-.238,1.74-.715l1.795-1.756c1.949-1.95,1.949-5.122,0-7.071Zm-3.534,4.823c-.828,0-1.5-.672-1.5-1.5s.672-1.5,1.5-1.5,1.5.672,1.5,1.5-.672,1.5-1.5,1.5Z" />
                                  <path d="m24,18c0-2.206-1.794-4-4-4h-8c-1.103,0-2-.897-2-2s.897-2,2-2c.553,0,1-.448,1-1s-.447-1-1-1c-2.206,0-4,1.794-4,4s1.794,4,4,4h8c1.103,0,2,.897,2,2s-.897,2-2,2h-7c-.553,0-1,.448-1,1s.447,1,1,1h7c2.206,0,4-1.794,4-4Z" />
                                  <path d="m9.932,19.637l-.815-2.09c-.604-1.547-2.066-2.546-3.727-2.546h-.39v4c0,.552-.447,1-1,1s-1-.448-1-1v-4H1c-.553,0-1,.448-1,1v5c0,.552.447,1,1,1h1v.5c0,.828.672,1.5,1.5,1.5s1.5-.672,1.5-1.5c0,.828.672,1.5,1.5,1.5s1.5-.672,1.5-1.5v-.5c1.299,0,2-1.03,2-2,0-.125-.023-.248-.068-.363Z" />
                                </svg>
                                <span
                                  className={
                                    isActive
                                      ? "text-primaryBlue font-fellix-medium"
                                      : "text-secondaryGray tracking-wider font-fellix-regular"
                                  }
                                >
                                  Relocation
                                </span>
                              </>
                            )}
                          </NavLink>
                        </Menu.Item>

                        {/* towing */}

                        <Menu.Item>
                          <NavLink
                            to="/services/towing"
                            className="inline-flex items-center space-x-2"
                          >
                            {({ isActive }) => (
                              <>
                                <svg
                                  className="w-3 h-3 text-[#758494]"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  id="Layer_1"
                                  data-name="Layer 1"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M20.5,17c-.17,0-.337,.012-.5,.036V4.5c0-1.93,1.57-3.5,3.5-3.5,.276,0,.5-.224,.5-.5s-.224-.5-.5-.5c-2.481,0-4.5,2.019-4.5,4.5v12.634L2.451,22.36l-1.322-4c-.211-.634-.162-1.312,.137-1.909,.3-.597,.813-1.042,1.45-1.253l.466-.158,.468,1.506c.12,.383,.382,.697,.737,.882,.218,.114,.454,.171,.693,.171,.151,0,.304-.023,.452-.07l7.804-2.458c.787-.248,1.227-1.091,.98-1.877l-.539-1.735,2.882-.978c.262-.089,.402-.373,.313-.634-.088-.261-.373-.401-.634-.313l-2.859,.97-.627-2.017c-.279-.894-.891-1.625-1.721-2.059-.831-.434-1.78-.517-2.672-.236l-3.987,1.256c-1.837,.579-2.863,2.544-2.29,4.382l.701,2.254-.487,.165c-.888,.294-1.607,.917-2.026,1.753s-.487,1.785-.192,2.671l1.318,3.987-1.148,.363c-.264,.083-.409,.364-.326,.627,.067,.213,.264,.35,.477,.35,.05,0,.101-.007,.15-.023l16.883-5.331c-.338,.538-.533,1.174-.533,1.855,0,1.93,1.57,3.5,3.5,3.5s3.5-1.57,3.5-3.5-1.57-3.5-3.5-3.5ZM4.775,8.403l3.987-1.256c.248-.078,.501-.117,.754-.117,.397,0,.792,.096,1.154,.285,.593,.31,1.029,.832,1.229,1.47l1.463,4.708c.083,.262-.063,.543-.326,.625l-7.804,2.458c-.125,.041-.262,.029-.382-.034-.118-.062-.205-.167-.245-.293l-1.466-4.716c-.41-1.313,.323-2.717,1.636-3.13Zm15.725,14.597c-1.379,0-2.5-1.122-2.5-2.5s1.121-2.5,2.5-2.5,2.5,1.122,2.5,2.5-1.121,2.5-2.5,2.5Z" />
                                </svg>

                                <span
                                  className={
                                    isActive
                                      ? "text-primaryBlue font-fellix-medium"
                                      : "text-secondaryGray tracking-wider font-fellix-regular"
                                  }
                                >
                                  Towing
                                </span>
                              </>
                            )}
                          </NavLink>
                        </Menu.Item>

                        {/* Profile Information */}
                        <Menu.Item>
                          <NavLink
                            to={`/dashboard/business-info`}
                            className="inline-flex items-center space-x-2 "
                          >
                            {({ isActive }) => (
                              <>
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
                                <span
                                  className={
                                    isActive
                                      ? "text-primaryBlue font-fellix-medium"
                                      : "text-secondaryGray tracking-wider font-fellix-regular"
                                  }
                                >
                                  Profile Information
                                </span>
                              </>
                            )}
                          </NavLink>
                        </Menu.Item>

                        {/* Logout */}
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
                    </div>
                  </Menu.Items>
                </div>
              )}
            </Menu>
          </div>
        </div>
      </div>

      {/* modal section */}
      <>
        <SignupModal isOpen={is_open} toggleModal={toggleModal} />
      </>
    </div>
  );
};
