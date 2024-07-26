import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { useEffect, useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

type LocationSearchProps = {
  formik: any;

  name: string;
};

export default function LocationSearch({ formik, name }: LocationSearchProps) {
  const [_, setSelected] = useState(null);
  

  return (
    <PlacesAutocomplete formik={formik} name={name} setSelected={setSelected} />
  );
}

const PlacesAutocomplete = ({ formik, name, setSelected }: any) => {
  const [isFocused, setIsFocused] = useState(false);
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
      name === "pick" ? "pick.longitude" : "drop.longitude",
      lng
    );
    formik.setFieldValue(
      name === "pick" ? "pick.latitude" : "drop.latitude",
      lat
    );
    formik.setFieldValue(
      name === "pick" ? "pick.address" : "drop.address",
      address
    );
  };

  // fill with previous value
 
    // if (formik.values[name] && formik.values[name].address) {
    //   setValue(formik.values[name].address);
  // }
  
  useEffect(() => {
    if (formik.values[name] && formik.values[name].address) {
      setValue(formik.values[name].address);
    }
  }, [formik.values[name]]);
  
 
  

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        disabled={!ready}
        className="w-full border border-[#DDD] bg-[#FAFAFC] text-deepBlack font-fellix-regular rounded-lg py-3 px-4 outline-none sm:px-[18px] focus:outline-none placeholder:text-[#758494]"
        placeholder="Search location"
      />
      {status === "OK" && data.length > 0  && isFocused && (
        <ComboboxPopover
          className={`mt-1  max-h-64 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm`}
        >
          <ComboboxList className="text-deepBlack font-fellix-regular">
            {data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
          </ComboboxList>
        </ComboboxPopover>
      )}
    </Combobox>
  );
};
