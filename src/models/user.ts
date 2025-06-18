import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface IUser extends Document {
    username: string;
    password: string;
    verifyPassword: (password: string) => Promise<boolean>;

}

const UserSchema: Schema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

// Method to verify the password
UserSchema.methods.verifyPassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

export default mongoose.model<IUser>('user', UserSchema);
