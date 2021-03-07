// import { AxiosResponse } from 'axios';
import SuperFetch from '../helpers/superFetch';

export const getBookingsList = async (): Promise<ApiResponse<Bookings.Booking[]>> =>
  SuperFetch.get('bookings', true);

export const submitNewBooking = async (payload: Bookings.BookingFormFields): Promise<ApiResponse<undefined>> =>
  SuperFetch.post('bookings/new', false, payload);
