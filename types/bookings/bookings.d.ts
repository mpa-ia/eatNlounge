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
	interface SingleData<TDate> {
		people: number;
		phone: string;
		starters: string[];
		surname: string;
		table: string;
		hours: number[];
		date: TDate;
		userId?: string;
	}
}

