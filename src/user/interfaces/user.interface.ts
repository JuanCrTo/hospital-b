import { UserRole } from '../enums/user-role.enum';

export interface IUser {
  _id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
