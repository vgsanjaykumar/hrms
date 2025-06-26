import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  phone: string;
  email: string;
  dob: Date;
  nationality: string;
  idType: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dob: { type: Date, required: true },
  nationality: { type: String, required: true },
  idType: { type: String, required: true },
  password: { type: String, required: true },
}, { timestamps: true }); // Adds createdAt and updatedAt

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default User;
