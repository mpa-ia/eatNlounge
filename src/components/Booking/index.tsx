/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { content, settings } from '../../settings';
import * as bookingTypes from './interfaces';
import { notification } from 'antd';
import { Moment } from 'moment';
import { submitNewBooking, editBooking } from '../../services/bookings';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useUser } from '../../context/user';
import { Form, Button } from 'antd';
import timeFormatter from '../../helpers/timeFormatter';

const BookingPreview = dynamic(() => import('../BookingPreview'), { ssr: false });

const { hours, amountWidget, datePicker } = settings;
const { bookingForm } = content.pages.bookings;
  
function Bookings({ bookings, initialValues, readOnly = false, editExistingBooking = false}: bookingTypes.Props): React.ReactElement {
  const router = useRouter();
  const { userData } = useUser();
  const [bookingSchedule, setBookingSchedule] = useState<Bookings.Schedule>();
  const [startHour, setStartHour] = useState<number>(initialValues? initialValues.hours[0] : hours.defaultMin);
  const [duration, setDuration] = useState<number>(initialValues ? initialValues.hours[1] - initialValues.hours[0] : hours.defaultMax - hours.defaultMin);
  const [pickedDate, setDate] = useState(initialValues ? timeFormatter.parseTimestampToMoment(initialValues.date) : datePicker.defaultDate);
  const [selectedTable, setselectedTable] = useState<string | null>(initialValues? initialValues.table : null);
  useEffect(() => {
    let bookingSchedule = {};
    console.log('set booking schedule', bookings);
    bookings.forEach(booking => {
      console.table(booking);
      const [startHour, endHour] = booking.hours;
      const date = timeFormatter.parseUnixToReadableDate(booking.date);
      const bookingPart = createBookingSchedule(bookingSchedule, booking.table, date, startHour, endHour - startHour);
      bookingSchedule = bookingPart;
    });
    setBookingSchedule(bookingSchedule);
  }, [bookings.length]);

  const refreshBookings = (): void => {
    router.replace(router.asPath);
  };
  const createBookingSchedule: bookingTypes.CreateBookingSchedule = (bookings, tableId, date, startHour, duration) => {
    if (!bookings[date]) {
      bookings[date] = {};
    }
    for (let hourBlock = startHour; hourBlock < startHour + duration; hourBlock += 0.5) {
      if (!bookings[date][hourBlock]) {
        bookings[date][hourBlock] = [];
      } 
      bookings[date][hourBlock].push(tableId);
    }
    return bookings;
  };
  const changeBookingHours: bookingTypes.ChangeBookingHours = range => { 
    const [startHour, endHour] = range;
    setStartHour(startHour);
    setDuration(endHour - startHour);
  };
  const checkAvailableDuration: bookingTypes.TableOperation = (table): void => {
    let availableHoursAmount = 0;
    const closingHour = hours.close;
    const date = timeFormatter.parseMomentToReadableDate(pickedDate);
    if (bookingSchedule) {
      for (let hourBlock = startHour; hourBlock < startHour + duration; hourBlock += 0.5) {
        if (!bookingSchedule[date][hourBlock]
          ||
          !bookingSchedule[date][hourBlock].includes(table)) {
          availableHoursAmount += 0.5;
        }
      }
      if (availableHoursAmount !== duration) {
        notification.warning({
          message: `You can book this table only for ${availableHoursAmount} hours, later it is not available`,
        });
      } else if (startHour + duration > closingHour) {
        notification.warning({
          message: `You can book this table only for ${closingHour - startHour} hours, later it is not available`,
        });
      }
    }
  };
  const checkIfTableIsFree: bookingTypes.CheckIfTableIsFree = table => {
    let freeTable = true;
    const date = timeFormatter.parseMomentToReadableDate(pickedDate);
    if (bookingSchedule) {
      for (let hourBlock = startHour; hourBlock < startHour + duration; hourBlock += 0.5) {
        if (
          bookingSchedule[date]
          &&
          bookingSchedule[date][hourBlock]
          &&
          bookingSchedule[date][hourBlock].includes(table)
        ) {
          freeTable = false;
        }
      }
    }
    return freeTable;
  };
  const defineTablesStatus: bookingTypes.DefineTablesStatus = () => {
    return settings.tables.map(table => {
      const isTableFree = checkIfTableIsFree(table.id);
      return {
        ...table,
        isFree: isTableFree,
        selected: selectedTable === table.id,
      };
    });
  };
  const pickDate: bookingTypes.UpdateDate = date => {
    if (date) setDate(date);
  };
  const selectTable: bookingTypes.TableOperation = tableId => {
    setselectedTable(tableId);
  };
  const submitBooking = async (formFieldsData: Bookings.SingleData<Moment>): Promise<void> => {
    if (selectedTable) {
      if (checkIfTableIsFree(selectedTable)) {
        const payload = {
          ...formFieldsData,
          date: formFieldsData.date.unix(),
          table: selectedTable,
        };
        if (userData) {
          payload.userId = userData.id;
        }
        const res =
          editExistingBooking && initialValues ?
            await editBooking(initialValues._id, payload)
            :
            await submitNewBooking(payload);
        if (res) {
          notification.success({
            message:
              editExistingBooking ?
                content.pages.bookings.validation.editSuccess
                :
                content.pages.bookings.validation.success,
          });
          refreshBookings();
        }
      } else {
        checkAvailableDuration(selectedTable);
      }
    } else {
      notification.error({
        message: content.pages.bookings.validation.selectTable,
      });
    }

  };
  return (
    <Form
      onFinish={submitBooking}
      initialValues={initialValues ?
        {
          ...initialValues,
          date: timeFormatter.parseTimestampToMoment(initialValues.date),
        } : {
          hours: [hours.defaultMin, hours.defaultMax],
          date: pickedDate,
          people: amountWidget.defaultValue,
          starters: [],
        }}
    >
      <BookingPreview
        onBookingHoursChange={changeBookingHours}
        onDatePicking={pickDate}
        onTableSelection={selectTable}
        tables={defineTablesStatus()}
        pickedDate={pickedDate}
        readOnly={readOnly}
      />
      {readOnly ? null :
        <Form.Item>
          <Button htmlType="submit">{bookingForm.confirm}</Button>
        </Form.Item>
      }
    </Form>
  );
}

export default Bookings;
