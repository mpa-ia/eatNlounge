import React, { useCallback } from 'react';
import { DatePicker, InputNumber, Form, Slider, Input, Checkbox } from 'antd';
import Tables from '../Tables';
import { settings, content } from '../../settings';
import moment, { Moment } from 'moment';
import TimeFormatter from '../../helpers/timeFormatter';
import Tln from '../languageProvider/Tln';

const { hours, amountWidget, datePicker } = settings;
const { bookingForm } = content.pages.bookings;

interface Props {
  onBookingHoursChange: (range: number[]) => void;
  onDatePicking: (date: Moment | null) => void;
  onTableSelection: (tableId: string) => void;
  pickedDate: Moment;
  tables: Bookings.Table[];
  readOnly: boolean;
}

function BookingPreview(props: Props): React.ReactElement {
  const formatSliderTip = useCallback(
    value => {
      if (value) return TimeFormatter.parseHour(value);
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
    <>
      <Form.Item
        label={bookingForm.pickDate}
        name="date"
        rules={[{ required: true }]}
      >
        <DatePicker
          disabledDate={disableDates}
          onChange={props.onDatePicking}
          disabled={props.readOnly}
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
          disabled={props.readOnly}
        />
      </Form.Item>
      <Form.Item
        label={bookingForm.enterPeople}
        name="people"
      >
        <InputNumber
          min={amountWidget.defaultMin}
          max={amountWidget.defaultMax}
          disabled={props.readOnly}
        />
      </Form.Item>
      <Form.Item
        label={bookingForm.enterSurname}
        name="surname"
        rules={[{ required: true }]}
      >
        <Input
          disabled={props.readOnly}
        
        />
      </Form.Item>
      <Form.Item
        label={bookingForm.enterPhone}
        name="phone"
        rules={[{ required: true }]}
      >
        <Input
          disabled={props.readOnly}
        
        />
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
            <Checkbox
              disabled={props.readOnly}
              key={starter} value={starter}>
              <Tln id={`BOOKINGS_STARTER_${starter.toUpperCase()}`} />
            </Checkbox>,
          )}
        </Checkbox.Group>
      </Form.Item>
    </>
  );
}
export default BookingPreview;
