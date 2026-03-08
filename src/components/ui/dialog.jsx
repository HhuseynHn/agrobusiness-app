export function Dialog({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        aria-hidden
        onClick={() => typeof onClose === "function" && onClose()}
      />
      <div className="relative z-10 w-full max-w-md px-4" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export function DialogContent({ className = "", children, ...props }) {
  return (
    <div
      className={`rounded-2xl border border-emerald-100 bg-white/90 shadow-xl shadow-emerald-100/60 backdrop-blur p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function DialogHeader({ className = "", children, ...props }) {
  return (
    <div className={`space-y-1.5 pb-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function DialogTitle({ className = "", children, ...props }) {
  return (
    <h2
      className={`text-lg font-semibold tracking-tight text-emerald-900 ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
}

export function DialogDescription({ className = "", children, ...props }) {
  return (
    <p
      className={`text-sm text-emerald-600 leading-relaxed ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}

export function DialogFooter({ className = "", children, ...props }) {
  return (
    <div className={`mt-4 flex items-center justify-between gap-3 ${className}`} {...props}>
      {children}
    </div>
  );
}

