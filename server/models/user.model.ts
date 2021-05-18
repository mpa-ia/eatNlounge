import mongoose, { Document } from 'mongoose';
import { DBUser as DBUserInterface } from '../../types/user/user';

type DBUser = DBUserInterface & Document;

const userSchema = new mongoose.Schema({
  surname: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
},
{ versionKey: false },
);

export default mongoose.models.User || mongoose.model<DBUser>('User', userSchema);