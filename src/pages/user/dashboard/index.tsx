/* eslint-disable react-hooks/exhaustive-deps */
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
  const [previewData, setPreviewData] = useState<Bookings.SingleData<number> | null>();
  const [ previewReadOnly, toggleReadOnly] = useState(false);

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
  }, []);
  useEffect(() => {
    if (previewId) {
      const filteredData = userBookings.filter(booking => booking._id === previewId)[0];
      setPreviewData(filteredData);
    } else {
      setPreviewData(null);
    }
  }, [previewId]);
  const activateBookingPreview = (id: string): void => {
    toggleReadOnly(true);
    setPreviewId(id);
  };
  // const editBooking = (id: string) => {
  //   toggleReadOnly(false);
  //   setPreviewId(id);
  // };
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
            {previewId && previewData ?
              <Booking
                key={previewData._id}
                bookings={[previewData]}
                initialValues={previewData}
                readOnly={previewReadOnly}
              />
              : <span>{content.pages.user.clickToPreview}</span>}
          </Card>
        </Col>
      </Row>

    </div>
  );
};

export default UserDashboard;
