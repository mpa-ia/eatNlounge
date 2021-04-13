/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { content } from '../../../settings';
import { Card } from '../../../styles/layout.style';
import { Col, Row } from 'antd';
import { getBookingsByUser, getBookingsList, cancelBooking } from '../../../services/bookings';
import {useUser} from '../../../context/user';
import { useRouter } from 'next/router';
import BookingListItem from '../../../components/BookingListItem';
import Booking from '../../../components/Booking';


const UserDashboard: React.FunctionComponent = () => {
  const { userData } = useUser();
  const router = useRouter();

  const [userBookings, setBookings] = useState<Bookings.SingleData<number>[]>([]);
  const [allBookings, setAllBookings] = useState<Bookings.SingleData<number>[]>([]);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<Bookings.SingleData<number> | null>();
  const [ previewReadOnly, toggleReadOnly] = useState(false);
  const [editExisting, toggleEditExisting] = useState(false);

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
  const editBooking = async (id: string): Promise<void> => {
    setPreviewId(id);
    toggleEditExisting(true);
    const res = await getBookingsList();
    if (res) {
      const bookingsWithoutEdited = res.data.filter(booking => booking._id !== id);
      setAllBookings(bookingsWithoutEdited);
      toggleReadOnly(false);
    }
  };
  const cancel = async (id: string): Promise<void> => {
    const res = await cancelBooking(id);
    if (res && userData) {
      setPreviewId(null);
      setPreviewData(null);
      const res = await getBookingsByUser(userData.id);
      if (res) {
        setBookings(res.data);
      }
    }


  };
  return (
    <div>
      <Row justify="space-around">
        <Col span={10}>
          <Card type="darkAccent" >
            <h3>{content.pages.user.myBookings}</h3>
            <ul>

              {userBookings.map(booking =>
                <BookingListItem
                  key={booking._id}
                  booking={booking}
                  onCancel={cancel}
                  onEdit={editBooking}
                  onPreview={activateBookingPreview}
                />,
              )}
            </ul>
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
              />
              : <span>{content.pages.user.clickToPreview}</span>}
          </Card>
        </Col>
      </Row>

    </div>
  );
};

export default UserDashboard;
