function ModeSelector({ modes, selectedModeId, onSelect, disabled }) {
  return (
    <div className="mode-selector" role="radiogroup" aria-label="Choose how EaseGov should help">
      {modes.map((mode) => {
        const Icon = mode.icon;
        const isSelected = mode.id === selectedModeId;

        return (
          <button
            type="button"
            key={mode.id}
            className={`mode-button ${isSelected ? "active" : ""}`}
            onClick={() => onSelect(mode.id)}
            disabled={disabled}
            aria-checked={isSelected}
            role="radio"
            title={mode.label}
          >
            <span className="mode-icon">
              <Icon size={24} aria-hidden="true" />
            </span>
            <span className="mode-copy">
              <span>{mode.label}</span>
              <small>{mode.description}</small>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default ModeSelector;
