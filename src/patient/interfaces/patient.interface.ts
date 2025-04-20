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
  latitude?: string;
  longitude?: string;

  locationHistory?: {
    location: string;
    latitude: string;
    longitude: string;
    updatedAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
