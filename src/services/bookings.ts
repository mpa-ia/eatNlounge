import SuperFetch from '../helpers/superFetch';
import { Moment } from 'moment';

export const getBookingsList = async (): Promise<ApiResponse<Bookings.SingleData<string>[]>> =>
  SuperFetch.get('bookings', true);

export const submitNewBooking = async (payload: Bookings.SingleData<Moment>): Promise<ApiResponse<undefined>> =>
  SuperFetch.post('bookings/new', false, payload);
