export const isNormalInteger = (str) => {
  const n = ~~Number(str); // eslint-disable-line no-bitwise
  return String(n) === str && n >= 0;
};
export const formatNumber = (number) => {
  // returns an appropriatly formatted number with decimal places and thousand separators
  if (number === 'undefined') {
    return 'undefined';
  }

  const numstr = number.toString();
  let result = '';

  let decimalIndex = numstr.indexOf('.');
  if (decimalIndex === -1) {
    decimalIndex = numstr.length;
  }
  if (decimalIndex < 4) {
    return numstr.toLocaleString();
  }

  let index = decimalIndex;
  while (index > 0) {
    if (index - 4 < 0) {
      result = `,${numstr.substr(0, index)}${result}`;
      index -= 3;
    } else {
      result = `,${numstr.substr(index - 3, 3)}${result}`;
      index -= 3;
    }
  }

  result = result.substr(1, result.length - 1);

  if (decimalIndex < numstr.length) {
    result += '.';
    result += numstr.substr(decimalIndex + 1, numstr.length - decimalIndex + 1); // eslint-disable-line no-mixed-operators
  }

  return result.toLocaleString();
};
// eslint-disable-next-line no-underscore-dangle
export const _bytesToSize = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (!bytes) {
    return '0 Byte';
  }

  const i = parseInt(Math.log(bytes) / Math.log(1024), 10);

  const finalSize = `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`; // eslint-disable-line no-restricted-properties

  return finalSize;
};

const padZero = (x) => (x < 0 || x > 9 ? '' : '0') + x;
export const bytesToSize = (bytes, precision) => {
  if (!precision) {
    return _bytesToSize(bytes);
  }

  const kilobyte = 1024;
  const megabyte = kilobyte * 1024;
  const gigabyte = megabyte * 1024;
  const terabyte = gigabyte * 1024;

  if (bytes >= 0 && bytes < kilobyte) {
    return `${bytes} B`;
  } else if (bytes >= kilobyte && bytes < megabyte) {
    return `${formatNumber((bytes / kilobyte).toFixed(precision))} KB`;
  } else if (bytes >= megabyte && bytes < gigabyte) {
    return `${formatNumber((bytes / megabyte).toFixed(precision))} MB`;
  } else if (bytes >= gigabyte && bytes < terabyte) {
    return `${formatNumber((bytes / gigabyte).toFixed(precision))} GB`;
  } else if (bytes >= terabyte) {
    return `${formatNumber((bytes / terabyte).toFixed(precision))} TB`;
  }
  return `${formatNumber(bytes)} B`;
};

const formatTime = (value) => {
  // returns timesting d.hh:mm:ss
  const days = padZero(Math.floor(Math.abs(value) / 1000 / 60 / 60 / 24));
  const hours = padZero(Math.floor((Math.abs(value) / 1000 / 60 / 60) % 24));
  const minutes = padZero(Math.floor((Math.abs(value) / 1000 / 60) % 60));
  const seconds = padZero(Math.floor((Math.abs(value) / 1000) % 60));
  const timeString =
    days === '00'
      ? `${hours}:${minutes}:${seconds}`
      : `${days}d.${hours}:${minutes}:${seconds}`;
  return timeString;
};
const formatValues = (valueType, value) => {
  // returns an appropriately formatted value based on the data type
  let newValue;
  if (valueType === 'Numeric') {
    newValue = formatNumber(Math.abs(value));
  } else if (valueType === 'Bytes') {
    newValue = bytesToSize(value);
  } else if (valueType === 'Temporal') {
    newValue = formatTime(value);
  } else {
    newValue = value;
  }
  return newValue;
};
export default formatValues;
