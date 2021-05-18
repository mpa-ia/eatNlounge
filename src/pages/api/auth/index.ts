import DbUser from '../../../../server/models/user.model';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import { errorCodes } from '../../../settings/codes';
import dbConnect from '../../../../server/config/dbConnect';
import withSession from '../../../middlewares/withSession';

export default withSession(async function handler(req, res): Promise<void> {
  await dbConnect();
  try {
    if (req.headers.authorization) {
      const [, token] = req.headers.authorization.split(' ');
      let decodedUser: User.Data | undefined;
      jwt.verify(token, `${process.env.TOKEN_SECRET}`, (err: VerifyErrors | null, decoded: any) => {
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
          if (!req.session.get('user')) {
            req.session.set('user', userData);
            await req.session.save();
          }
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
},
);