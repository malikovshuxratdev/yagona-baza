import moment from 'moment';
import 'moment/locale/uz-latn';

moment.locale('uz-latn');

export const yearFormat = (date: string) => {
    if (date) {
        return moment(date).format('YYYY');
    }
    return '';
};

export const fullDateFormat = (date: string) => {
    if (date) {
        return moment(date).format('D MMMM YYYY');
    }
    return '';
};

export const fullDateTimeFormat = (date: string) => {
    if (date) {
        return moment(date).format('D-MMMM, YYYY HH:mm');
    }
    return '';
};

export const timeAgo = (date: string): string => {
    if (!date) return '';

    const now = moment();
    const past = moment(date);

    const diffInSeconds = now.diff(past, 'second');
    const diffInMinutes = now.diff(past, 'minute');
    const diffInHours = now.diff(past, 'hour');
    const diffInDays = now.diff(past, 'day');
    const diffInWeeks = now.diff(past, 'week');
    const diffInMonths = now.diff(past, 'month');
    const diffInYears = now.diff(past, 'year');

    if (diffInSeconds < 60) {
        return 'hozir';
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes}min`;
    } else if (diffInHours < 24) {
        return `${diffInHours}h`;
    } else if (diffInDays < 7) {
        return `${diffInDays}d`;
    } else if (diffInWeeks < 4) {
        return `${diffInWeeks}w`;
    } else if (diffInMonths < 12) {
        return `${diffInMonths}mo`;
    } else {
        return `${diffInYears}y`;
    }
};
