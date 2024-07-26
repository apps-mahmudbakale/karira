import {  Outlet } from 'react-router-dom';


const Home = () => {
  
  return (
    <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-[1440px] md:px-24 lg:px-8">
      <Outlet />
    </div>
  );
}

export default Home