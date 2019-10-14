import moment from 'moment';

// Assumes first & second are both moment() objects
export function byOldestDate(first, second) {
  return first.date - second.date;
}

export function byNewestDate(first, second) {
  return second.date - first.date;
}

export function byCheapestAmount(first, second) {
  return first.amount - second.amount;
}

export function byMostExpensiveAmount(first, second) {
  return 0 - byCheapestAmount(first, second);
}

const DEFAULT = byNewestDate;
export {DEFAULT}