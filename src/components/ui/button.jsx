export function Button({
  className = "",
  variant = "default",
  children,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none px-4 py-2";

  const variants = {
    default: "bg-emerald-600 text-white hover:bg-emerald-700",
    outline:
      "border border-emerald-600 text-emerald-700 hover:bg-emerald-50 bg-white",
    ghost: "text-emerald-700 hover:bg-emerald-50",
  };

  const variantClasses = variants[variant] ?? variants.default;

  return (
    <button
      className={`${base} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

