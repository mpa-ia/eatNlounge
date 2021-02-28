import axios from 'axios';
import { API_URL_AUTH } from '../settings';

export const signIn = async (payload: User.SignIn): Promise<Bookings.Booking[] | undefined> => {
  try {
    const response = await axios.post(`${API_URL_AUTH}/signin`, payload);
    const data = await response.data.data;
    if (data) { 
      localStorage.setItem('token', data.token);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const signUp = async (payload: User.SignIn): Promise<Bookings.Booking[] | undefined> => {
  try {
    const response = await axios.post(`${API_URL_AUTH}/signup`, payload);
    const data = await response.data.data;
    if (data) { 
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};