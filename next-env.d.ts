/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference path="./types/global.d.ts" />
/// <reference path="./types/bookings/bookings.d.ts" />
/// <reference path="./types/user/user.d.ts" />

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}