import DbUser from '../../../../server/models/user.model';
import jwt from 'jsonwebtoken';
import { errorCodes } from '../../../settings/codes';
import { Response, Request } from 'express/index';
import dbConnect from '../../../../server/config/dbConnect';

export default async function handler(req: Request, res: Response): Promise<void> {
  await dbConnect();
  switch (req.url) {
    case '/api/auth': {
      authenticate(req, res);
      break;
    }
  }
}
const authenticate = async (req: Request, res: Response): Promise<void> => {
  try {
    if (req.headers.cookie) {
      const [, token] = req.headers.cookie.split('=');
      let decodedUser: User.Data | undefined;
      jwt.verify(token, `${process.env.TOKEN_SECRET}`, (err, decoded) => {
        if (err) res.status(400).end();
        if (decoded) {
          decodedUser = decoded as User.Data;
        }
      });
      if (decodedUser) {
        const users = await DbUser.find({ _id: decodedUser.id });
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
};