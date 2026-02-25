export function Label({ className = "", children, ...props }) {
  return (
    <label
      className={`text-sm font-medium text-emerald-900 ${className}`}
      {...props}
    >
      {children}
    </label>
  );
}

