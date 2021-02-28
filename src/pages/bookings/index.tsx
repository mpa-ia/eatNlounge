/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { content, settings } from '../../settings';
import * as bookingTypes from './interfaces';
import { notification } from 'antd';
import moment from 'moment';
import DateOperations from '../../helpers/dateOperations';
import { GetStaticProps } from 'next';
import { getBookingsList, submitNewBooking } from '../../services/bookings';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Nav from '../../components/Nav';
const BookingForm = dynamic(() => import('../../components/BookingForm'), { ssr: false });

const { hours } = settings;

export const getStaticProps: GetStaticProps = async () => {
  const bookings = await getBookingsList();
  return {
    props: {
      bookings,
    },
  };
};
  
function Bookings({ bookings }: bookingTypes.Props): React.ReactElement {
  const router = useRouter();
  const [bookingSchedule, setBookingSchedule] = useState<Bookings.Schedule>();
  const [startHour, setStartHour] = useState<number>(hours.defaultMin);
  const [duration, setDuration] = useState<number>(hours.defaultMax - hours.defaultMin);
  const [pickedDate, setDate] = useState(moment().add(1, 'days'));
  const [selectedTable, setselectedTable] = useState<string | null>(null);

  useEffect(() => {
    let bookingSchedule = {};
    bookings.forEach(booking => {
      const [startHour, endHour] = booking.hours;
      const bookingPart = createBookingSchedule(bookingSchedule, booking.table, booking.date, startHour, endHour - startHour);
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
  const submitBooking = async (formFieldsData: Bookings.BookingFormFields): Promise<void> => {
    if (selectedTable) {
      if (checkIfTableIsFree(selectedTable)) {
        const payload = {
          ...formFieldsData,
          date: DateOperations.parseDate(formFieldsData.date),
          table: selectedTable,
        };
        const res = await submitNewBooking(payload);
        if (res) {
          notification.success({
            message: content.pages.bookings.validation.success,
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
    <>
      <Head>
        <title>{content.general.title} | {content.pages.bookings.title}</title>
      </Head>
      <Nav />
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
