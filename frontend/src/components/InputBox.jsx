function InputBox({ value, onChange, placeholder, isLoading, rows = 6 }) {
  return (
    <div className="space-y-2">
      <label htmlFor="easegov-input" className="block text-lg font-semibold text-slate-100">
        Your input
      </label>
      <textarea
        id="easegov-input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={rows}
        disabled={isLoading}
        className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-base text-white outline-none ring-cyan-300 transition placeholder:text-slate-300 focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60"
      />
    </div>
  );
}

export default InputBox;
