import { format, getTime, formatDistanceToNow, parse, isValid } from 'date-fns';

// ----------------------------------------------------------------------

export function fDateHotel(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy';

  if (!date) return '';

  const parsedDate = parse(date, 'dd-MM-yyyy', new Date());

  return isValid(parsedDate) ? format(parsedDate, fm) : '';
}

export function fDate(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fTime(date, newFormat) {
  const fm = newFormat || 'p';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fDateOrder(date, newFormat) {
  const targetFormat = 'dd MMMM yyyy';
  // const wibSuffix = ' WIB';
  const fm = newFormat || targetFormat;
  if (!date) {
    return '';
  }

  try {
    const dateObj = new Date(date);

    if (isNaN(dateObj.getTime())) {
      console.error('fDateTime Error: Invalid date input provided:', date);
      return '';
    }

    let formattedDate = format(dateObj, fm);
    if (!newFormat || newFormat === targetFormat) {
      formattedDate;
    }

    return formattedDate;
  } catch (error) {
    console.error('fDateTime Error formatting date:', error);
    return '';
  }
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}

export function isBetween(inputDate, startDate, endDate) {
  const date = new Date(inputDate);

  const results =
    new Date(date.toDateString()) >= new Date(startDate.toDateString()) &&
    new Date(date.toDateString()) <= new Date(endDate.toDateString());

  return results;
}

export function isAfter(startDate, endDate) {
  const results =
    startDate && endDate
      ? new Date(startDate).getTime() > new Date(endDate).getTime()
      : false;

  return results;
}
