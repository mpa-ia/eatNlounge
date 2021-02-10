import React, { useCallback, useState } from 'react';
import { DatePicker, InputNumber, Form, Button, Slider, Input, Checkbox, notification } from 'antd';
import Tables from '../Tables';
import { settings, content } from '../../settings';
import moment from 'moment';
import * as BookingFormTypes from './interfaces';

const { hours, amountWidget, datePicker } = settings;
const { bookingForm, validation } = content.pages.bookings;

interface Props {
	schedule: Bookings.Schedule | undefined; 
	onSubmit: (value: Bookings.BookingFormFields) => void;
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
    const [startHour] = range;
    setStartHour(startHour);
    // setDuration(endHour - startHour);
  };
  const submitBooking = (values: Bookings.BookingFormControlledFields): void => {
    if (selectedTable) {
      props.onSubmit({ ...values, table: selectedTable });
    } else {
      notification.error({
        message: validation.selectTable,
      });
    }
  };
  return (
    <Form
      onFinish={submitBooking}
      initialValues={{
        hours: [hours.defaultMin, hours.defaultMax],
        date: pickedDate,
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
          onChange={updateDate}
          defaultValue={pickedDate}
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
          onChange={changeBookingHours}
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
        tables={defineTablesStatus()}
        onSelect={chooseTable}
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
