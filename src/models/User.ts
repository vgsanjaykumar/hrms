import mongoose, { Document, Model, model, Schema } from 'mongoose';

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

     // Profile fields
  dob?: string;
  gender?: string;
  location?: string;
  image?: string; // base64 or image URL
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
    name: String,
    email: { type: String, unique: true },
    password: String,
    phone: String,
    dob: String,
    gender: String,
    location: String,
    image: String,
    skills: [String],
    education: [
      {
        course: String,
        organization: String,
        startTime: String,
        endTime: String,
        score: String,
      },
    ],
  },
  { timestamps: true }
);
const User: Model<IUser> = mongoose.models.User || model<IUser>('User', userSchema);
export default User;
