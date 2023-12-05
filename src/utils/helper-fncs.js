// converts date from UTC 0, to UTC +3 (Lithuania timezone)
export const ChangeDateFormat = (dateToChange) => {
  const date = new Date(`${dateToChange}`);
  const fixedDate = date.toLocaleString("lt-LT");
  return fixedDate;
};

// Extract date from date string (2023-06-10 00:00:00) -> 2023-06-10
export const ExtractDate = (dateString) => {
  const indexOfSpace = dateString.indexOf(" ");
  const dateSubString = dateString.slice(0, indexOfSpace);
  return dateSubString;
};

// Fixes date: 'converts to Lithuanian date format and returns just date without time'
export const FixDate = (date) => {
  return ExtractDate(ChangeDateFormat(date));
};

// Removes :00 (seconds) from time string 14:00:00 => 14:00;
export const RemoveSeconds = (timeString) => {
  const newString = timeString.slice(0, timeString.length - 3);
  return newString;
};

export const createNotificationObject = (message, type) => {
  return {
    message: message,
    type: type,
    id: new Date().toISOString(),
  };
};

export const checkIfAtLeastOneInputHasNoValue = (
  inputsArray,
  values = null
) => {
  if (!values) {
    // Remove last element (button)
    inputsArray.pop();
    return inputsArray.some((input) => input?.value.trim() === "");
  } else {
    return values.some((value) => value.trim() === "");
  }
};
