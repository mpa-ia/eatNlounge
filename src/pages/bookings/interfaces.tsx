import { Moment } from 'moment';

export type UpdateDate = (date: Moment | null) => void;
export type DefineTablesStatus = () => Bookings.Table[];
export type ChangeBookingHours = (range: number[]) => void;

// export type BookingScheduleChecking = (date: string, hour: number, duration: number, tableId: string) => void;
export type TableOperation = (tableId: string) => void;
export type CheckIfTableIsFree = (tableId: string) => boolean;
