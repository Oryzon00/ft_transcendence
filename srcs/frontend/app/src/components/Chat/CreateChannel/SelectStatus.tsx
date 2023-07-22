function SelectStatus({options}) {
    return (
                <div id="channel-status">
                    <h2>
                        Status
                    </h2>
                    <select name="status" id="status-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                        {options.map((option) => (
                            <option value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
    );
}

export default SelectStatus;