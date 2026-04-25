function FileUploader({ file, onChange }) {
  return (
    <div className="space-y-2">
      <label htmlFor="chat-file" className="block text-base font-semibold text-slate-100">
        Upload image or PDF
      </label>
      <input
        id="chat-file"
        type="file"
        accept=".png,.jpg,.jpeg,.pdf"
        onChange={(event) => onChange(event.target.files?.[0] || null)}
        className="block w-full rounded-xl border border-white/20 bg-white/10 p-2 text-sm text-slate-100 file:mr-2 file:rounded-md file:border-0 file:bg-indigo-500 file:px-3 file:py-1 file:text-sm file:font-semibold file:text-white"
      />
      {file && (
        <p className="rounded-xl bg-white/10 px-3 py-2 text-sm font-medium text-slate-200">
          Selected: {file.name}
        </p>
      )}
    </div>
  );
}

export default FileUploader;
