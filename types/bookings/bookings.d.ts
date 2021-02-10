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
	interface BookingFormControlledFields {
		date: Moment;
		hours: number[];
		people: number;
		phone: string;
		starters: string[];
		surname: string;
	}

	interface BookingFormFields extends BookingFormControlledFields {
		table: string;
	}
}