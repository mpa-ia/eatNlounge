import React, { useEffect, useState } from 'react';
import { content } from '../../../settings';
import { Card } from '../../../styles/layout.style';
import { Col, Row } from 'antd';
import { getBookingsByUser } from '../../../services/bookings';
import {useUser} from '../../../context/user';
import { useRouter } from 'next/router';
import BookingListItem from '../../../components/BookingListItem';
import Booking from '../../../components/Booking';

const UserDashboard: React.FunctionComponent = () => {
  const { userData } = useUser();
  const router = useRouter();

  const [userBookings, setBookings] = useState<Bookings.SingleData<number>[]>([]);
  const [previewId, setPreviewId] = useState<string | null>(null);
  useEffect(() => {
    if (!userData) {
      router.replace('/signin');
    } else {
      const getUserBookings = async (): Promise<void> => {
        const response = await getBookingsByUser(userData.id);
        if (response) {
          setBookings(response.data);
        }
      };
      getUserBookings();
    }
  });
  const activateBookingPreview = (id: string): void => {
    setPreviewId(id);
  };
  return (
    <div>
      <Row>
        <Col span={12}>
          <Card type="darkAccent" >
            <h3>{content.pages.user.myBookings}</h3>
            <ul>

              {userBookings.map(booking =>
                <BookingListItem
                  key={booking._id}
                  booking={booking}
                  onCancel={() => { console.log('cancel');}}
                  onEdit={() => { console.log('delete'); }}
                  onPreview={activateBookingPreview}
                />,
              )}
            </ul>
          </Card>
        </Col>
        <Col span={12}>
          <Card type="darkAccent">
            <h3>{content.pages.user.bookingPreview}</h3>
            {previewId ?
              userBookings
                .filter(booking => booking._id = previewId)
                .map(booking =>
                  <Booking
                    key={booking._id}
                    bookings={[booking]}
                    initialValues={booking}
                  />)
              : <span>{content.pages.user.clickToPreview}</span>}
          </Card>
        </Col>
      </Row>

    </div>
  );
};

export default UserDashboard;
