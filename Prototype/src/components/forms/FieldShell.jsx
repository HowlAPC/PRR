export default function FieldShell({ label, required, help, error, className = '', children }) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
          {label}{required && <span className="text-rose-500 ml-0.5">*</span>}
        </label>
      )}
      {children}
      {help && !error && <p className="mt-1.5 text-xs text-slate-400">{help}</p>}
      {error && <p className="mt-1.5 text-xs text-rose-600">{error}</p>}
    </div>
  );
}
