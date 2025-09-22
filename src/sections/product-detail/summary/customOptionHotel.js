export const getDynamicCustomOptions = (data, time, timeForDateType) => {
  if (!data || !data.options) return [];

  return data.options.map((option) => {
    if (Array.isArray(option.values) && option.values.length > 0) {
      const sortedValues = [...option.values].sort(
        (a, b) => parseFloat(a.price) - parseFloat(b.price)
      );
      return {
        option_id: option.option_id,
        option_value: sortedValues[0]?.option_type_id,
      };
    }

    return {
      option_id: option.option_id,
      option_value:
        option.title === 'Booking Dari'
          ? time.format('YYYY-MM-DD HH:mm:ss')
          : option.title === 'Booking Sampai'
          ? time.add(1, 'days').format('YYYY-MM-DD HH:mm:ss')
          : option.title === 'Dewasa'
          ? 1
          : option.title === 'Anak Anak'
          ? 0
          : option.type === 'date'
          ? timeForDateType.format('YYYY-MM-DD HH:mm:ss')
          : option.type === 'field'
          ? '-'
          : 0,
    };
  });
};

export const getListCustomOptions = (data) => {
  if (!data || !data.options) return [];

  return data.options.map((option) => ({
    option_id: option.option_id,
    option_title: option.title,
  }));
};
