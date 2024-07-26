import { Listbox, Transition } from "@headlessui/react";
import { FormikProps } from "formik";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { FaCheck } from "react-icons/fa6";

type DropdownProps = {
  formik: FormikProps<any>;
  field_name: string;
};

interface StateInfo {
  name: string;
  capital: string;
  state_code: string;
  creation_date: string;
  location: {
    latitude: string;
    longitude: string;
  };
  total_area: string;
  population: number;
  postal_code: string | null;
  religions: string[];
}

interface StatesProps {
  states: {
    options: string[];
    isFetching: boolean;
  };
}

const Dropdown = ({
  formik: { values, setFieldValue },
  field_name,
}: DropdownProps) => {
  const [states, setStates] = useState<StatesProps["states"]>({
    options: [],
    isFetching: false,
  });

  const fetchStates = async () => {
    setStates({ ...states, isFetching: true });
    try {
      const response = await axios.get(
        "https://nigeria-states-towns-lga.onrender.com/api/states"
      );
      const data = response.data.map((state: StateInfo) => state.name);
      console.log(data, "data");

      setStates({ options: data, isFetching: false });
    } catch (error) {
      console.log(error);
      setStates({ ...states, isFetching: false });
    }
  };

  useEffect(() => {
    fetchStates();
    console.log(states.options, "states");
  }, []);

  return (
    <div className="w-full">
      <Listbox
        value={values[field_name]}
        onChange={(value) => setFieldValue(field_name, value)}
      >
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-pointer bg-[#FAFAFC] font-fellix-medium h-12 pl-3 pr-10 text-left rounded-lg border border-[#DDD]">
            <span
              className={`block truncate ${
                values[field_name] ? "text-deepBlack" : "text-grey-00"
              }`}
            >
              {values[field_name] || "Select state"}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="8"
                viewBox="0 0 12 8"
                fill="none"
              >
                <path
                  d="M10.6673 1.66675L6.00065 6.33341L1.33398 1.66675"
                  stroke="#8F9BB3"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base font-groteska-regular shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {states.isFetching ? (
                <div
                  role="status"
                  className="flex justify-center items-center py-5 flex-col gap-y-3"
                >
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>

                  {/* getting states */}
                  <p className="text-gray-400 font-groteska-regular text-sm mt-2 sm:mt-0 sm:text-base">
                    Please wait while we fetch states
                  </p>
                </div>
              ) : (
                <>
                  {states?.options?.map((option) => (
                    <Listbox.Option
                      key={option}
                      value={option}
                      className={({ active }) =>
                        `${
                          active
                            ? "text-primaryBlue bg-[#F5F5FA]"
                            : "text-deepBlack"
                        }
                            cursor-pointer  select-none relative py-2 pl-10 pr-4`
                      }
                    >
                      {({ selected}) => (
                        <>
                          <span
                            className={`${
                              selected
                                ? "font-fellix-semibold"
                                : "font-fellix-regular"
                            } block truncate`}
                          >
                            {option}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primaryBlue">
                              <FaCheck />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </>
              )}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default Dropdown;
