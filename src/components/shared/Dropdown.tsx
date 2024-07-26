import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";

type DropdownProps = {
  options: string[];
  picked: string | null | undefined;
  placeholder: string | null | undefined;
  selectHandler: (picked: string) => void;
};

const Dropdown = ({
  options,
  picked,
  selectHandler,
  placeholder,
}: DropdownProps) => {
  return (
    <div className="w-full">
      <Listbox value={picked} onChange={selectHandler}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-pointer bg-[#FAFAFC] font-fellix-medium h-12 pl-3 pr-10 text-left rounded-lg border border-[#DDD]">
            <span className={`block truncate ${!picked && " text-grey-00 font-fellix-regular"}`}>{picked || placeholder}</span>
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
              {options.map((option) => (
                <Listbox.Option
                  key={option}
                  className={({ active, selected }) =>
                    `relative cursor-pointer font-fellix-regular  select-none py-2 pl-10 pr-4  ${
                      active || selected
                        ? "bg-primaryBlue text-white"
                        : " text-deepBlack"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate capitalize ${
                          selected ? " font-fellix-medium" : " font-fellix-regular"
                        }`}
                      >
                        {option}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primaryGray">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="8"
                            viewBox="0 0 12 8"
                            fill="none"
                          >
                            <path
                              d="M10.6673 1.66675L6.00065 6.33341L1.33398 1.66675"
                              stroke="#FFFFFF"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default Dropdown;
