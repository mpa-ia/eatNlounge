import Tln from '../components/languageProvider/Tln';

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
    { value: 'water', title: <Tln id="BOOKINGS_STARTER_WATER"/> },
    { value: 'bread', title: <Tln id="BOOKINGS_STARTER_BREAD"/> },
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
    signIn: <Tln id="SIGN_IN"/>,
    signUp: <Tln id="SIGN_UP"/>,
  },
  pages: {
    bookings: {
      header: <Tln id="BOOKINGS_BOOK_TABLE"/>,
      title: <Tln id="BOOKINGS_BOOK_TABLE"/>,
      bookingForm: {
        confirm: <Tln id="CONFIRM"/>,
        enterPhone: <Tln id="BOOKINGS_PHONE"/>,
        enterSurname: <Tln id="BOOKINGS_SURNAME"/>,
        enterPeople: <Tln id="BOOKINGS_PEOPLE"/>,
        pickHours: <Tln id="BOOKINGS_PICK_HOURS"/>,
        pickDate: <Tln id="BOOKINGS_PICK_DATE"/>,
        selectStarters: <Tln id="BOOKINGS_SELECT_STARTERS"/>,
      },
      validation: {
        success: <Tln id="BOOKINGS_SUBMIT_SUCCESS"/>,
        selectTable: <Tln id="BOOKINGS_SUBMIT_ERROR_NO_TABLE"/>,
      },
    },
    signUpIn: {
      signInLink: <Tln id="SIGN_IN_LINK"/>,
      signUpLink: <Tln id="SIGN_UP_LINK"/>,
      form: {
        email: 'E-mail',
        password: <Tln id="SIGN_FORM_PASSWORD"/>,
        confirmPassword: <Tln id="SIGN_FORM_PASSWORD_CONFIRM"/>,
        name: <Tln id="SIGN_FORM_NAME"/>,
        surname: <Tln id="SIGN_FORM_SURNAME"/>,
        acceptPolicy: <Tln id="SIGN_FORM_ACCEPT_POLICY"/>,
      },
    },
  },
};
