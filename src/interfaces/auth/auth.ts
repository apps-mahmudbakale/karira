 export interface SignUpData { 
    name: string;
    email: string;
    password: string;
   phone: string;
   businessName?: string;
   address?: string;
}

export interface UserCreationResponse {
  status: "success" | "error";
  message: string;
  user?: {
    name: string;
    email: string;
    phone: string;
    role: string;
    isVerified: boolean;
    _id: string;
    __v: number;
  };
  token?: string;
}

export interface SignInData {
  email: string;
  password: string;
}


export interface ProfileApiResponse {
  code: number;
  status: string;
  message: string;
  verify: boolean;
  _id: string;
  name: string;
  businessname: string;
  address: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  isVerified: boolean;
  __v: number;
}



export interface ProfileUpdateResponse { }

export interface ProfileUpdateData {
  name: string;
  email: string;
  phone: string;
  businessName?: string;
  address: string;
 };

