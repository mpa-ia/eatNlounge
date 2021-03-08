import dbConnect from '../../../backend/serverConfig/dbConnect';
import User from '../../../backend/models/user.model';
import { Response, Request } from 'express/index';
import jwt from 'jsonwebtoken';
import { errorCodes } from '../../../settings/codes';
interface TokenData extends User.Data {
  [key: string]: string | number;
}
export default async function authHandler (req: Request, res: Response): Promise<void> {
  await dbConnect();
  switch (req.method) {
    case 'GET':
      try {
        if (req.headers.cookie) {
          const [, token] = req.headers.cookie.split('=');
          const decoded = jwt.verify(token, `${process.env.TOKEN_SECRET}`) as TokenData;
          const users = await User.find({ _id: decoded.id });
          if (users.length === 1 && users[0].email === decoded.email) {
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
            res.status(404).json({ error: true, errorCode: errorCodes.AUTH_NO_USER });

          }
        } else {
          res.status(400).json({ error: true, errorCode: errorCodes.AUTH_USER_NOT_AUTHENTICATED });
        }
      } catch (err) {
        res.status(500).json({ error: true, errorCode: errorCodes.UNKNOWN_ERROR });
      }
      break;
    default:
      res.status(404).end();
  }
}