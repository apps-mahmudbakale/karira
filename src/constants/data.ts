import Haulage from '../assets/haulage.png';
import Relocation from '../assets/relocation.png';
import Towing from '../assets/towing.png';
import Sedan from '../assets/vehicles/sedan.png';
import SpaceBus from '../assets/vehicles/space.png';
import MiniVan from '../assets/vehicles/minivan.png';
import PickUp from '../assets/vehicles/pickup.png';
import Van from '../assets/vehicles/van.png';
import OpenTruck from '../assets/vehicles/opentruck.png';
import CoveredTruck from '../assets/vehicles/coverdtruck.png';

import Earning from '../assets/ph_wallet-fill.svg';
import Independence from '../assets/mdi_calendar.svg';
import Community from '../assets/maki_residential-community.svg';



interface IData {
    id: number;
    title: string;
    description: string;
  image: string;
  path: string;
};


interface IVehicle { 
  id: number;
  name: string;
  image: string;
}


 
export const data: IData[] = [
  {
    id: 1,
    title: "Haulage",
    description:
      "Move large items within and outside the city. Our movers are waiting with various vehicles options to suite your need. Whether it's furniture, appliances, or supplies.🚚",
    image: Haulage,
    path: "/services/hauling",
  },
  {
    id: 2,
    title: "Relocation",
    description:
      "Planning a move? We’ve simplified relocation. From packing to unpacking, choose the service you want, professional movers are waiting to ensure a seamless transition to your new space.🏡",
    image: Relocation,
    path: "/services/relocation",
  },
  {
    id: 3,
    title: "Towing",
    description:
      "Swift towing assistance for vehicles in need. Designed for those in need of towing services for vehicles, offering a reliable solution for breakdowns or transportation of non-functioning cars.🚗 ",
    image: Towing,
    path: "/services/towing",
  },
];


export const vehicles: IVehicle[] = [
  {
    id: 1,
    name: "Sedan",
    image: Sedan
  },
  {
    id: 2,
    name: "Space Bus",
    image: SpaceBus
  },
  {
    id: 3,
    name: "Mini Van",
    image: MiniVan
  },
  {
    id: 4,
    name: "Pickup Truck",
    image: PickUp
  },
  {
    id: 5,
    name: "Van/Bus",
    image: Van
  },
  {
    id: 6,
    name: "Open Body Truck",
    image: OpenTruck
  },
  {
    id: 7,
    name: "Covered Truck",
    image: CoveredTruck
  }
];

interface IMoverBenefits {
  id: number;
  title: string;
  description: string;
  icon: string; // svg
};
 
// <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none">
//   <path d="M38.8125 12.9375H10.0625C9.68125 12.9375 9.31562 12.786 9.04603 12.5165C8.77645 12.2469 8.625 11.8812 8.625 11.5C8.625 11.1188 8.77645 10.7531 9.04603 10.4835C9.31562 10.214 9.68125 10.0625 10.0625 10.0625H34.5C34.8812 10.0625 35.2469 9.91105 35.5165 9.64147C35.7861 9.37188 35.9375 9.00625 35.9375 8.625C35.9375 8.24375 35.7861 7.87812 35.5165 7.60853C35.2469 7.33895 34.8812 7.1875 34.5 7.1875H10.0625C8.91875 7.1875 7.82185 7.64185 7.0131 8.4506C6.20435 9.25935 5.75 10.3563 5.75 11.5V34.5C5.75 35.6437 6.20435 36.7406 7.0131 37.5494C7.82185 38.3581 8.91875 38.8125 10.0625 38.8125H38.8125C39.575 38.8125 40.3063 38.5096 40.8454 37.9704C41.3846 37.4313 41.6875 36.7 41.6875 35.9375V15.8125C41.6875 15.05 41.3846 14.3187 40.8454 13.7796C40.3063 13.2404 39.575 12.9375 38.8125 12.9375ZM32.3438 27.3125C31.9173 27.3125 31.5004 27.186 31.1458 26.9491C30.7912 26.7122 30.5148 26.3754 30.3516 25.9814C30.1884 25.5874 30.1457 25.1539 30.2289 24.7356C30.3121 24.3173 30.5175 23.9331 30.8191 23.6316C31.1206 23.33 31.5048 23.1246 31.9231 23.0414C32.3414 22.9582 32.7749 23.0009 33.1689 23.1641C33.5629 23.3273 33.8997 23.6037 34.1366 23.9583C34.3735 24.3129 34.5 24.7298 34.5 25.1562C34.5 25.7281 34.2728 26.2766 33.8684 26.6809C33.4641 27.0853 32.9156 27.3125 32.3438 27.3125Z" fill="#407BFF"/>
// </svg>

