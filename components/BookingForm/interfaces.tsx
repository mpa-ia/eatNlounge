import { Moment } from 'moment';

export type UpdateDate = (date: Moment | null) => void;
export type ChooseTable = (tableId: string) => void;
export type DefineTablesStatus = () => Bookings.Table[];
export type ChangeBookingHours = (range: number[]) => void;