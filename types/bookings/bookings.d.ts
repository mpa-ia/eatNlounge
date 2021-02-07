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
}