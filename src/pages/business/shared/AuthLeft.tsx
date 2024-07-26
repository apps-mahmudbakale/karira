import Layer from "../../../assets/Layer_4.png"
const AuthLeft = () => {
  return (
    <div className="w-full bg-primaryBlue flex flex-col  items-center">
      <div className="max-w-[499px]">
        <img className="w-full max-h-[499px] object-cover" src={Layer} alt="" />
        <div className="flex flex-col items-center gap-y-2 mt-9">
          <h1 className="text-xl font-fellix-medium text-white">
            Moving Made Easy
          </h1>
          <p className="text-base text-[#FCFCFD] font-fellix-medium">
            Sign in to explore seamless moving experience
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthLeft
