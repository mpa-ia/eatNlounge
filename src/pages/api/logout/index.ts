import { successCodes, errorCodes } from '../../../settings/codes';
import withSession from '../../../middlewares/withSession';

export default withSession(async function handler(req, res): Promise<void> {
  try {
    req.session.destroy();
    res.status(200).json({ status: 'success', code: successCodes.LOGOUT_SUCCESS, data: { user: undefined } });
  } catch (err) {
    res.status(500).json({ error: true, errorCode: errorCodes.UNKNOWN_ERROR });
  }
});