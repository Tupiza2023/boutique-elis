export default function LogoIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`buitique elis logo`}
      viewBox="0 0 32 28"
      {...props}
      className={props.className}
    >
      <defs>
        <linearGradient id="tailwindGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: 'rgba(238,174,202,1)' }} />
          <stop offset="100%" style={{ stopColor: 'rgba(148,187,233,1)' }} />
        </linearGradient>
      </defs>

      <path
        d="M21.5758 9.75769L16 0L0 28H11.6255L21.5758 9.75769Z"
        fill="url(#tailwindGradient)"
      />
      <path
        d="M26.2381 17.9167L20.7382 28H32L26.2381 17.9167Z"
        fill="url(#tailwindGradient)"
      />
    </svg>
  );
}
