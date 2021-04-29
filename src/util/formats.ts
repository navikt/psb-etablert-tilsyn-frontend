import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Period } from '@navikt/period-utils';

dayjs.extend(utc);

export const prettifyDate = (date: string) => {
    return dayjs(date).utc(true).format('DD.MM.YYYY');
};

export const prettifyPeriod = ({ fom, tom }: Period) => `${prettifyDate(fom)} - ${prettifyDate(tom)}`;
