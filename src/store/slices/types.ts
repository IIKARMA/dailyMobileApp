export interface TokenState {
  access_token?: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
}
export interface User {
  balance: number;
  code: string;
  createdAt: string;
  fcmToken?: null;
  id: string;
  nameFirst: string;
  nameLast: string;
  namePatronimic: string;
  phone: string;
  regionId: string;
  sex: string;
  shops: string[];
  status: string;
}
export interface CreateUserReq {
  user: {
    code: string;
    name: {
      first: string;
      last: string;
      patronimic: string;
    };
    phone: string;
  };
}

export type TypeSex = 'female' | 'male';
export interface EditUser {
  nameFirst?: string;
  nameLast?: string;
  namnamePatronimice?: string;
  sex: TypeSex;
  region: string;
}
