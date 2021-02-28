import mongoose, { Document } from 'mongoose';

	interface DBBooking extends Bookings.BookingFormFields, Document {
		date: string;
	}

const bookingSchema = new mongoose.Schema({
  surname: { type: String, required: true },
  date: { type: String, required: true },
  table: { type: String, required: true },
  starters: { type: Array },
  hours: { type: Array, required: true },
  people: { type: Number, required: true },
  phone: { type: String, required: true },
},
{ versionKey: false },
);

export default mongoose.models.Booking || mongoose.model<DBBooking>('Booking', bookingSchema);