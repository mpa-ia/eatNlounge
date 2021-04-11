import React from 'react';
import Head from 'next/head';
import { content } from '../../settings';
import * as bookingTypes from './interfaces';
import { GetStaticProps } from 'next';
import { getBookingsList  } from '../../services/bookings';
import dynamic from 'next/dynamic';

const Booking = dynamic(() => import('../../components/Booking'), { ssr: false });

export const getStaticProps: GetStaticProps = async () => {
  const response = await getBookingsList();
  return {
    props: {
      bookings: response ? response.data : [],
    },
  };
};
  
function Bookings({ bookings }: bookingTypes.Props): React.ReactElement {
  return (
    <>
      <Head>
        <title>{content.general.title} | {content.pages.bookings.title}</title>
      </Head>
      <h2>{content.pages.bookings.header}</h2>
      <Booking bookings={bookings}/>
    </>
  );
}

export default Bookings;
