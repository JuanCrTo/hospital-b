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
}

export const PatientSchema = SchemaFactory.createForClass(Patient);