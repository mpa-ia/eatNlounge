import axios from 'axios';
import { SSR_API_URL_BOOKINGS, API_URL_BOOKINGS, settings } from '../settings';

export const getBookingsList = async (): Promise<Bookings.Booking[] | undefined> => {
  try {
    const response = await axios.get(SSR_API_URL_BOOKINGS);
    const bookings = await response.data.data;
    if (bookings) return bookings;
  } catch (error) {
    console.log(error);
  }
};

export const submitNewBooking = async (payload: Bookings.BookingFormFields): any => {
  try {
    const response = await axios.post(`${API_URL_BOOKINGS}/${settings.apiRoutes.booking.submit}`, payload);
    const success = await response.data;
    if (success) return success;
  } catch (error) {
    console.log(error);
  }
};

