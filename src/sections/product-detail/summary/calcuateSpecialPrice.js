import moment from 'moment';
const calculateSpecialPrice = (special, dateFrom, dateTo) => {
  const time = moment();
  if (special) {
    if (
      dateFrom &&
      dateTo &&
      time.isBetween(
        moment(dateFrom.value).startOf('day'),
        moment(dateTo.value).endOf('day')
      )
    ) {
      return parseInt(special.value);
    } else if (
      dateFrom &&
      !dateTo &&
      time.isSameOrAfter(moment(dateFrom.value).startOf('day'))
    ) {
      return parseInt(special.value);
    } else if (
      dateTo &&
      !dateFrom &&
      time.isSameOrBefore(moment(dateTo.value).endOf('day'))
    ) {
      return parseInt(special.value);
    }
  }
  return 0;
};

export default calculateSpecialPrice;
