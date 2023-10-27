import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const createUrl = (pathname, params) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
};

//generates data for the tiny line chart
export function generateRandomData(pagesCount = 7) {
  const minValue = 1000;
  const maxValue = 10000;

  const data = [];

  for (let i = 0; i < pagesCount; i++) {
    const randomPV =
      Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;

    data.push({
      name: `Page ${String.fromCharCode(65 + i)}`,
      pv: randomPV,
    });
  }

  return data;
}
