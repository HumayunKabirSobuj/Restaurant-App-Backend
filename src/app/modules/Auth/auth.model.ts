import { model, Schema } from 'mongoose';
import { IUser } from './auth.interface';

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    default: 'student',
  },
});

// // hash password before saving
// userSchema.pre('save', async function (next) {
//   if (this.isModified('password')) {
//     const hashed = await bcrypt.hash(this.password, 10);
//     this.password = hashed;
//   }
//   next();
// });

export const User = model<IUser>('User', userSchema);
