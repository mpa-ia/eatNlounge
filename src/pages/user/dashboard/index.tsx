import React, { useEffect, useState } from 'react';
import { content } from '../../../settings';
import { Card } from '../../../styles/layout.style';
import { Col, Row } from 'antd';
import { getBookingsByUser } from '../../../services/bookings';
import {useUser} from '../../../context/user';

const UserDashboard: React.FunctionComponent = () => {
  const { userData } = useUser();
  const [userBookings, setBookings] = useState<Bookings.SingleData<string>[]>([]);
  useEffect(() => {
    const getUserBookings = async (): Promise<void> => {
      if (userData) {
        const response = await getBookingsByUser(userData.id);
        if (response) {
          setBookings(response.data);
        }
      }
    };
    getUserBookings();
  }, [userData]);
  return (
    <div>
      <Row>
        <Col span={12}>
          <Card type="darkAccent" >
            <h3>{content.pages.user.myBookings}</h3>
            {userBookings.map(booking => 
              <span key={booking._id}>{booking.date}</span>,
            )}
          </Card>
        </Col>
      </Row>

    </div>
  );
};

export default UserDashboard;
