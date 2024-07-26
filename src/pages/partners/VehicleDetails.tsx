import DropZone from "../../components/shared/DropZone";
import ErrorMessage from "../business/pages/ErrorMessage ";

type Props = {
  formik: any;
};


const vehicle_data = [
  {
    id: 1,
    name: "Drivers License",
    field_name: "drivers_License_url",
    file_name: "license_url",
  },
  {
    id: 2,
    name: "Upload Profile Photo",
    field_name: "profile_photo_url",
    file_name: "photo_url",
  },
  {
    id: 3,
    name: "Vehicle exterior",
    field_name: "vehicle_exterior_url",
    file_name: "exterior_url",
  },
  {
    id: 4,
    name: "Vehicle interior",
    field_name: "vehicle_interior_url",
    file_name: "interior_url",
  },
  {
    id: 5,
    name: "Proof of car ownership certificate",
    field_name: "proof_of_ownership_cert_url",
    file_name: "ownership_cert_url",
  },
  {
    id: 6,
    name: "Certificate of Roadworthiness",
    field_name: "cert_of_road_worthiness_url",
    file_name: "road_worthiness_cert_url",
  },
  {
    id: 7,
    name: "LASSRA Card",
    field_name: "lassra_card_url",
    file_name: "card_url",
  },
];

const VehicleDetails = ({formik}:Props) => {
  return (
    <div className="w-full ">
      <h1 className=" text-secondaryBlack font-fellix-regular text-lg text-center sm:text-start sm:text-xl sm:max-w-[656px]">
        We're legally required to ask you for some documents to sign you up as a
        partner. Documents scans and quality photos are accepted.
      </h1>
      <div className="mt-6 sm:mt-[35px]">
        <div className="grid gap-y-10 place-content-center gap-x-8 sm:grid-cols-2 md:gap-x-16 lg:grid-cols-3 xl:gap-x-[120px] lg:gap-y-[83px] lg:max-w-full">
          {vehicle_data.map(({id,field_name,name,file_name}) => (
            <div
              key={id}
              className="max-w-[291px] flex flex-col gap-y-3"
            >
              <h1 className=" text-deepBlack font-fellix-regular text-base">
                {name} <span className="text-[#F00]">*</span>
              </h1>
              <DropZone
                formik={formik}
                field_name={field_name as string}
                file_name={file_name}
              />
              <ErrorMessage formik={formik} name={field_name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VehicleDetails