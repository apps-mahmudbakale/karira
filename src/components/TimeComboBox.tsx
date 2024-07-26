import { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { IoIosCheckmark } from "react-icons/io";
import generateTimeOptions from "../utils/hourOptions";

type Props = {
  formik: any;
};

export default function TimeComboBox({formik}:Props) {
  const [options, setOptions] = useState(generateTimeOptions());
  
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? options
      : options.filter((person) =>
          person
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  useEffect(() => {
    if (options.length === 0) {
      setOptions(generateTimeOptions());
    }
  }, [options]);
  return (
    <>
      <div className="w-[268px]">
        <Combobox
          value={
           formik.values.time
              
          }
          onChange={(value) =>
            formik.setFieldValue("time", value)}
        >
          <div className="relative ">
            <div className="text-sm relative  cursor-pointer overflow-hidden text-primaryBlack font-groteska-regular select-none  outline-none focus:outline-none w-full border h-12 px-4 border-[#DDD] rounded-lg">
              <Combobox.Input
                className="w-full border-none py-3.5  pr-10 text-sm leading-5 text-gray-900 font-groteska-regular outline-none placeholder-gray-500 focus:outline-none"
                placeholder="Time"
                onChange={(event) => setQuery(event.target.value)}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M19.25 10.0005C19.25 15.1095 15.109 19.2505 10 19.2505C4.891 19.2505 0.75 15.1095 0.75 10.0005C0.75 4.89149 4.891 0.750488 10 0.750488C15.109 0.750488 19.25 4.89149 19.25 10.0005Z"
                    stroke="#407BFF"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M13.4321 12.9429L9.66211 10.6939V5.84692"
                    stroke="#407BFF"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options className="absolute mt-1 z-20 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                {filteredPeople.length === 0 && query !== "" ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-primaryBlack font-groteska-medium tracking-wide">
                    Nothing found.
                  </div>
                ) : (
                  filteredPeople.map((person) => (
                    <Combobox.Option
                      key={person}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-6 pr-4 ${
                          active
                            ? " bg-primaryBlue text-white"
                            : " text-deepBlack"
                        }`
                      }
                      value={person}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected
                                ? "font-fellix-medium"
                                : "font-fellix-regular"
                            }`}
                          >
                            {person}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center  ${
                                active
                                  ? "text-white"
                                  : "text-primaryBlue font-fellix-medium"
                              }`}
                            >
                              <IoIosCheckmark size={24} />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
    </>
  );
}
