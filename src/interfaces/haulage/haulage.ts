interface ContactInfo {
  f_Name: string;
  L_name: string;
  email: string;
  phone: number | string | null;
}

interface Location {
  address: string;
  location: {
    coordinates: number[] | null | null[];
  }
}



interface ReceiverInfo {
  f_Name: string;
  phone: number | string | null;
  address: string;
}

export interface TripData {
  contactInfo: ContactInfo;
  vehicleType: string;
  pickupLocation: Location;
  dropOffLocation: Location;
  description: string;
  receiverInfo: ReceiverInfo;
  upload_Url: string;
}

export interface ResponseData {
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
  vehicleType: string;
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
  description: string;
  receiverInfo: {
    f_Name: string;
    phone: number;
    _id: string;
  };
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  estimate: string;
}

