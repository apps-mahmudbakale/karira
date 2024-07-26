import React, { useState } from "react";

const DeliveryInfo = ({ pickupLocation, setPickupLocation, dropupLocation, setDropupLocation, description, setDescription, image, handleImageChange }) => {
  return (
      <div className="transition-transform duration-500 ease-in-out transform hover:scale-105">
        <div className="w-full max-w-[537px] space-y-5 mt-8 md:space-y-[34px]">
          <div className="flex flex-col gap-y-[8px] transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-80">
            <label htmlFor="pickup" className="text-[#333]">Pickup Location</label>
            <div className="w-full relative">
              <input
                  type="text"
                  name="pickup"
                  id="pickup"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full border border-[#DDD] bg-[#FAFAFC] text-deepBlack font-fellix-regular rounded-lg py-3 px-4 outline-none sm:px-[18px] focus:outline-none placeholder:text-[#758494] transition-transform duration-300 ease-in-out"
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-[8px] transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-80">
            <label htmlFor="dropup" className="text-[#333]">Drop Up Location</label>
            <div className="w-full relative">
              <input
                  type="text"
                  name="dropup"
                  id="dropup"
                  value={dropupLocation}
                  onChange={(e) => setDropupLocation(e.target.value)}
                  className="w-full border border-[#DDD] bg-[#FAFAFC] text-deepBlack font-fellix-regular rounded-lg py-3 px-4 outline-none sm:px-[18px] focus:outline-none placeholder:text-[#758494] transition-transform duration-300 ease-in-out"
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-y-[8px] transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-80">
            <label htmlFor="description" className="text-[#333] text-base font-fellix-regular">Description<span className="text-[#F04438]">*</span></label>
            <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="block p-3 min-h-[174px] w-full text-sm text-gray-900 border-[#DDD] rounded-lg border outline-none focus:outline-none bg-transparent placeholder:max-w-[329px] placeholder:text-grey-00 placeholder:font-fellix-regular placeholder:text-base transition-transform duration-300 ease-in-out"
                placeholder="Enter the item you’re trying to move e.g Bag of clothes, Furniture set, Freezer etc."
            ></textarea>
          </div>
          <div className="flex flex-col gap-y-[8px] mt-5 transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-80">
            <label htmlFor="image" className="text-[#333]">Upload Image</label>
            <input
                type="file"
                name="image"
                id="image"
                onChange={handleImageChange}
                className="w-full border border-[#DDD] bg-[#FAFAFC] text-deepBlack font-fellix-regular rounded-lg py-3 px-4 outline-none sm:px-[18px] focus:outline-none placeholder:text-[#758494] transition-transform duration-300 ease-in-out"
            />
            {image && (
                <div className="mt-4 transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-80">
                  <img src={image} alt="Selected" className="w-full max-w-[200px] h-auto" />
                </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default DeliveryInfo;
