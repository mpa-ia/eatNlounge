import DateOperations from '../helpers/timeFormatter';
import moment from 'moment';

const tomorrow = DateOperations.parseMomentToReadableDate(moment().add(1, 'days'));
export const bookings = {
  event:[
    {
      'id':1,
      'date':'2019-01-01',
      'hour':'12:30',
      'table':1,
      'repeat':false,
      'duration':4,
      'ppl':3,
      'starters':[
      ],
    },
    {
      'id':2,
      'date':'2019-01-01',
      'hour':'16:00',
      'table':3,
      'repeat':'daily',
      'duration':2,
      'ppl':3,
      'starters':[
        'bread',
        'lemonWater',
      ],
    },
    {
      'id':3,
      'date':'2019-01-01',
      'hour':'12:00',
      'table':3,
      'repeat':'daily',
      'duration':2,
      'ppl':3,
      'starters':[
        'bread',
        'lemonWater',
      ],
    },
    {
      'id':4,
      'date':'2019-01-01',
      'hour':'13:00',
      'table':2,
      'repeat':'daily',
      'duration':4,
      'ppl':3,
      'starters':[
      ],
    },
    {
      'id':5,
      'date':'2019-01-01',
      'hour':'18:00',
      'table':2,
      'repeat':'daily',
      'duration':2,
      'ppl':3,
      'starters':[
        'lemonWater',
      ],
    },
  ],
  customers: [
    {
      bookingId: 1,
      date: tomorrow,
      hour: 16,
      tableId: 'table_3',
      repeat: false,
      duration: 2,
      people:3,
      starters:[
        'bread',
        'lemonWater',
      ],
      name: 'Jan Kowalski',
      phone: '521451621',
    },
    {
      bookingId: 2,
      date: tomorrow,
      hour: 18,
      tableId: 'table_2',
      repeat: false,
      duration: 2,
      people:3,
      starters:[
        'bread',
        'lemonWater',
      ],
    },
  ],
};