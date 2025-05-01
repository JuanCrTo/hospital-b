export interface IPatient {
  _id: string;
  userId: string;
  identification: string;
  firstname: string;
  middlename: string;
  lastname: string;
  secondlastname: string;
  birth: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  locationHistory?: {
    location: string;
    latitude: number;
    longitude: number;
    updatedAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
