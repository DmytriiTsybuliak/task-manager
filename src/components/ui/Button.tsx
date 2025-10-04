interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
}

export default function Button({ loading, children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed ${
        props.className ?? ''
      }`}
    >
      {loading ? <span aria-live="polite">Loading...</span> : children}
    </button>
  );
}
