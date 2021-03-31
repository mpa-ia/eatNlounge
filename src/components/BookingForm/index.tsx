import React, { useCallback } from 'react';
import { DatePicker, InputNumber, Form, Button, Slider, Input, Checkbox } from 'antd';
import Tables from '../Tables';
import { settings, content } from '../../settings';
import moment, { Moment } from 'moment';

const { hours, amountWidget, datePicker } = settings;
const { bookingForm } = content.pages.bookings;

interface Props {
  onBookingHoursChange: (range: number[]) => void;
  onDatePicking: (date: Moment | null) => void;
  onTableSelection: (tableId: string) => void;
  onSubmit: (value: Bookings.SingleData<Moment>) => void;
  pickedDate: Moment;
  tables: Bookings.Table[];
}

function BookingForm(props: Props): React.ReactElement {
  const formatSliderTip = useCallback(
    value => {
      if (value) {
        if (value % 1 === 0) return `${value}:00`;
        else {
          const [naturalNumber] = value.toString().split('.');
          return `${naturalNumber}:30`;
        }
      }
    },
    [],
  );
  const disableDates = useCallback(
    current => 
      current.diff(moment().add(1, 'days'), 'days') >= datePicker.maxDaysInFuture
      ||
      current.diff(moment().add(1, 'days'), 'days') < 0
    , [],
  );
  return (
    <Form
      onFinish={props.onSubmit}
      initialValues={{
        hours: [hours.defaultMin, hours.defaultMax],
        date: props.pickedDate,
        people: amountWidget.defaultValue,
        starters: [],
      }}
    >
      <Form.Item
        label={bookingForm.pickDate}
        name="date"
        rules={[{ required: true }]}
      >
        <DatePicker
          disabledDate={disableDates}
          onChange={props.onDatePicking}
        />
      </Form.Item>
      <Form.Item
        label={bookingForm.pickHours}
        name="hours"
      >
        <Slider
          range
          min={hours.open}
          max={hours.latest}
          step={hours.step}
          tooltipVisible
          marks={{
            [hours.open]: { label: <strong>{hours.open}:00</strong> },
            [hours.latest]: { label: <strong>{hours.latest}:00</strong> },
          }}
          tipFormatter={formatSliderTip}
          onChange={props.onBookingHoursChange}
        />
      </Form.Item>
      <Form.Item
        label={bookingForm.enterPeople}
        name="people"
      >
        <InputNumber
          min={amountWidget.defaultMin}
          max={amountWidget.defaultMax}
        />
      </Form.Item>
      <Form.Item
        label={bookingForm.enterSurname}
        name="surname"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={bookingForm.enterPhone}
        name="phone"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Tables
        tables={props.tables}
        onSelect={props.onTableSelection}
      />
      <Form.Item
        name="starters"
        label={bookingForm.selectStarters}
      >
        <Checkbox.Group>
          {settings.starters.map(starter =>
            <Checkbox key={starter.value} value={starter.value}>{starter.title}</Checkbox>,
          )}
        </Checkbox.Group>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">{bookingForm.confirm}</Button>
      </Form.Item>
    </Form>
  );
}
export default BookingForm;
