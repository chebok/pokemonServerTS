// import pkg from 'mongoose';

import { model, Schema, Model, Document } from 'mongoose';

export interface IUser {
  username: string;
  password: string;
  roles: string[];
}

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  roles: [{ type: String, ref: 'Role' }],
});


export const User: Model<any> = model('User', UserSchema);