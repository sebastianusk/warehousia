import moment from 'moment';

export default function renderDate(date: Date): React.ReactNode {
  return moment(date).local().format('h:mm:ss DD/MM/YY');
}
