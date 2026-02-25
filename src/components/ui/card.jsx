export function Card({ className = "", children, ...props }) {
  return (
    <div
      className={`rounded-xl border border-emerald-100 bg-white/90 shadow-lg shadow-emerald-100/50 backdrop-blur ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className = "", children, ...props }) {
  return (
    <div className={`p-6 pb-3 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className = "", children, ...props }) {
  return (
    <h2
      className={`text-2xl font-semibold tracking-tight text-emerald-900 ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
}

export function CardDescription({ className = "", children, ...props }) {
  return (
    <p
      className={`text-sm text-emerald-600 leading-relaxed ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({ className = "", children, ...props }) {
  return (
    <div className={`p-6 pt-2 space-y-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className = "", children, ...props }) {
  return (
    <div className={`px-6 pb-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
}

