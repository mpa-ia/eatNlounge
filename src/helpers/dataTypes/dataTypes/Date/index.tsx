import timeFormatter from '../../../timeFormatter';

interface Props {
  value: number;
}

export default function Hour({ value }: Props): JSX.Element {
  return <span>{timeFormatter.parseUnixToReadableDate(value)}</span>;
}
