import { Dayjs } from "dayjs";


interface Location {
  coordinates: number[] | null[] | null;
}

export interface RelocationData {
  contactInfo: {
    f_Name: string;
    L_name: string;
    email: string;
    phone: number | string;
  };
  pickupLocation: {
    address: string;
    location: Location;
  };
  dropOffLocation: {
    address: string;
    location: Location;
  };
  description: string;
  receiverInfo: {
    f_Name: string;
    phone: number | string;
  };
  schedule: {
    date: Dayjs | string;
    time: string;
  };
  apartment: {
    mini_Flat: string;
    numberOfRooms: number | string | null;
    moving_From: string;
    moving_To: string;
    loaders: string;
    Image_Url: string;
  };
  upload_Url: string;
}


export interface RelocationResponse {
  code: number;
  status: string;
  message: string;
  contactInfo: {
    f_Name: string;
    L_name: string;
    email: string;
    phone: number;
    _id: string;
  };
  pickupLocation: {
    address: string;
    location: {
      coordinates: [number, number];
      type: string;
    };
    _id: string;
  };
  dropOffLocation: {
    address: string;
    location: {
      coordinates: [number, number];
      type: string;
    };
    _id: string;
  };
  estimate: string;
  description: string;
  upload_Url: string;
  apartment: {
    mini_Flat: string;
    numberOfRooms: number;
    moving_From: string;
    moving_To: string;
    loaders: string;
    Image_Url: string;
    _id: string;
  };
  receiverInfo: {
    f_Name: string;
    phone: number;
    _id: string;
  };
  schedule: {
    date: string;
    time: string;
    _id: string;
  };
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}