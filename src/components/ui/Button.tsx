interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
}

export default function Button({ loading, children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`px-4 py-2 bg-blue-600 text-white text-base rounded-lg hover:bg-blue-700 transition-colors w-auto shrink-0 ${
        props.className ?? ''
      }`}
    >
      {loading ? <span aria-live="polite">Loading...</span> : children}
    </button>
  );
}
