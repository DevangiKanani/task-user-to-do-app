import CustomRequest  from './custom';
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const isAuth = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];  
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: 'Unauthorized - Token not provided' });
    return;
  }

  try {
    // Verify and decode the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);    

    // Attach the user id to the request object
    req.user = { _id: (decodedToken as any)._id as string };
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};

export default isAuth;
