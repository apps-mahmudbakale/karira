interface Location {
  coordinates: number[] | null[] | null;
}

export interface TowingPayload {
  vehicleType: string;
  pickupLocation: {
    address: string;
    location: Location;
  };
  dropOffLocation: {
    address: string;
    location: Location;
  };
  upload_Url: string;
  timeInMinutes?: string;
  schedule: {
    date: string;
    time: string;
  };
}

export interface TowingApiResponse {
  code: number;
  status: string;
  message: string;
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
  uploadUrl: string;
  schedule: {
    date: string;
    time: string;
    _id: string;
  };
  _id: string;
  __v: number;
}
