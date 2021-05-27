/* eslint-disable no-mixed-spaces-and-tabs */
import jwt, { VerifyErrors } from 'jsonwebtoken';
import { tokenExpiration } from '../settings';

type Sign = (data: User.Data) => string;
type Verify = (token: string) => User.Data | undefined;

class JwtHandler {
	public verify: Verify = (token) => {
	  let decodedUser: User.Data | undefined;
	  jwt.verify(token, `${process.env.TOKEN_SECRET}`, (err: VerifyErrors | null, decoded: any) => {
	    // if (err) res.status(400).end();
	    // if (decoded) {
	    // return decoded;
	    decodedUser = decoded/*  as User.Data */;
	    // }
	  });
	  return decodedUser;
	}
	public sign: Sign = data => jwt.sign(data, `${process.env.TOKEN_SECRET}`, { expiresIn: `${tokenExpiration}s` });
}

export default new JwtHandler();