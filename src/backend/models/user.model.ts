import mongoose, { Document } from 'mongoose';

type DBUser = User.DBUser & Document;

const userSchema = new mongoose.Schema({
  surname: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: Number, required: true },
},
{ versionKey: false },
);

export default mongoose.models.User || mongoose.model<DBUser>('User', userSchema);