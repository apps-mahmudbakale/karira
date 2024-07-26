https://script.google.com/macros/s/AKfycbwU-sRF3P3EaTY6sazS-uaZbgAnIGIiuUOUniPz6cU4diLo8AC-d2RZywRvbkiiNJbe/exec
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

import { useLoadScript } from "@react-google-maps/api";
import { Route, Routes, useLocation } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExpiredModal from "./components/ExpiredModal";
import About from "./pages/About";
import Home from "./pages/Home";
import Login from "./pages/business/pages/Login";
import ResetPassword from "./pages/business/pages/ResetPassword";
import SignUp from "./pages/business/pages/SignUp";
import Verify from "./pages/business/pages/Verify";
import BusinessInfo from "./pages/dashboard/pages/BusinessInfo";
import Deliveries from "./pages/dashboard/pages/Deliveries";
import NewDelivery from "./pages/dashboard/pages/NewDelivery";
import EditDelivery from "./pages/dashboard/pages/EditDelivery";
import PastDelivery from "./pages/dashboard/pages/PastDelivery";
import SingleDelivery from "./pages/dashboard/pages/SingleDelivery";
import Haulage from "./pages/hauling/Haulage";
import DashboardLayout from "./pages/layout/DashboardLayout";
import HomeLayout from "./pages/layout/HomeLayout";
import ServicesLayout from "./pages/layout/ServicesLayout";
import Layout from "./pages/partners/Layout";
import Partnership from "./pages/partners/pages/Partnership";
import VehicleRegistration from "./pages/partners/pages/VehicleRegistration";
import Relocation from "./pages/relocation/Relocation";
import Towing from "./pages/towing/Towing";
import AuthGuard from "./utils/Authguard";
import IndividualSignUp from "./pages/individual/IndividualSignUp";
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

function App() {

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries: ["places"],
  });


  // hide header on partners pages

 
  const location = useLocation();
  // scroll restoration
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);


    const useTokenExpiration = () => {
      const [isTokenExpired, setIsTokenExpired] = useState<boolean>(false);
      useEffect(() => {
        const user = Cookies.get("auth_token");

        if (user) {
          try {
            const decoded: any = jwtDecode(user);

            const expirationTime = decoded.exp * 1000;
            const isExpired = Date.now() > expirationTime;
            setIsTokenExpired(isExpired);
          } catch (error) {}
        }
      }, []);

      return isTokenExpired;
    };
  const isTokenExpired = useTokenExpiration();
  
  const toggleModal = () => { 
    setIsOpen(prev => !prev);
  };


    const handleExpriration = () => {
      if (isTokenExpired) {
       toggleModal();
        setTimeout(() => {
          Cookies.remove("auth_token");
          window.location.href = "/u/login";
        }, 5000);
      }
    };
    useEffect(() => {
      
      if (isTokenExpired) {
        toggleModal();
        
        
        handleExpriration();
      }
    }, [isTokenExpired]);

  return (
    <div className="w-full bg-[#F9FBFC]">
      <ToastContainer
        autoClose={4000}
        icon={false}
        transition={Slide}
        hideProgressBar
        className="mt-20"
      />

      <Routes>
        <Route path="/u/login" element={<Login />} />
        <Route path="/u/signup" element={<SignUp />} />
        <Route path="/u/individual-signup" element={<IndividualSignUp />} />
        <Route path="/u/forgot-password" element={<ResetPassword />} />
        <Route path="/u/verify" element={<Verify />} />
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/partner-with-us" element={<Layout />}>
            <Route index element={<Partnership />} />
            <Route
              path="vehicle-registration"
              element={<VehicleRegistration />}
            />
          </Route>
          {/* // services routes */}
          <Route element={<AuthGuard />}>
            <Route path="/services" element={<ServicesLayout />}>
              <Route path="towing" element={<Towing />} />
              <Route path="hauling" element={<Haulage />} />
              <Route path="relocation" element={<Relocation />} />
            </Route>
          </Route>
        </Route>
        <Route element={<AuthGuard />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="" element={<Deliveries />}>
              <Route path="past-delivery" element={<PastDelivery />} />
              <Route index element={<SingleDelivery />} />
            </Route>
            <Route path="new-delivery/:id?" element={<NewDelivery />} />
            <Route path="update-delivery/:id" element={<EditDelivery />} />
            <Route path="business-info" element={<BusinessInfo />} />
          </Route>
        </Route>
      </Routes>

      {/* session modal */}
      <>
        <ExpiredModal isOpen={isOpen} closeModal={toggleModal} />
      </>
    </div>
  );
}

export default App;
