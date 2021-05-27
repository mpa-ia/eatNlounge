/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { content } from '../../../settings';
import { Card } from '../../../styles/layout.style';
import { Col, Row } from 'antd';
import { getBookingsByUser, getBookingsList, cancelBooking } from '../../../services/bookings';
import BookingListItem from '../../../components/BookingListItem';
import Booking from '../../../components/Booking';
import Link from 'next/link';
import { PlusCircleFilled } from '@ant-design/icons';
import useUser from '../../../helpers/useUser';
import withSession from '../../../middlewares/withSession';
import accessHandler from '../../../helpers/accessHandler';
import moment from 'moment';
import withBookingLogic, { WithBookingLogic } from '../../../hooks/withBookingLogic';

interface Props extends WithBookingLogic {
  bookings: Bookings.SingleData<number>[];
}

export const getServerSideProps = withSession(async function ({ req }) {
  const user = req.session.get('user');
  const redirectProps = accessHandler.handleRedirect(user, 'user');
  if (redirectProps) return redirectProps;
  else {
    const response = await getBookingsByUser(user.id);
    // fixme: temporary change date to get bookings for future
    const future = response.data.map((item, index) => ({ ...item, date: moment().unix() + (86400 * index + 1) }));
    return {
      props: { bookings: response ? /* response.data */ future: [] },
    };
  }
});

const UserDashboard: React.FunctionComponent<Props> = (props) => {
  const { userData } = useUser();
  const [userBookings, setBookings] = useState<Bookings.SingleData<number>[]>(props.bookings);
  const [allBookings, setAllBookings] = useState<Bookings.SingleData<number>[]>([]);
  const [previewData, setPreviewData] = useState<Bookings.SingleData<number> | null>();

  const { previewId, previewReadOnly, editExisting } = props;

  useEffect(() => {
    if (previewId) {
      const filteredData = userBookings.filter(booking => booking._id === previewId)[0];
      setPreviewData(filteredData);
    } else {
      setPreviewData(null);
    }
  }, [previewId]);
  const getUserBookings = async (): Promise<void> => {
    if (userData) {
      const res = await getBookingsByUser(userData.id);
      if (res) {
        setBookings(res.data);
      }
    }
  };
  const editBooking = async (id: string): Promise<void> => {
    const res = await getBookingsList();
    if (res) {
      const bookingsWithoutEdited = res.data.filter(booking => booking._id !== id);
      setAllBookings(bookingsWithoutEdited);
      props.editBooking(id);
    }
  };
  const cancel = async (id: string): Promise<void> => {
    const res = await cancelBooking(id);
    if (res && userData) {
      props.cancelBooking();
      setPreviewData(null);
      getUserBookings();
    }
  };
  const updateBooking = (): void => {
    props.closeEditMode();
    setAllBookings([]);
    getUserBookings();
  };
  return (
    <div>
      <Row justify="space-around">
        <Col span={10}>
          <Card type="darkAccent" >
            <Link href="/bookings">
              <a><PlusCircleFilled /></a>
            </Link>
            <h3>{content.pages.user.myBookings}</h3>
            {userBookings.length ?
              <ul>
                {userBookings.map(booking =>
                  <BookingListItem
                    key={booking._id}
                    booking={booking}
                    onCancel={cancel}
                    onEdit={editBooking}
                    onPreview={props.activateBookingPreview}
                  />,
                )}
              </ul>
              : <span>{content.pages.user.noBookings}</span>}
          </Card>
        </Col>
        <Col span={10}>
          <Card type="darkAccent">
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

export default withBookingLogic(UserDashboard);
