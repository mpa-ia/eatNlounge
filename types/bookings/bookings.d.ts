declare namespace Bookings {
	interface HourBlock {
		[key: number]: string[];
	}

	interface Schedule {
		[key: string]: HourBlock | never;
	}
	type Table = {
		isFree: boolean;
		selected: boolean;
		id: string;
	}
	interface SharedBookingData {
		people: number;
		phone: string;
		starters: string[];
		surname: string;
		table: string;
	}
	interface BookingFormFields extends SharedBookingData {
		date: Moment;
		hours: number[];
	}

	interface Booking extends SharedBookingData {
		date: string;
		hour: number;
		duration: number;
	}

}

