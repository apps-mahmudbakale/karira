import { SetStateAction, useState } from 'react';
import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FaCheck } from "react-icons/fa6";
import { vehicles } from "../../../constants/data";

const Dropdown = ({ onSelect }) => {
  const [selectedVehicle, setSelectedVehicle] = useState('');

  const handleChange = (value: SetStateAction<string>) => {
    setSelectedVehicle(value);
    onSelect(value);
  };

  return (
      <div className="w-full">
        <Listbox value={selectedVehicle} onChange={handleChange}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-pointer bg-[#FAFAFC] font-fellix-medium h-12 pl-3 pr-10 text-left rounded-lg border border-[#DDD]">
            <span className={`block truncate ${selectedVehicle ? "text-deepBlack" : "text-grey-00"}`}>
              {selectedVehicle || "Select vehicle type"}
            </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-5">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M10.6673 1.66675L6.00065 6.33341L1.33398 1.66675" stroke="#8F9BB3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            </Listbox.Button>
            <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base font-groteska-regular shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {vehicles.map((option) => (
                    <Listbox.Option
                        key={option.id}
                        value={option.name}
                        className={({ active }) =>
                            `${active ? "text-primaryBlue bg-[#F5F5FA]" : "text-deepBlack"} cursor-pointer select-none relative py-2 pl-10 pr-4`
                        }
                    >
                      {({ selected }) => (
                          <>
                      <span className={`${selected ? "font-fellix-semibold" : "font-fellix-regular"} block truncate`}>
                        {option.name}
                      </span>
                            {selected && (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primaryBlue">
                          <FaCheck />
                        </span>
                            )}
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
