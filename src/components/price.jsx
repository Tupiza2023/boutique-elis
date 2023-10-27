import clsx from 'clsx';

export const Price = ({
  amount,
  className,
  currencyCode = 'BOB',
  currencyCodeClassName,
}) => (
  <p suppressHydrationWarning={true} className={className}>
    {`${new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currencyCode,
      currencyDisplay: 'narrowSymbol',
    }).format(parseFloat(amount))}`}
    <span
      className={clsx('ml-1 inline', currencyCodeClassName)}
    >{`${currencyCode}`}</span>
  </p>
);
