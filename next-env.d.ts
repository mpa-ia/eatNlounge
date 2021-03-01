/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference path="./types/bookings/bookings.d.ts" />
/// <reference path="./types/user/user.d.ts" />

interface ApiResponse<T> {
	status: 'success';
	code?: number;
	data: T;
}