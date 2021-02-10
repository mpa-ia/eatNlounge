/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import BookingForm from '../../components/BookingForm';
import Head from 'next/head';
import { content } from '../../settings';
import { bookings } from '../../settings/bookings';
import * as bookingTypes from './interfaces';

function Bookings(): React.ReactElement {
  const [bookingSchedule, setBookingSchedule] = useState<Bookings.Schedule>();
  useEffect(() => {
    // Todo: mocked, API call in the future
    bookings.customers.forEach(booking => {
      createBookingSchedule(booking.date, booking.hour, booking.duration, booking.tableId);
    });
  }, []);
  const createBookingSchedule: bookingTypes.BookTable = (date, hour, duration, tableId) => {
    const bookings = { ...bookingSchedule };
    if (!bookings[date]) {
      bookings[date] = {};
    }
    for (let hourBlock = hour; hourBlock < hour + duration; hourBlock += 0.5) {
      if (!bookings[date][hourBlock]) {
        bookings[date][hourBlock] = [];
      }
      bookings[date][hourBlock].push(tableId);
    }
    setBookingSchedule(bookings);
  };
  const submitBooking = (value: any) => {
    // Todo: API post request in the future
    console.log(value);
  };
  return (
    <>
      <Head>
        <title>{content.general.title} | {content.pages.bookings.title}</title>
      </Head>
      <h2>{content.pages.bookings.header}</h2>
      <BookingForm schedule={bookingSchedule} onSubmit={submitBooking}/>
    </>
  );
}

export default Bookings;
