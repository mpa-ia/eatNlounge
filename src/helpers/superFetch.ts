/* eslint-disable @typescript-eslint/no-explicit-any */
import { SSR_API_URL, API_URL } from '../settings';
import axios, { AxiosResponse } from 'axios';

type BaseType = (url: string, ssr?: boolean, data?: unknown) => Promise<AxiosResponse<ApiResponse<any>>>;
type Method = 'get' |'post' | 'put' | 'delete';

type SuperFetchType = Record<Method, BaseType>
// info: optionally type SuperFetchType = { [key in Method]: BaseType };

interface CustomHeader {
  'Content-Type': string;
  Accept: string;
  Authorization: string;
}

export const customHeader = (): CustomHeader => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('id_token') : null}`,
});

const base = (method: Method, url: string, ssr = false, data: unknown | undefined = {}): Promise<AxiosResponse<ApiResponse<any>>> => {
  const apiUrl = ssr ? SSR_API_URL : API_URL;
  const safeApiUrl = apiUrl[apiUrl.length - 1] === '/' ? apiUrl.slice(0, apiUrl.length - 1) : apiUrl;
  return axios({
    url: `${safeApiUrl}/${url}`,
    method,
    headers: { ...customHeader() },
    data: method === 'post' || method === 'put' || method === 'delete' ? JSON.stringify(data) : null,
  })
    .then(response => {
      if (response.data.status === 'success') {
        const { data } = response.data;
        if (data && data.token) {
          localStorage.setItem('id_token', data.token);
        }
        return response.data;
      }
      else throw response;
    })
    .catch(err => {
      console.log(err);
      const { errorCode } = err.response.data;
      if (errorCode) {
        console.log(errorCode);
      // todo: execute error codes
      }
    });
};

/* Przypisanie rodzajów zapytań do metody obsługującej zapytania */
const SuperFetch = {} as SuperFetchType;
['get', 'post', 'put', 'delete'].forEach((method => {
  SuperFetch[method as Method] = base.bind(null, method as Method);
}));
export default SuperFetch;
