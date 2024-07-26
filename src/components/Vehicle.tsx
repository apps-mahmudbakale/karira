import { vehicles } from "../constants/data";

const Vehicle = ({ selectedVehicle, setSelectedVehicle }) => {
    return (
        <div className="w-full max-w-[606px] p-5 flex flex-col gap-y-5 md:gap-y-[34px] md:p-0">
            <h1 className="text-base text-[#758494]">
                Select Vehicle Type below<span className="text-[#F04438]">*</span>
            </h1>
            <div className="divide-y divide-[#EDEFF5] border-t border-[#EDEFF5] ">
                {vehicles.map((vehicle) => (
                    <div
                        onClick={() => setSelectedVehicle(vehicle.name)}
                        key={vehicle.id}
                        className={`py-4 px-4 cursor-pointer flex justify-between items-center md:py-6 ${
                            vehicle.name === selectedVehicle
                                ? "bg-[#F5F5FA] !border !border-[#407BFF] rounded-lg"
                                : ""
                        }`}
                    >
                        <div className="flex items-center gap-x-6">
              <span className="w-16 h-16 p-2 flex items-center justify-center rounded-full bg-[#40E2C3] bg-opacity-10 sm:w-20 sm:h-20">
                <img
                    className="w-full object-cover object-center"
                    src={vehicle.image}
                    alt={vehicle.name}
                />
              </span>
                            <p className="text-base font-fellix-medium text-[#000]">
                                {vehicle.name}
                            </p>
                        </div>
                        <span
                            className={`w-6 h-6 flex justify-center items-center border rounded-full transition-all ease-in-out duration-200 ${
                                vehicle.name === selectedVehicle
                                    ? "border-primaryBlue bg-transparent"
                                    : "border-[#C0C0C0] bg-[#FBFBFB]"
                            }`}
                        >
              <span
                  className={`w-3 h-3 rounded-full bg-primaryBlue transition-all ease-in-out duration-200 ${
                      vehicle.name === selectedVehicle
                          ? "bg-primaryBlue"
                          : "bg-transparent"
                  }`}
              ></span>
            </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Vehicle;
