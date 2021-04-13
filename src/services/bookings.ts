import SuperFetch from '../helpers/superFetch';
// import { Moment } from 'moment';

export const getBookingsList = async (): Promise<ApiResponse<Bookings.SingleData<number>[]>> =>
  SuperFetch.get('bookings', true);

export const submitNewBooking = async (payload: Bookings.BookingPayload<number>): Promise<ApiResponse<undefined>> =>
  SuperFetch.post('bookings/new', false, payload);

export const getBookingsByUser = async (userId: string): Promise<ApiResponse<Bookings.SingleData<number>[]>> =>
  SuperFetch.get(`bookings/${userId}`, true);

export const editBooking =
  async (id: string, payload: Bookings.BookingPayload<number>): Promise<ApiResponse<Bookings.SingleData<number>>> =>
    SuperFetch.put(`bookings/edit/${id}`, false, payload);

export const cancelBooking =
  async (id: string): Promise<ApiResponse<undefined>> =>
    SuperFetch.delete(`bookings/cancel/${id}`, false);