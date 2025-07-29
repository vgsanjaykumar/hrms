// models/User.ts
import mongoose, { Document, Model, Schema, model } from 'mongoose';

interface EducationEntry {
  course: string;
  organization: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
}

export interface IUser extends Document {
  name: string;
  phone: string;
  email: string;
  password: string;
  dob?: string;
  gender?: string;
  location?: string;
  image?: string;
  skills?: string[];
  education?: EducationEntry[];
}

const EducationSchema = new Schema<EducationEntry>({
  course: { type: String, required: true },
  organization: { type: String, required: true },
  startMonth: { type: String, required: true },
  startYear: { type: String, required: true },
  endMonth: { type: String, required: true },
  endYear: { type: String, required: true },
});

const userSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    dob: String,
    gender: String,
    location: String,
    image: String,
    skills: [String],
    education: [EducationSchema],
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.models.User || model<IUser>('User', userSchema);
export default User;
