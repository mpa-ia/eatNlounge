/* eslint-disable no-mixed-spaces-and-tabs */
import moment, {Moment} from 'moment';

type ParseTimestampToDate = (date: Moment) => string;
type ParseHour = (date: number) => string;
type ParseTimestampToMoment = (date: number) => Moment;
type ParseUnixToReadableDate = (date: number) => string;

class TimeFormatter {
	public parseMomentToReadableDate: ParseTimestampToDate = date => date.format('YYYY/MM/DD')
	public parseHour: ParseHour = hour => {
	 if (hour % 1 === 0) return `${hour}:00`;
	 else {
	    const [naturalNumber] = hour.toString().split('.');
	    return `${naturalNumber}:30`;
	  }
	};
	public parseTimestampToMoment: ParseTimestampToMoment = timestamp => moment.unix(timestamp);
	public parseUnixToReadableDate:ParseUnixToReadableDate = timestamp =>
	  this.parseMomentToReadableDate(this.parseTimestampToMoment(timestamp));
}

export default new TimeFormatter();