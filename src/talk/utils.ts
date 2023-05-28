import { DateTime } from 'luxon';

export const isDateNowOrLess = (date: string): boolean => {
  const formattedDate = DateTime.fromISO(date);
  const currentDate = DateTime.now();
  return formattedDate.startOf('day') < currentDate.startOf('day');
};
