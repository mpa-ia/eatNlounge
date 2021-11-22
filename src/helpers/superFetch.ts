/* eslint-disable @typescript-eslint/no-explicit-any */
import { SSR_API_URL, API_URL, COOKIES_DOMAIN } from '../settings';
import axios from 'axios';
import Cookies from 'js-cookie';
import {notificate} from '../helpers/codesHandler';

type BaseType = (url: string, ssr?: boolean, data?: unknown) => Promise<ApiResponse<any>>;
type Method = 'get' |'post' | 'put' | 'delete';

type SuperFetchType = Record<Method, BaseType>
// info: optionally type SuperFetchType = { [key in Method]: BaseType };


const base = (method: Method, url: string, ssr = false, data: unknown | undefined = {}): Promise<ApiResponse<any>> => {
  const apiUrl = ssr ? SSR_API_URL : API_URL;
  const safeApiUrl = apiUrl[apiUrl.length - 1] === '/' ? apiUrl.slice(0, apiUrl.length - 1) : apiUrl;
  return axios({
    url: `${safeApiUrl}/${url}`,
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${Cookies.get('id_token')}`,
    },
    data: method === 'post' || method === 'put' || method === 'delete' ? JSON.stringify(data) : null,
  })
    .then(response => {
      if (response.data.status === 'success') {
        const { data } = response.data;
        if (data && data.token) {
          Cookies.set('id_token', data.token), { path: '/', domain: COOKIES_DOMAIN };
        }
        return response.data;
      }
      else throw response;
    })
    .catch(err => {
      if (err.response && err.response.data) {
        notificate.error(err.response.data.errorCode);
      }
    });
};

/* Przypisanie rodzajów zapytań do metody obsługującej zapytania */
const SuperFetch = {} as SuperFetchType;
['get', 'post', 'put', 'delete'].forEach((method => {
  SuperFetch[method as Method] = base.bind(null, method as Method);
}));
export default SuperFetch;
