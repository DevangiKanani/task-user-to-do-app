import jwt from 'jsonwebtoken';
import { IUser } from '../models/user';

export function generateAuthToken(user: Pick<IUser, '_id' | 'username'>): string {
    return jwt.sign(
        { _id: user._id, username: user.username },
        process.env.JWT_SECRET || 'user_to_do_app_secret',
        { expiresIn: '3h' }
    );
}
