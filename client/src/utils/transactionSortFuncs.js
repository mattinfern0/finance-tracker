import moment from 'moment';

// Assumes first & second are both moment() objects
export function byDate(first, second) {
  return moment.utc(first.date.timeStamp).diff(moment.utc(second.date.timeStamp));
}

export function byAmount(first, second) {
  return first.amount - second.amount;
}