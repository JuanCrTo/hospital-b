import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PatientDocument = HydratedDocument<Patient>;

@Schema({ timestamps: true, versionKey: false })
export class Patient {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ required: true, unique: true })
  identification: string;

  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  middlename: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  secondlastname: string;

  @Prop({ required: true })
  birth: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  clinicalage: string;

  @Prop({ required: false })
  location?: string;

  @Prop({ required: false })
  latitude?: string;

  @Prop({ required: false })
  longitude?: string;

  @Prop({
    type: [
      {
        location: String,
        latitude: String,
        longitude: String,
        updatedAt: Date,
      },
    ],
    default: [],
  })
  locationHistory?: {
    location: string;
    latitude: string;
    longitude: string;
    updatedAt: Date;
  }[];
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
