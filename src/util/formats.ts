import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

// eslint-disable-next-line import/prefer-default-export
export const prettifyDate = (date: string): string => dayjs(date).utc(true).format('DD.MM.YYYY');
