// converts date from UTC 0, to UTC +3 (Lithuania timezone)
export const ChangeDateFormat = (appointmentDate) => {
  const date = new Date(`${appointmentDate}`);
  const fixedDate = date.toLocaleString("lt-LT");
  return fixedDate;
};

// Extract date from date string (2023-06-10 00:00:00) -> 2023-06-10
export const ExtractDate = (dateString) => {
  const indexOfSpace = dateString.indexOf(" ");
  const dateSubString = dateString.slice(0, indexOfSpace);
  return dateSubString;
};

// Removes :00 (seconds) from time string 14:00:00 => 14:00;
export const RemoveSeconds = (timeString) => {
  const newString = timeString.slice(0, timeString.length - 3);
  return newString;
};