export const mover_benefits: IMoverBenefits[] = [
  {
    id: 1,
    title: "Earning Potential",
    description:
      "Unlock a new revenue stream by using your vehicle to assist people with their moving needs.",
    icon: Earning,
  },
  {
    id: 2,
    title: "Independence",
    description:
      "Enjoy the freedom to choose your working hours and locations, giving you control over your schedule.",
    icon: Independence,
  },
  {
    id: 3,
    title: "Supportive Community",
    description:
      "Join a community of movers, all dedicated to providing reliable and efficient moving services.",
    icon: Community,
  },
];

interface IGetStarted {
  id: number;
  title: string;
  description: string;
  
};
 
export const get_started: IGetStarted[] = [
  {
    id: 1,
    title: "Sign Up",
    description:
      "Provide some details about your vehicle, and start exploring moving opportunities in your area.",
  },
  {
    id: 2,
    title: "Receive Requests",
    description:
      "Get notified of moving requests that match your vehicle type and availability. Choose the jobs that fit your schedule.",
  },
  {
    id: 3,
    title: "Earn Money",
    description:
      "Help people move items with your vehicle and start earning. The more you move, the more money you make.",
  },
];


interface IFaq { 
  id: number;
  question: string;
  answer: string;
};

export const faq: IFaq[] = [
  {
    id: 1,
    question: "What is  Karria?",
    answer:
      "Karria connects individual and businesses in need moving and logistics services with a wide range of movers with different vehicle ranges for various logistics need. Karria is designed to help movers increase their earning by opening them up to a wider audience.",
  },
  {
    id: 2,
    question: "How do I become a partner?",
    answer:
      "To become a partner, you need to have a vehicle, valid driver’s license and other relevant documents. You can sign up as a partner from our website. Once your account is approved, you can start receiving moving requests.",
  },
  {
    id: 3,
    question: "How do I receive moving requests?",
    answer:
      "You’ll receive requests on your phone and via WhatsApp. You can choose the requests that fit your schedule and pricing.",
  },
  {
    id: 4,
    question: "How do I get paid?",
    answer:
      "You will receive your payment directly to your bank account. You will be able to track your earnings from your profile.",
  },
  {
    id: 5,
    question: "How much can I earn?",
    answer:
      "Your earnings will depend on the number of moving requests you accept. The more you move, the more money you make.",
  },
];

export const vehicle_types: string[] = [
  "Truck",
  "Van/ Bus",
  "Pickup",
  "Sedan",
  "Space Bus",
  "SUV",
];

interface SDeliveries {
  id: string | number;
  name: string;
  price: number | string;
  location: string
  contact: string;
  date: string;
  isDelivered: boolean;
}

export const deliveries: SDeliveries[] = [
  {
    id: 1,
    name: "Temitope Adams",
    price: "21,000",
    location: "10 Lateef Musa str Akesan Igando",
    contact: "08012345678",
    date: "Dec 1, 2023, 1:28 PM",
    isDelivered: false,
  },
  {
    id: 2,
    name: "Jane Doe",
    price: "21,000",
    location: "Lagos",
    contact: "08012345678",
    date: "Dec 1, 2023, 1:28 PM",
    isDelivered: true,
  },
  {
    id: 3,
    name: "Temitope Adams",
    price: "21,000",
    location: "10 Lateef Musa str Akesan Igando",
    contact: "08012345678",
    date: "Dec 1, 2023, 1:28 PM",
    isDelivered: false,
  },
  {
    id: 4,
    name: "Jane Doe",
    price: "21,000",
    location: "Lagos",
    contact: "08012345678",
    date: "Dec 1, 2023, 1:28 PM",
    isDelivered: true,
  },
  {
    id: 5,
    name: "Temitope Adams",
    price: "21,000",
    location: "10 Lateef Musa str Akesan Igando",
    contact: "08012345678",
    date: "Dec 1, 2023, 1:28 PM",
    isDelivered: true,
  },
  {
    id: 6,
    name: "Temitope Adams",
    price: "21,000",
    location: "Lagos",
    contact: "08012345678",
    date: "Dec 1, 2023, 1:28 PM",
    isDelivered: false,
  },
  {
    id: 7,
    name: "John Doe",
    price: "21,000",
    location: "10 Lateef Musa str Akesan Igando",
    contact: "08012345678",
    date: "Dec 1, 2023, 1:28 PM",
    isDelivered: false,
  },
  {
    id: 8,
    name: "Temitope Adams",
    price: "21,000",
    location: "Lagos",
    contact: "08012345678",
    date: "2021-10-10",
    isDelivered: true,
  },
];