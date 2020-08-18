/* eslint-disable */
import moment from 'moment';

// export const formatUnixToDate = unit => moment.unix(unit).format();

export const upperFirstChar = text => {
  return text.replace(/\w\S*/g, txt => {
    return txt.charAt(0).toUpperCase() + txt.substr(1);
  });
};
export const lowerFirstChar = text => {
  return text.charAt(0).toLowerCase() + text.substr(1);
};
export const replaceAll = (text, search, replacement) => {
  return text.replace(new RegExp(search, 'g'), replacement);
};

export const makeActionName = text => {
  return lowerFirstChar(
    replaceAll(
      upperFirstChar(replaceAll(text, '_', ' ').toLowerCase()),
      ' ',
      ''
    )
  );
};

export const formatDateTime = text => {
  return moment(text).format('DD/MM/YYYY, hh:mma');
};

export const formatDate = text => {
  return moment(text).format('DD/MM/YYYY');
};

export const formatTime = text => {
  return moment(text).format('hh:mma');
};

export const formatDuration = checkins => {
  const startTime = moment(checkins.startTime);
  const endTime = checkins.endTime ? moment(checkins.endTime) : moment();
  const duration = endTime.diff(startTime, 'm');
  const hours = Math.floor(duration / 60);
  return `${hours}h${duration % 60}m`;
};

export const encodeJsonToURI = params => {
  return Object.keys(params)
    .map(key => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
    })
    .join('&');
};

export const stringToSlug = e => {
  let str = e;
  str = unidecode(str).toLowerCase();
  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
};

export const formatRangeTime = values => {
  if (!values || values.length === 0) {
    return 'text.allDay';
  }
  const startTime = moment(values[0]);
  const endTime = moment(values[1]);
  // if (startTime && startTime.diff(endTime, 'd') === 0) {
  //   return startTime.diff(moment(), 'd') === 0 ? 'text.today' : startTime.format('DD/MM');
  // }
  if (values[0]) {
    return `${startTime.format('DD/MM, hh:mmA')} - ${endTime.format('DD/MM, hh:mmA')}`;
  }
  return '';
};

export const formatMoney = (number = 0, n, x) => {
  const re = `\\d(?=(\\d{${x || 3}})+${n > 0 ? '\\.' : '$'})`;
  return Number(number)
    .toFixed(Math.max(0, n))
    .replace(new RegExp(re, 'g'), '$&,');
};

export const formatCheckinTime = (checkin, isComplete) => {
  return `${moment(checkin.startTime).format('hh:mmA')} - ${
    isComplete ? moment(checkin.endTime).format('hh:mmA') : 'now'
  }`;
};

export const formatDisCount = (unit, value) => {
  if (!unit) {
    return 'none';
  }
  return formatMoney(value) + DISCOUNT_UNIT.find(data => data.id === unit).text;
};

export const getAge = text => {
  return text ? moment().diff(text, 'years', false) : '';
};

export const formatDayTime = text => {
  return text ? moment(text).format('DD/MM/YYYY') : '';
};

export const renderMessage = message => {
  return message
};

export const dateTimeUnix = () => {
  return moment().unix()
}

export const mongoObjectId =  () => {
  var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
  return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
      return (Math.random() * 16 | 0).toString(16);
  }).toLowerCase();
};