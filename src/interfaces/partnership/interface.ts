export interface PartnerPayload { 
    email: string;
    phone: string;
    state: string;
}



export interface VehiclePayload {
  firstName: string;
  lastName: string;
  drivers_License_url: string;
  profile_photo_url: string;
  vehicleDetails: {
    vehicle_Manufactural: string;
    color: string;
    tonage: string;
    plate_No: string;
    vehicle_Year: string;
  };
  vehicle_exterior_url: string;
  vehicle_interior_url: string;
  proof_of_ownership_cert_url: string;
  cert_of_road_worthiness_url: string;
  lassra_card_url: string;
  gender: string;
}
