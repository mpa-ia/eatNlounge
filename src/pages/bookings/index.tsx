import React from 'react';
import Head from 'next/head';
import { content } from '../../settings';
import * as bookingTypes from './interfaces';
import { GetServerSideProps } from 'next';
import { getBookingsList } from '../../services/bookings';
import { Card } from '../../styles/layout.style';
import { Col, Row } from 'antd';
import dynamic from 'next/dynamic';
import useUser from '../../helpers/useUser';

const Booking = dynamic(() => import('../../components/Booking'), { ssr: false });

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await getBookingsList();
  return {
    props: {
      bookings: response ? response.data : [],
    },
  };
};
  
function Bookings({ bookings }: bookingTypes.Props): React.ReactElement {
  useUser(false);
  return (
    <>
      <Head>
        <title>{content.general.title} | {content.pages.bookings.title}</title>
      </Head>
      <div>
        <Row>
          <Col span={12} offset={6}>
            <Card type="mainBrand" >
              <h3>{content.pages.bookings.header}</h3>
              <Booking bookings={bookings} />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Bookings;
