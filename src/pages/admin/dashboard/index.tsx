/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { content } from '../../../settings';
import { Card } from '../../../styles/layout.style';
import { Col, Row } from 'antd';
import withSession from '../../../middlewares/withSession';
import accessHandler from '../../../helpers/accessHandler';

import {
  getBookingsList,
  // cancelBooking
} from '../../../services/bookings';
import Booking from '../../../components/Booking';
import BookingsTable from '../../../components/BookingsTable';
// import useUser from '../../../helpers/useUser';

interface Props {
  bookings: Bookings.SingleData<number>[];
}
export const getServerSideProps = withSession(async function ({ req }) {
  const user = req.session.get('user');
  const redirectProps = accessHandler.handleRedirect(user, 'admin');
  if (redirectProps) return redirectProps;
  else {
    const response = await getBookingsList();
    return {
      props: { bookings: response ? response.data: [] },
    };
  }
});

const AdminDashboard: React.FunctionComponent<Props> = (props) => {
  // const { userData } = useUser();
  // const [allBookings, setBookings] = useState<Bookings.SingleData<number>[]>(props.bookings);
  const [allBookings /* setBookings */] = useState<Bookings.SingleData<number>[]>(props.bookings);
  const [previewId /* setPreviewId */] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<Bookings.SingleData<number> | null>();
  const [previewReadOnly /* toggleReadOnly */] = useState(false);
  const [editExisting /* toggleEditExisting */] = useState(false);

  // useEffect(() => {
  // getAllBookings();
  // setBookings(res.data);

  // }, []);
  useEffect(() => {
    if (previewId) {
      const filteredData = allBookings.filter(booking => booking._id === previewId)[0];
      setPreviewData(filteredData);
    } else {
      setPreviewData(null);
    }
  }, [previewId]);
  // const activateBookingPreview = (id: string): void => {
  //   toggleReadOnly(true);
  //   setPreviewId(id);
  // };
  // const getAllBookings = async (): Promise<void> => {
  //   if (userData) {
  //     const res = await getBookingsList();
  //     if (res) {
  //       setBookings(res.data);
  //     }
  //   }
  // };
  // const editBooking = async (id: string): Promise<void> => {
  //   setPreviewId(id);
  //   toggleEditExisting(true);
  //   const res = await getBookingsList();
  //   if (res) {
  //     const bookingsWithoutEdited = res.data.filter(booking => booking._id !== id);
  //     setAllBookings(bookingsWithoutEdited);
  //     toggleReadOnly(false);
  //   }
  // };
  // const cancel = async (id: string): Promise<void> => {
  //   const res = await cancelBooking(id);
  //   if (res && userData) {
  //     setPreviewId(null);
  //     setPreviewData(null);
  //     getAllBookings();
  //   }
  // };
  const handleSuccessfullBookingUpdate = (): void => {
  //   toggleEditExisting(false);
  //   setAllBookings([]);
  //   toggleReadOnly(true);
  //   getAllBookings();
  };
  return (
    <div>
      <Row>
        <Col span={18}>
          <BookingsTable bookings={allBookings}/>
        </Col>
        <Col span={6}>
          <Card type="lightShadow">
            <h3>{content.pages.user.bookingPreview}</h3>
            {previewId && previewData ?
              <Booking
                key={previewData._id}
                bookings={editExisting ? allBookings : [previewData]}
                initialValues={previewData}
                readOnly={previewReadOnly}
                editExistingBooking={editExisting}
                onEditModeClose={handleSuccessfullBookingUpdate }
              />
              : <span>{content.pages.user.clickToPreview}</span>}
          </Card>
        </Col>
      </Row>

    </div>
  );
};

export default AdminDashboard;
