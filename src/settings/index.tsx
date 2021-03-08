const DEV_SERVER_URL = 'http://localhost:8000/api';
export const API_URL = process.env.NODE_ENV === 'production' ? '' : `${DEV_SERVER_URL}`;
export const API_URL_BOOKINGS = `${API_URL}/bookings`;
export const API_URL_AUTH = `${API_URL}/auth`;


const SSR_SERVER_URL = 'http://eat-n-lounge.local:3000/api';
export const SSR_API_URL = process.env.NODE_ENV === 'production' ? '' : `${SSR_SERVER_URL}`;
export const SSR_API_URL_BOOKINGS = `${SSR_API_URL}/bookings`;
export const SSR_API_URL_AUTH = `${SSR_API_URL}/auth`;


export const COOKIES_DOMAIN = process.env.COOKIES_DOMAIN_URL ? process.env.COOKIES_DOMAIN_URL : 'eat-n-lounge.local';


export const settings = {
  hours: {
    open: 12,
    close: 24,
    step: 0.5,
    latest: 22,
    defaultMin: 18,
    defaultMax: 20,
  },
  tables: [
    { id: 'table_1'},
    { id: 'table_2'},
    { id: 'table_3'},
    { id: 'table_4'},
  ],
  starters: [
    { value: 'water', title: 'Lemon Water' },
    { value: 'bread', title: 'Bread' },
  ],
  amountWidget: {
    defaultValue: 2,
    defaultMin: 1,
    defaultMax: 8,
  },
  datePicker: {
    maxDaysInFuture: 14,
  },
};

export const content = {
  general: {
    title: 'Eat n\'Lounge',
    signIn: 'Sign In',
    signUp: 'Sign Up',
  },
  pages: {
    bookings: {
      header: 'Book a Table',
      title: 'Book a Table',
      bookingForm: {
        confirm: 'Confirm',
        enterPhone: 'Phone No.',
        enterSurname: 'Name and Surname',
        enterPeople: 'People',
        pickHours: 'Pick hours',
        pickDate: 'pick date',
        selectStarters: 'Select starters',
      },
      validation: {
        success: 'Booking has been submitted succesfully',
        selectTable: 'Choose table to finish booking process.',
      },
    },
    signUpIn: {
      signInLink: 'Have an account? Sign In.',
      signUpLink: 'Don\'t have account yet? Sign up.',
      form: {
        email: 'E-mail',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        name: 'Name',
        surname: 'Surname',
        acceptPolicy: 'I agree with the Policy.',
      },
    },
  },
};
