export interface IPatient {
  _id: string;
  userId: string;
  identification: string;
  firstname: string;
  middlename: string;
  lastname: string;
  secondlastname: string;
  birth: string;
  createdAt: Date;
  updatedAt: Date;
}
