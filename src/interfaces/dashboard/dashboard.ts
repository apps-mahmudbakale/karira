export interface DeliveryPayload {
  vehicleType: string;
  pickupLocation: {
    address: string;
    location: {
      coordinates: number[] | null | null[];
    };
  };
  dropOffLocation: {
    address: string;
    location: {
      coordinates: number[] | null | null[];
    };
  };
  description: string;
  receiverInfo: {
    f_Name: string;
    phone: number | null;
    address: string;
  };
}

// api response

interface ContactInfo {
  f_Name: string;
  L_name: string;
  email: string;
  phone: number;
  _id: string;
}

interface Location {
  coordinates: number[];
  type: string;
}

interface LocationAddress {
  location: Location;
  address: string;
  _id: string;
}

interface ReceiverInfo {
  f_Name: string;
  phone: number;
  _id: string;
}

export interface Delivery {
  _id: string;
  contactInfo: ContactInfo;
  vehicleType: string;
  pickupLocation: LocationAddress;
  dropOffLocation: LocationAddress;
  description: string;
  receiverInfo: ReceiverInfo;
  delivered: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  estimate: string;
  startDelivery?: boolean;
  startDeliveryTime?: string;
}

export interface DeliveriesResponse {
  "0": Delivery[];
  code: number;
  message: string;
  status: string;
}
