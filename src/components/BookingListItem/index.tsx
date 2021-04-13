import React from 'react';
import TimeFormatter from '../../helpers/timeFormatter';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

type IDCallback = (id: string) => void;
interface Props {
	booking: Bookings.SingleData<number>;
	onCancel: () => void;
  onEdit: IDCallback;
  onPreview: IDCallback;
}
const BookingListItem: React.FunctionComponent<Props> = (props) => {

  return (
    <li>
      <Button
        type="text"
        onClick={props.onPreview.bind(null, props.booking._id)}
      >
        {TimeFormatter.parseUnixToReadableDate(props.booking.date)}
        &nbsp;
        {props.booking.hours.map(hour => TimeFormatter.parseHour(hour))}
        &nbsp;
        {props.booking.table}
      </Button>
      <Tooltip title="Edit">
        <Button onClick={props.onEdit.bind(null, props.booking._id)} shape="circle" type="text" icon={<EditFilled />}></Button>
      </Tooltip>
      <Tooltip title="Cancel">
        <Button onClick={props.onCancel} shape="circle" type="text" icon={<DeleteFilled />}></Button>
      </Tooltip> 
    </li>
  );
};

export default BookingListItem;
