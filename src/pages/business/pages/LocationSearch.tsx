import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { motion } from "framer-motion";
import { useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

type LocationSearchProps = {
  formik: any;

  name: string;
};

export default function LocationSearch({ formik, name }: LocationSearchProps) {
  const [selected, setSelected] = useState(null);
  console.log(selected);

  return (
    <PlacesAutocomplete formik={formik} name={name} setSelected={setSelected} />
  );
}

const PlacesAutocomplete = ({ formik, name, setSelected }: any) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address: any) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
    formik.setFieldValue(
      name,
      address
    );

  };

  return (
    <div>
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          className="w-full border border-[#DDD] bg-[#FAFAFC] text-deepBlack font-fellix-regular rounded-lg py-3 px-4 outline-none sm:px-[18px] focus:outline-none placeholder:text-[#758494]"
          placeholder="Search location"
        />
        <ComboboxPopover
          className={`mt-1  max-h-64 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm ${
            !data.length && "hidden"
          }`}
        >
          <ComboboxList className="text-deepBlack font-fellix-regular">
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>

      {/* render error message */}

      {formik.touched[name] && formik.errors[name] ? (
        <motion.div
          initial={{ opacity: 0, y: "-10px" }}
          animate={{ opacity: 1, y: "0px" }}
          exit={{ opacity: 0, y: "-10px" }}
          className="text-red-500 text-sm tracking-wider mt-1 font-fellix-regular"
        >
          {formik.errors[name]}
        </motion.div>
      ) : null}
    </div>
  );
};
