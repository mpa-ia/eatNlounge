import { Moment } from 'moment';

export type UpdateDate = (date: Moment | null) => void;
export type DefineTablesStatus = () => Bookings.Table[];
export type ChangeBookingHours = (range: number[]) => void;

export type CreateBookingSchedule = (schedule: any, tableId: string, date: string, startHour: number, duration: number) => any;
export type TableOperation = (tableId: string) => void;
export type CheckIfTableIsFree = (tableId: string) => boolean;
