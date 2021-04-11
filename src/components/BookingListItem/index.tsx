import React from 'react';
import TimeFormatter from '../../helpers/timeFormatter';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

interface Props {
	booking: Bookings.SingleData<number>;
	onCancel: () => void;
	onEdit: () => void;
	onPreview: (id: string) => void;
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
      </Button>
      <Tooltip title="Edit">
        <Button onClick={props.onEdit} shape="circle" type="text" icon={<EditFilled />}></Button>
      </Tooltip>
      <Tooltip title="Cancel">
        <Button onClick={props.onCancel} shape="circle" type="text" icon={<DeleteFilled />}></Button>
      </Tooltip> 
    </li>
  );
};

export default BookingListItem;
