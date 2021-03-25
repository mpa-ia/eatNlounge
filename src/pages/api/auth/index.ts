import dbConnect from '../../../backend/serverConfig/dbConnect';
import User from '../../../backend/models/user.model';
import { Response, Request } from 'express/index';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { errorCodes } from '../../../settings/codes';
interface TokenData extends User.Data {
  [key: string]: string | number;
}
export default async function authHandler(req: Request, res: Response): Promise<void> {
  if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
  }
  await dbConnect();
  switch (req.method) {
    case 'GET':
      try {
        if (req.headers.cookie) {
          const [, token] = req.headers.cookie.split('=');
          let decodedUser: TokenData | undefined;
          jwt.verify(token, `${process.env.TOKEN_SECRET}`, (err, decoded) => {
            if (err) res.status(400).end();
            if (decoded) {
              decodedUser = decoded as TokenData;
            }
          });
          if (decodedUser) {
            const users = await User.find({ _id: decodedUser.id });
            if (users.length === 1 && users[0].email === decodedUser.email) {
              const user = users[0];
              const userData = { id: user._id, role: user.role, name: user.name, surname: user.surname, email: user.email };
              const token = jwt.sign(userData, `${process.env.TOKEN_SECRET}`, { expiresIn: '1800s' });
              res.status(200).json({
                status: 'success',
                data: {
                  user: userData,
                  token,
                },
              });
            } else {
              res.status(400).json({ error: true, errorCode: errorCodes.AUTH_UNKNOWN_EMAIL });
            }
          } else {
            res.status(400).end();
          }
        } else {
          res.status(400).end();
        }
      } catch (err) {
        res.status(500).json({ error: true, errorCode: errorCodes.UNKNOWN_ERROR });
      }
      break;
    default:
      res.status(404).end();
  }
}