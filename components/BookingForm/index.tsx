import React, { useCallback, useState } from 'react';
import { DatePicker, InputNumber, Form, Button, Slider, Input } from 'antd';
import Tables from '../Tables';
import { settings, content } from '../../settings';
import moment from 'moment';
import * as BookingFormTypes from './interfaces';

const { hours, amountWidget, datePicker } = settings;
const { bookingForm } = content.pages.bookings;

interface Props {
	schedule: Bookings.Schedule | undefined; 
}

function BookingForm(props: Props): React.ReactElement {
  const [pickedDate, pickDate] = useState(moment());
  const [startHour, setStartHour] = useState<number>(hours.defaultMin);
  // const [duration, setDuration] = useState<number>(hours.defaultMax - hours.defaultMin);
  const [selectedTable, selectTable] = useState<string | null>(null);
  const formatSliderTip = useCallback(
    value => {
      if (value) {
        if (value % 1 === 0) {
          return `${value}:00`;
        } else {
          const [naturalNumber] = value.toString().split('.');
          return `${naturalNumber}:30`;
        }
      }
    },
    [],
  );
  const disableDates = useCallback(
    current => 
      current.diff(moment(), 'days') >= datePicker.maxDaysInFuture || current.diff(moment(), 'days') < 0
    , [],
  );
  const updateDate: BookingFormTypes.UpdateDate = date => {
    if (date) pickDate(date);

  };
  const chooseTable: BookingFormTypes.ChooseTable = tableId => {
    selectTable(tableId);
  };
  const defineTablesStatus: BookingFormTypes.DefineTablesStatus = () =>
    settings.tables.map(table => {
      let isTableFree = true;
      const date = pickedDate.format('YYYY/MM/DD');
      if (
        props.schedule &&
				props.schedule[date] &&
				props.schedule[date][startHour] &&
				props.schedule[date][startHour].includes(table.id)
      ) {
        isTableFree = false;
      }
      return {
        ...table,
        isFree: isTableFree,
        selected: selectedTable === table.id,
      };
    });
  const changeBookingHours: BookingFormTypes.ChangeBookingHours = range => { 
    const [startHour, endHour] = range;
    setStartHour(startHour);
    setDuration(endHour - startHour);
  };
  return (
    <Form>
      <Form.Item label={bookingForm.pickDate}>
        <DatePicker
          disabledDate={disableDates}
          onChange={updateDate}
          defaultValue={pickedDate}
        />
      </Form.Item>
      <Form.Item label={bookingForm.pickHours}>
        <Slider
          range
          min={hours.open}
          max={hours.latest}
          defaultValue={[hours.defaultMin, hours.defaultMax]}
          step={hours.step}
          tooltipVisible
          marks={{
            [hours.open]: { label: <strong>{hours.open}:00</strong> },
            [hours.latest]: { label: <strong>{hours.latest}:00</strong> },
          }}
          tipFormatter={formatSliderTip}
          onChange={changeBookingHours}
        />
      </Form.Item>
      <Form.Item label={bookingForm.enterPeople}>
        <InputNumber
          min={amountWidget.defaultMin}
          max={amountWidget.defaultMax}
          defaultValue={amountWidget.defaultValue}
        />
      </Form.Item>
      <Form.Item label={bookingForm.enterSurname}>
        <Input />
      </Form.Item>
      <Form.Item label={bookingForm.enterPhone}>
        <Input />
      </Form.Item>
      <Tables
        tables={defineTablesStatus()}
        onSelect={chooseTable}
      />
      <Form.Item>
        <Button>{bookingForm.confirm}</Button>
      </Form.Item>
    </Form>
  );
}

export default BookingForm;
