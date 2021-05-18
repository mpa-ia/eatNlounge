import DbUser from '../../../../../server/models/user.model';
import jwt from 'jsonwebtoken';
import { errorCodes, successCodes } from '../../../../settings/codes';
import dbConnect from '../../../../../server/config/dbConnect';
import withSession from '../../../../middlewares/withSession';
import bcrypt from 'bcryptjs';

export default withSession(async function handler(req, res): Promise<void> {
  await dbConnect();
  const { email, password } = req.body as User.SignIn;
  try {
    const users = await DbUser.find({ email });
    if (!users.length) res.status(404).json({ error: true, errorCode: errorCodes.AUTH_NO_USER });
    else {
      const user = users[0];
      const validPass = await bcrypt.compare(password, user.password);
      if (!validPass) res.status(400).json({ error: true, errorCode: errorCodes.AUTH_WRONG_PASSWORD });
      else {
        const userData = { id: user._id, role: user.role, name: user.name, surname: user.surname, email: user.email };
        const token = jwt.sign(userData, `${process.env.TOKEN_SECRET}`, { expiresIn: '1800s' });
        req.session.set('user', userData);
        await req.session.save();
        res.status(200).json({
          status: 'success',
          code: successCodes.SIGNIN_SUCCESS,
          data: {
            user: userData,
            token,
          },
        });
      }
    }
  } catch (err) {
    res.status(500).json({ error: true, errorCode: errorCodes.UNKNOWN_ERROR });
  }
});