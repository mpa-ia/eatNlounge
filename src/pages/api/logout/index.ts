import { successCodes, errorCodes } from '../../../settings/codes';
import { Response, Request } from 'express/index';

export default async function handler(req: Request, res: Response): Promise<void> {
  try {
    res.status(200).json({ status: 'success', code: successCodes.LOGOUT_SUCCESS, data: { user: undefined } });
  } catch (err) {
    res.status(500).json({ error: true, errorCode: errorCodes.UNKNOWN_ERROR });
  }
}