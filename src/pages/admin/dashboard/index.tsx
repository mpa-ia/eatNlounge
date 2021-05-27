/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { content } from '../../../settings';
import { Card } from '../../../styles/layout.style';
import { Col, Row } from 'antd';
import withSession from '../../../middlewares/withSession';
import accessHandler from '../../../helpers/accessHandler';
import moment from 'moment';
import withBookingLogic, { WithBookingLogic } from '../../../hooks/withBookingLogic';

import {
  // editBooking,
  getBookingsList,
  // cancelBooking
} from '../../../services/bookings';
import Booking from '../../../components/Booking';
import BookingsTable from '../../../components/BookingsTable';
// import useUser from '../../../helpers/useUser';

interface Props extends WithBookingLogic {
  bookings: Bookings.SingleData<number>[];
}
export const getServerSideProps = withSession(async function ({ req }) {
  const user = req.session.get('user');
  const redirectProps = accessHandler.handleRedirect(user, 'admin');
  if (redirectProps) return redirectProps;
  else {
    const response = await getBookingsList();
    const future = response.data.map((item, index) => ({ ...item, date: moment().unix() + (86400 * index + 1) }));
    return {
      props: { bookings: response ? /* response.data */ future: [] },
    };
  }
});

const AdminDashboard: React.FunctionComponent<Props> = (props) => {
  // const { userData } = useUser();
  const [allBookings, setAllBookings] = useState<Bookings.SingleData<number>[]>(props.bookings);
  const [previewData, setPreviewData] = useState<Bookings.SingleData<number> | null>();

  const { previewId, previewReadOnly, editExisting } = props;
  useEffect(() => {
    if (previewId) {
      const filteredData = allBookings.filter(booking => booking._id === previewId)[0];
      setPreviewData(filteredData);
    } else {
      setPreviewData(null);
    }
  }, [previewId]);
  const getAllBookings = async (): Promise<void> => {
    // if (userData) {
    const res = await getBookingsList();
    if (res) {
      setAllBookings(res.data);
    }
  };
  const editBooking = (id: string): void => {
    props.editBooking(id);
    const bookingsWithoutEdited = allBookings.filter(booking => booking._id !== id);
    setAllBookings(bookingsWithoutEdited);
  };
  // const cancel = async (id: string): Promise<void> => {
  //   const res = await cancelBooking(id);
  //   if (res && userData) {
  //     setPreviewId(null);
  //     setPreviewData(null);
  //     getAllBookings();
  //   }
  // };
  const updateBooking = (): void => {
    props.closeEditMode();
    getAllBookings();
  };
  return (
    <div>
      <Row>
        <Col span={18}>
          <BookingsTable
            bookings={allBookings} 
            onRow={(record) => ({
              onClick: props.activateBookingPreview.bind(null, record._id),
              onDoubleClick: editBooking.bind(null, record._id),
            })}
          />
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
                onEditModeClose={updateBooking}
                onEditCancel={props.closeEditMode}
              />
              : <span>{content.pages.user.clickToPreview}</span>}
          </Card>
        </Col>
      </Row>

    </div>
  );
};

export default withBookingLogic(AdminDashboard);
