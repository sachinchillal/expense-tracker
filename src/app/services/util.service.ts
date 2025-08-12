const oneDay = 60 * 60 * 24;
const oneMonth = oneDay * 30.44;
const oneYear = oneDay * 365.25;

export function getRemainingYMDH(start: number, end: number) {
  const t = +new Date();
  if (end <= t) {
    return 'NA';
  }
  const startDate = new Date(end);
  const endDate = new Date(t);
  const differenceInSeconds = (startDate.getTime() - endDate.getTime()) / 1000;
  const numberOfYears = Math.floor(differenceInSeconds / oneYear);
  const numberOfMonths = Math.floor((differenceInSeconds - (numberOfYears * oneYear)) / oneMonth);
  const numberOfDays = Math.floor((differenceInSeconds - (numberOfYears * oneYear) - (numberOfMonths * oneMonth)) / oneDay);
  const numberOfHours = Math.floor((differenceInSeconds - (numberOfYears * oneYear) - (numberOfMonths * oneMonth) - (numberOfDays * oneDay)) / (60 * 60));
  return `${numberOfYears}y ${numberOfMonths}m ${numberOfDays}d ${numberOfHours}h`;
}
export function getPastYMDH(start: number) {
  const t = +new Date();
  if (start > t) {
    return 'NA';
  }
  const startDate = new Date(start);
  const endDate = new Date(t);
  const differenceInSeconds = (endDate.getTime() - startDate.getTime()) / 1000;
  const numberOfYears = Math.floor(differenceInSeconds / oneYear);
  const numberOfMonths = Math.floor((differenceInSeconds - (numberOfYears * oneYear)) / oneMonth);
  const numberOfDays = Math.floor((differenceInSeconds - (numberOfYears * oneYear) - (numberOfMonths * oneMonth)) / oneDay);
  const numberOfHours = Math.floor((differenceInSeconds - (numberOfYears * oneYear) - (numberOfMonths * oneMonth) - (numberOfDays * oneDay)) / (60 * 60));
  return `${numberOfYears}y ${numberOfMonths}m ${numberOfDays}d ${numberOfHours}h`;
}

export function getRemainingDays(start: number, end: number) {
  const t = +new Date();
  if (!end) {
    // return "+ " + ((t - start) / (24 * 60 * 60 * 1000)).toFixed();
    return 0;
  }
  if (end <= t) {
    return 0;
  }
  return parseInt(((end - t) / (24 * 60 * 60 * 1000)).toFixed());
}

export function getPastDays(start: number) {
  const t = +new Date();
  if (!start) {
    return 0;
  }
  if (start > t) {
    return 0;
  }
  return parseInt(((t - start) / (24 * 60 * 60 * 1000)) + "");
}