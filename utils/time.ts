// lets assume timezone is EST, since no offset was provided

// converts a unix timestamp in ms to a date string, with month truncated
export function formatTimestampToDate(timestamp: number): string {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  };
  return date.toLocaleDateString('en-US', options);
}

// converts two unix timestamps in ms to a time string range
export function formatTimestampRange(start: number, end: number): string {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  };

  const timeFormatter = new Intl.DateTimeFormat('en-US', options);

  const formattedStartTime = timeFormatter.format(startDate);
  const formattedEndTime = timeFormatter.format(endDate);

  return `${formattedStartTime} - ${formattedEndTime}`;
}
