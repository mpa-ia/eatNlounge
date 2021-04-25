
import { Handler, withIronSession } from 'next-iron-session';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function withSession(handler: Handler): (...args: any[]) => Promise<any> {
  return withIronSession(handler, {
    password: `${process.env.SECRET_COOKIE_PASSWORD}`,
    cookieName: 'next.js/examples/with-iron-session',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  });
}