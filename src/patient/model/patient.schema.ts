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

  @Prop({ required: true })
  location?: string;

  @Prop({ required: true })
  latitude?: number;

  @Prop({ required: true })
  longitude?: number;

  @Prop({
    type: [
      {
        location: {type: String, required: true},
        latitude: {type: Number, required: true},
        longitude: {type: Number, required: true},
        updatedAt: {type: Date, default: Date.now},
      },
    ],
    default: [],
    required: false,
  })
  locationHistory?: {
    location: string;
    latitude: number;
    longitude: number;
    updatedAt: Date;
  }[];
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
