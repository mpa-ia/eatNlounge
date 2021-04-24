import React from 'react';
import { Table } from 'antd';
import { bookingColumns } from '../../settings';
import dataTypesMapper from '../../helpers/dataTypes/dataTypesMapper';
interface Props {
	bookings: Bookings.SingleData<number>[];
}
const mapTableData = (bookings: Bookings.SingleData<number>[]) =>
  bookings.map(booking => {
    const [startHour, endHour] = booking.hours;
    return {
      ...booking,
      startHour,
      endHour,
    };
  });
const BookingsTable: React.FunctionComponent<Props> = (props) => {

  return (
    <Table
      columns={bookingColumns}
      dataSource={dataTypesMapper.generateContent(mapTableData(props.bookings), bookingColumns)}
    />

  );
};

export default BookingsTable;
