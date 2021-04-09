import dbConnect from '../../../../server/config/dbConnect';
import Booking from '../../../../server/models/booking.model';
import { Response, Request } from 'express/index';
import { errorCodes } from '../../../settings/codes';

export default async function bookingHandler (req: Request, res: Response): Promise<void> {
  await dbConnect();
  try {
    const bookings = await Booking.find();
    if (!bookings) res.status(404).json({ error: true/* , errorCode: errorCodes.NO_RESOURCE */ });
    else {
      res.json({ status: 'success', data: bookings });
    }
  } catch (err) {
    res.status(500).json({ error: true , errorCode: errorCodes.UNKNOWN_ERROR });
  }
}
