import React from 'react';
import { Table } from 'antd';
import { TableProps } from 'antd/lib/table';
import { bookingColumns } from '../../settings';
import dataTypesMapper from '../../helpers/dataTypes/dataTypesMapper';

interface Props extends TableProps<Bookings.SingleData<number>> {
  bookings: Bookings.SingleData<number>[];
}
interface TableData extends Bookings.SingleData<number>{
  startHour: number;
  endHour: number;
  key: string;
} 
const mapTableData = (bookings: Bookings.SingleData<number>[]): TableData[] =>
  bookings.map(booking => {
    const [startHour, endHour] = booking.hours;
    return {
      ...booking,
      key: booking._id,
      startHour,
      endHour,
    };
  });
const BookingsTable: React.FunctionComponent<Props> = (props) => {

  return (
    <Table
      { ...props }
      columns={bookingColumns}
      dataSource={dataTypesMapper.generateContent(mapTableData(props.bookings), bookingColumns)}
    />

  );
};

export default BookingsTable;
