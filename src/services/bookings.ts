import { AxiosResponse } from 'axios';
import SuperFetch from '../helpers/superFetch';

export const getBookingsList = async (): Promise<AxiosResponse<ApiResponse<Bookings.Booking[]>>> =>
  SuperFetch.get('bookings', true);

export const submitNewBooking = async (payload: Bookings.BookingFormFields): Promise<AxiosResponse<ApiResponse<undefined>>> =>
  SuperFetch.post('bookings/new', false, payload);
