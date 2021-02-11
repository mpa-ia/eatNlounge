export const settings = {
  hours: {
    open: 12,
    close: 24,
    step: 0.5,
    latest: 22,
    defaultMin: 18,
    defaultMax: 20,
  },
  tables: [
    { id: 'table_1'},
    { id: 'table_2'},
    { id: 'table_3'},
    { id: 'table_4'},
  ],
  starters: [
    { value: 'water', title: 'Lemon Water' },
    { value: 'bread', title: 'Bread' },
  ],
  amountWidget: {
    defaultValue: 2,
    defaultMin: 1,
    defaultMax: 8,
  },
  datePicker: {
    maxDaysInFuture: 14,
  },
};

export const content = {
  general: {
    title: 'Eat n\'Lounge',
  },
  pages: {
    bookings: {
      header: 'Book a Table',
      title: 'Book a Table',
      bookingForm: {
        confirm: 'Confirm',
        enterPhone: 'Phone No.',
        enterSurname: 'Name and Surname',
        enterPeople: 'People',
        pickHours: 'Pick hours',
        pickDate: 'pick date',
        selectStarters: 'Select starters',
      },
      validation: {
        selectTable: 'Choose table to finish booking process.',
      },
    },
  },
};