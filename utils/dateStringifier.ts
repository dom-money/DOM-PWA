const dateStringifier = (timestamp: number) => {
  // Creating date object
  const inputDate = new Date(timestamp);

  const currentDate = new Date();

  const options: Partial<Intl.DateTimeFormatOptions> = {
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  // If today - display 'Today, hh:mm'
  if (
    inputDate.getDate() === currentDate.getDate() &&
    inputDate.getMonth() === currentDate.getMonth() &&
    inputDate.getFullYear() === currentDate.getFullYear()
  ) {
    delete options.month;
    delete options.day;
    return `Today, ${inputDate.toLocaleString('en-US', options)}`;
  };

  // If yesterday - display 'Today, hh:mm'
  if (
    inputDate.getDate() === currentDate.getDate() - 1 &&
    inputDate.getMonth() === currentDate.getMonth() &&
    inputDate.getFullYear() === currentDate.getFullYear()
  ) {
    delete options.month;
    delete options.day;
    return `Yesterday, ${inputDate.toLocaleString('en-US', options)}`;
  };

  // If not current year - additionally display year
  if (inputDate.getFullYear() !== currentDate.getFullYear()) {
    options.year = 'numeric';
  };

  return inputDate.toLocaleString('en-US', options);
};

export default dateStringifier;
