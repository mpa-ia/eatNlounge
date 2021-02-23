/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import BookingForm from '../../components/BookingForm';
import Head from 'next/head';
import { content, settings } from '../../settings';
import { bookings } from '../../settings/bookings';
import * as bookingTypes from './interfaces';
import { notification } from 'antd';
import moment from 'moment';
import DateOperations from '../../helpers/dateOperations';

const { hours } = settings;

function Bookings(): React.ReactElement {
  const [bookingSchedule, setBookingSchedule] = useState<Bookings.Schedule>();
  const [startHour, setStartHour] = useState<number>(hours.defaultMin);
  const [duration, setDuration] = useState<number>(hours.defaultMax - hours.defaultMin);
  const [pickedDate, setDate] = useState(moment().add(1, 'days'));
  const [selectedTable, setselectedTable] = useState<string | null>(null);
  useEffect(() => {
    // Todo: mocked, API call in the future
    let bookingSchedule = {};
    bookings.customers.forEach(booking => {
      const bookingPart = createBookingSchedule(bookingSchedule, booking.tableId, booking.date, booking.hour, booking.duration);
      bookingSchedule = bookingPart;
    });
    setBookingSchedule(bookingSchedule);

  }, []);
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
    const date = DateOperations.parseDate(pickedDate);
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
    const date = DateOperations.parseDate(pickedDate);
    if (bookingSchedule) {
      for (let hourBlock = startHour; hourBlock < startHour + duration; hourBlock += 0.5) {
        if (
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
  const submitBooking = (value: Bookings.BookingFormFields): void => {
    if (selectedTable) {
      const isTableFree = checkIfTableIsFree(selectedTable);
      if (!isTableFree) {
        checkAvailableDuration(selectedTable);
      }
      // Todo: API post request in the future

    } else {
      notification.error({
        message: content.pages.bookings.validation.selectTable,
      });
    }
    console.log(value);
  };
  return (
    <>
      <Head>
        <title>{content.general.title} | {content.pages.bookings.title}</title>
      </Head>
      <h2>{content.pages.bookings.header}</h2>
      <BookingForm
        onSubmit={submitBooking}
        onBookingHoursChange={changeBookingHours}
        onDatePicking={pickDate}
        onTableSelection={selectTable}
        tables={defineTablesStatus()}
        pickedDate={pickedDate}
      />
    </>
  );
}

export default Bookings;
