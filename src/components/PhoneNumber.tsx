const PhoneNumber = ({ value, handleChange, fieldName }) => {
    return (
        <input
            type="text"
            name={fieldName}
            id={fieldName}
            value={value}
            onChange={handleChange}
            placeholder="Phone number"
            className="w-full py-3 rounded-lg bg-[#FAFAFC] border border-[#DDD] px-4 outline-none focus:border-primaryBlue"
        />
    );
};

export default PhoneNumber;
