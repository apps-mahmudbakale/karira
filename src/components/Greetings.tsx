import { useGetProfileQuery } from '../services/auth/profile';
import getTimeofDay from '../utils/getTimeofDay';

const Greetings = () => {
  const { data: user } = useGetProfileQuery();

  return (
    <>
      <h1 className="text-lg text-solid-black font-fellix-semibold sm:text-xl">
        {getTimeofDay()}, {user?.businessname}
      </h1>
      <p className="text-grey-00 font-fellix-regular text-base px-5 mt-1 sm:px-0 sm:mt-3">
        Take a look at what’s happening to your portfolio today!
      </p>
    </>
  );
}

export default Greetings
