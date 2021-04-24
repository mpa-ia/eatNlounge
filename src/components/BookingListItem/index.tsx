import React from 'react';
import TimeFormatter from '../../helpers/timeFormatter';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

type IDCallback = (id: string) => void;
interface Props {
	booking: Bookings.SingleData<number>;
  onCancel: IDCallback;
  onEdit: IDCallback;
  onPreview: IDCallback;
}
const BookingListItem: React.FunctionComponent<Props> = (props) =>
  <li>
    <Button
      type="text"
      onClick={props.onPreview.bind(null, props.booking._id)}
    >
      {TimeFormatter.parseUnixToReadableDate(props.booking.date)}
        &nbsp;
      {props.booking.hours.map((hour, idx) =>
        `${TimeFormatter.parseHour(hour)}${idx !== props.booking.hours.length - 1 ? '-' : ''}`,
      )}
        &nbsp;
      {props.booking.table}
    </Button>
    <Tooltip title="Edit">
      <Button
        onClick={props.onEdit.bind(null, props.booking._id)}
        shape="circle"
        type="text"
        icon={<EditFilled />}
      />
    </Tooltip>
    <Tooltip title="Cancel">
      <Button
        onClick={props.onCancel.bind(null, props.booking._id)}
        shape="circle"
        type="text"
        icon={<DeleteFilled />}
      />
    </Tooltip>
  </li>;

export default BookingListItem;
