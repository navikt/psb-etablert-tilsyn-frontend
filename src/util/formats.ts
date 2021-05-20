import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const prettifyDate = (date: string) => {
    return dayjs(date).utc(true).format('DD.MM.YYYY');
};
