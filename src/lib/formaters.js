export function formatDate(str) {
  const date = new Date(str);
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${day} ${monthNames[monthIndex]} ${year}`;
}

export function formatTime(str) {
  const date = new Date(str);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Agregamos un 0 delante si es una sola cifra para tener un formato HH:MM
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
}

export function formatCurrency(price, currencyCode = 'BOB') {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay: 'narrowSymbol',
  }).format(parseFloat(price));
}
