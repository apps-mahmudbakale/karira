interface Coordinates {
  coordinates: [number, number];
  type: string;
}

interface Location {
  location: Coordinates;
  address: string;
  _id: string;
}

interface ReceiverInfo {
  f_Name: string;
  phone: number;
  _id: string;
}

interface Delivery {
  _id: string;
  vehicleType: string;
  pickupLocation: Location;
  dropOffLocation: Location;
  description: string;
  receiverInfo: ReceiverInfo;
  delivered: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  estimate: string;
}

export interface SingleDeliveryApiResponse {
  "0": Delivery;
  code: number;
  status: string;
  message: string;
}
