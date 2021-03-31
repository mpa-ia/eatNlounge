import { Moment } from 'moment';

type DailySchedule = { [key: number]: string[] };
type Schedule = {
	[key: string]: DailySchedule | never;
}
export type UpdateDate = (date: Moment | null) => void;
export type DefineTablesStatus = () => Bookings.Table[];
export type ChangeBookingHours = (range: number[]) => void;

export type CreateBookingSchedule = (schedule: Schedule | never, tableId: string, date: string, startHour: number, duration: number) => Schedule | never;
export type TableOperation = (tableId: string) => void;
export type CheckIfTableIsFree = (tableId: string) => boolean;


export interface Props {
	bookings: Bookings.SingleData<string>[];
}