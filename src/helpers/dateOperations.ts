import {Moment} from 'moment';

type ParseDate = (date: Moment) => string;

class DateOperations {
	public parseDate: ParseDate = date => date.format('YYYY/MM/DD')
}

export default new DateOperations();