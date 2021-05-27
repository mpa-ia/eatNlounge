import Tln from '../components/languageProvider/Tln';
import moment from 'moment';

const DEV_SERVER_URL = 'http://localhost:8000/api';
export const API_URL = process.env.NODE_ENV === 'production' ? '' : `${DEV_SERVER_URL}`;
export const API_URL_BOOKINGS = `${API_URL}/bookings`;
export const API_URL_AUTH = `${API_URL}/auth`;


const SSR_SERVER_URL = 'http://eat-n-lounge.local:3000/api';
export const SSR_API_URL = process.env.NODE_ENV === 'production' ? '' : `${SSR_SERVER_URL}`;
export const SSR_API_URL_BOOKINGS = `${SSR_API_URL}/bookings`;
export const SSR_API_URL_AUTH = `${SSR_API_URL}/auth`;


export const COOKIES_DOMAIN = process.env.COOKIES_DOMAIN_URL ? process.env.COOKIES_DOMAIN_URL : 'eat-n-lounge.local';

export const tokenExpiration = 1800;

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
  starters: ['water', 'bread'],
  amountWidget: {
    defaultValue: 2,
    defaultMin: 1,
    defaultMax: 8,
  },
  datePicker: {
    maxDaysInFuture: 14,
    defaultDate: moment().add(1, 'days'),
  },
};

export const content = {
  general: {
    title: 'Eat n\'Lounge',
    signIn: <Tln id="SIGN_IN"/>,
    signUp: <Tln id="SIGN_UP" />,
    bookingPreview: <Tln id="USER_BOOKING_PREVIEW" />,
    clickToPreview: <Tln id="USER_BOOKING_CLICK_TO_PREVIEW" />,
    noBookings: <Tln id="USER_BOOKING_NO_BOOKINGS" />,
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
        selectStarters: <Tln id="BOOKINGS_STARTERS"/>,
      },
      validation: {
        success: <Tln id="BOOKINGS_SUBMIT_SUCCESS" />,
        editSuccess: <Tln id="BOOKINGS_EDIT_SUCCESS" />,
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
    user: {
      myBookings: <Tln id="USER_MY_BOOKINGS" />,
      bookingPreview: <Tln id="USER_BOOKING_PREVIEW" />,
      clickToPreview: <Tln id="USER_BOOKING_CLICK_TO_PREVIEW" />,
      noBookings: <Tln id="USER_BOOKING_NO_BOOKINGS" />,
    },
    admin: {
      bookings: <Tln id="ADMIN_ALL_BOOKINGS" />,
      bookingPreview: <Tln id="USER_BOOKING_PREVIEW" />,
      clickToPreview: <Tln id="USER_BOOKING_CLICK_TO_PREVIEW" />,

    },
  },
};

export const bookingColumns: SingleColumn[] = [
  {
    title: <Tln id="BOOKINGS_PICK_DATE" />,
    dataIndex: 'date',
    key: 'date',
    type: 'date',
  },
  {
    title: <Tln id="BOOKINGS_START_HOUR" />,
    dataIndex: 'startHour',
    key: 'startHour',
    type: 'hour',
  },
  {
    title: <Tln id="BOOKINGS_END_HOUR" />,
    dataIndex: 'endHour',
    key: 'endHour',
    type: 'hour',
  },
  {
    title: <Tln id="BOOKINGS_TABLE" />,
    dataIndex: 'table',
    key: 'table',
    type: 'text',
  },
  {
    title: <Tln id="BOOKINGS_SURNAME" />,
    dataIndex: 'surname',
    key: 'surname',
    type: 'text',
  },
  {
    title: <Tln id="BOOKINGS_PHONE" />,
    dataIndex: 'phone',
    key: 'phone',
    type: 'text',
  },
  {
    title: <Tln id="BOOKINGS_PEOPLE" />,
    dataIndex: 'people',
    key: 'people',
    type: 'number',
  },
  {
    title: <Tln id="BOOKINGS_STARTERS" />,
    dataIndex: 'starters',
    key: 'starters',
    type: 'starters',
  },
];